/**
 * POST /api/dropship-orders — record a site checkout and assign an allowlisted supplier.
 * GET  /api/dropship-orders — supplier dashboard. Authorization: Bearer <DROPSHIP_DASHBOARD_SECRET>
 *      ?supplier=supplier-emr-tek | all
 *
 * Card numbers, CVC, and expiry are rejected and never stored.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const catalog = require("../dropship-catalog");

const CARD_KEYS = /card|cvc|cvv|pan|expiry|expir/i;
const LOCAL_FILE = path.join(__dirname, "..", "data", "dropship-orders.json");

function readJsonBody(req) {
  const b = req.body;
  if (b == null) return {};
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString("utf8") || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "string") {
    try {
      return JSON.parse(b || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "object") return b;
  return {};
}

function clampStr(s, max) {
  const t = String(s ?? "").trim();
  return t.length <= max ? t : t.slice(0, max);
}

function normalizeHostname(host) {
  return String(host || "")
    .replace(/^www\./i, "")
    .toLowerCase();
}

function originsMatch(a, b) {
  try {
    const ua = new URL(a.startsWith("http") ? a : `https://${a}`);
    const ub = new URL(b.startsWith("http") ? b : `https://${b}`);
    if (ua.protocol !== ub.protocol) return false;
    return normalizeHostname(ua.hostname) === normalizeHostname(ub.hostname);
  } catch {
    return a.replace(/\/$/, "") === b.replace(/\/$/, "");
  }
}

function originAllowed(req) {
  const raw = String(process.env.CONTACT_ALLOWED_ORIGINS || "").trim();
  if (!raw) return true;
  const origin = String(req.headers.origin || req.headers.referer || "");
  if (!origin) return false;
  return raw.split(",").some((item) => originsMatch(origin, item.trim()));
}

function readBearer(req) {
  const m = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || "").trim());
  return m ? m[1].trim() : "";
}

function timingSafeEqualStr(a, b) {
  const x = Buffer.from(String(a), "utf8");
  const y = Buffer.from(String(b), "utf8");
  if (x.length !== y.length) return false;
  return crypto.timingSafeEqual(x, y);
}

function queryValue(req, key) {
  if (req.query && req.query[key] != null) return req.query[key];
  try {
    return new URL(req.url || "/", "http://local").searchParams.get(key) || "";
  } catch {
    return "";
  }
}

function supplierById(id) {
  return catalog.suppliers.find((s) => s.id === id) || null;
}

function assignment(supplier, reason) {
  if (!supplier) return { supplierId: null, supplierName: "", route: "needs_review", fulfillment: "review", reason };
  const fulfillment = supplier.fulfillment === "affiliate" ? "affiliate" : "stripe";
  return {
    supplierId: supplier.id,
    supplierName: supplier.name,
    route: fulfillment === "affiliate" ? "affiliate" : "routed",
    fulfillment,
    reason,
  };
}

function routeItem(item) {
  if (catalog.suppliers.length > catalog.maxAutoSuppliers) {
    return { supplierId: null, supplierName: "", route: "needs_review", fulfillment: "review", reason: "supplier_cap" };
  }
  const productId = clampStr(item.productId, 80);
  const override = catalog.productSupplier[productId];
  if (override) return assignment(supplierById(override), "product");
  const category = clampStr(item.category, 40);
  const supplier = catalog.suppliers.find((s) => s.categories.includes(category));
  return assignment(supplier, "category");
}

function containsCardFields(body) {
  const keys = Object.keys(body || {});
  return keys.some((k) => CARD_KEYS.test(k));
}

function buildOrder(body) {
  const itemsIn = Array.isArray(body.items) ? body.items.slice(0, 40) : [];
  const items = itemsIn
    .map((item) => {
      const qty = Math.min(99, Math.max(1, parseInt(item.qty, 10) || 1));
      const unitPrice = Math.max(0, Math.round(Number(item.unitPrice) || 0));
      const routed = routeItem(item);
      return {
        productId: clampStr(item.productId, 80),
        title: clampStr(item.title, 180),
        category: clampStr(item.category, 40),
        qty,
        unitPrice,
        lineTotal: unitPrice * qty,
        ...routed,
      };
    })
    .filter((item) => item.productId && item.title);

  const stripeItems = items.filter((item) => item.fulfillment === "stripe");
  if (!stripeItems.length) {
    return { error: "EMR-TEKの商品は公式ストアで購入します。", affiliateOnly: true };
  }

  const kept = stripeItems;

  const subtotal = kept.reduce((sum, item) => sum + item.lineTotal, 0);
  const routed = kept.filter((item) => item.route === "routed");
  const review = kept.filter((item) => item.route !== "routed");

  return {
    order: {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: review.length ? "needs_review" : "routed",
      paymentStatus: "recorded_not_charged",
      paymentMethod: clampStr(body.paymentMethod, 24) || "unspecified",
      customer: {
        name: clampStr(body.name, 80),
        email: clampStr(body.email, 120),
        tel: clampStr(body.tel, 40),
        postal: clampStr(body.postal, 16),
        region: clampStr(body.region, 40),
        address1: clampStr(body.address1, 160),
        address2: clampStr(body.address2, 160),
        note: clampStr(body.note, 500),
      },
      items: kept,
      subtotal,
      supplierIds: [...new Set(routed.map((item) => item.supplierId))],
      reviewCount: review.length,
    },
  };
}

function normalizeSupabaseUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  try {
    return new URL(s).origin;
  } catch {
    return s.replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "");
  }
}

async function insertSupabase(order) {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!supabaseUrl || !serviceKey) return { skipped: true };

  const row = {
    id: order.id,
    created_at: order.createdAt,
    status: order.status,
    payment_status: order.paymentStatus,
    payment_method: order.paymentMethod,
    customer_name: order.customer.name,
    customer_email: order.customer.email,
    customer_tel: order.customer.tel,
    ship_postal: order.customer.postal,
    ship_region: order.customer.region,
    ship_address1: order.customer.address1,
    ship_address2: order.customer.address2,
    ship_note: order.customer.note,
    items: order.items,
    subtotal: order.subtotal,
    supplier_ids: order.supplierIds,
    review_count: order.reviewCount,
  };

  const r = await fetch(`${supabaseUrl}/rest/v1/dropship_orders`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!r.ok) {
    const detail = await r.text();
    return { error: detail.slice(0, 300), status: r.status };
  }
  return { ok: true };
}

function readLocal() {
  try {
    const text = fs.readFileSync(LOCAL_FILE, "utf8");
    const rows = JSON.parse(text);
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeLocal(order) {
  const rows = readLocal();
  rows.unshift(order);
  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(rows.slice(0, 500), null, 2));
}

async function listOrders(supplierId) {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  let rows = null;
  if (supabaseUrl && serviceKey) {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/dropship_orders?select=*&order=created_at.desc&limit=200`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Accept: "application/json",
        },
      }
    );
    if (r.ok) {
      const parsed = await r.json();
      rows = Array.isArray(parsed) ? parsed.map(fromDb) : [];
    }
  }
  if (!rows) rows = readLocal();
  if (supplierId && supplierId !== "all") {
    rows = rows
      .map((order) => ({
        ...order,
        items: (order.items || []).filter((item) => item.supplierId === supplierId),
      }))
      .filter((order) => order.items.length);
  }
  return rows;
}

function fromDb(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
      tel: row.customer_tel,
      postal: row.ship_postal,
      region: row.ship_region,
      address1: row.ship_address1,
      address2: row.ship_address2,
      note: row.ship_note,
    },
    items: row.items || [],
    subtotal: row.subtotal,
    supplierIds: row.supplier_ids || [],
    reviewCount: row.review_count || 0,
  };
}

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const secret = String(process.env.DROPSHIP_DASHBOARD_SECRET || "").trim();
    if (!secret) {
      return res.status(503).json({
        error: "DROPSHIP_DASHBOARD_SECRET is not configured",
      });
    }
    const token = readBearer(req);
    if (!token || !timingSafeEqualStr(token, secret)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const supplier = clampStr(queryValue(req, "supplier"), 40) || "all";
    if (supplier !== "all" && !supplierById(supplier)) {
      return res.status(400).json({ error: "Unknown supplier" });
    }
    const rows = await listOrders(supplier);
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      ok: true,
      maxAutoSuppliers: catalog.maxAutoSuppliers,
      suppliers: catalog.suppliers,
      rows,
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  const body = readJsonBody(req);
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  if (containsCardFields(body)) {
    return res.status(400).json({ error: "カード番号は受け付けません。" });
  }

  const email = clampStr(body.email, 120);
  const name = clampStr(body.name, 80);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "お名前とメールアドレスを確認してください。" });
  }
  if (!clampStr(body.address1, 160) || !clampStr(body.postal, 16)) {
    return res.status(400).json({ error: "お届け先を入力してください。" });
  }

  const built = buildOrder(body);
  if (built.error) {
    return res.status(400).json({ error: built.error, affiliateOnly: !!built.affiliateOnly });
  }

  const saved = await insertSupabase(built.order);
  if (saved.error) {
    writeLocal(built.order);
  } else if (saved.skipped) {
    writeLocal(built.order);
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(201).json({
    ok: true,
    orderId: built.order.id,
    status: built.order.status,
    paymentStatus: built.order.paymentStatus,
    suppliers: built.order.items
      .filter((item) => item.supplierId)
      .map((item) => ({ productId: item.productId, supplierId: item.supplierId, supplierName: item.supplierName })),
    reviewCount: built.order.reviewCount,
  });
}

module.exports = handler;
