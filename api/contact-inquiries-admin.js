/**
 * 運営向け: public.contact_inquiries の一覧（読み取りのみ）
 *
 * URL: GET /api/contact-inquiries-admin
 *
 * 認証: Authorization: Bearer <CONTACT_INQUIRIES_ADMIN_SECRET>
 * （Vercel の環境変数に長いランダム文字列を設定し、この HTML ページの「管理者トークン」に同じ値を入力）
 *
 * 環境変数:
 * - CONTACT_INQUIRIES_ADMIN_SECRET … 必須
 * - SUPABASE_URL … Project URL（/rest/v1 は不要）
 * - SUPABASE_SERVICE_ROLE_KEY … 必須（サーバー専用）
 *
 * クエリ: limit（既定 100、最大 500）, offset（既定 0）
 */

const crypto = require("crypto");

function normalizeSupabaseUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    return u.origin;
  } catch {
    return s.replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "");
  }
}

function readBearer(req) {
  const a = req.headers.authorization || "";
  const m = /^Bearer\s+(.+)$/i.exec(String(a).trim());
  return m ? m[1].trim() : "";
}

function timingSafeEqualStr(a, b) {
  const x = Buffer.from(String(a), "utf8");
  const y = Buffer.from(String(b), "utf8");
  if (x.length !== y.length) return false;
  return crypto.timingSafeEqual(x, y);
}

function parseIntClamped(v, def, min, max) {
  const n = parseInt(String(v ?? def), 10);
  if (!Number.isFinite(n)) return def;
  return Math.min(max, Math.max(min, n));
}

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = String(process.env.CONTACT_INQUIRIES_ADMIN_SECRET || "").trim();
  if (!secret) {
    return res.status(503).json({
      error: "CONTACT_INQUIRIES_ADMIN_SECRET is not configured",
      hint: "Vercel の環境変数に CONTACT_INQUIRIES_ADMIN_SECRET を追加し、再デプロイしてください。",
    });
  }

  const token = readBearer(req);
  if (!token || !timingSafeEqualStr(token, secret)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!supabaseUrl || !serviceKey) {
    console.error("contact-inquiries-admin: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const limit = parseIntClamped(req.query?.limit, 100, 1, 500);
  const offset = parseIntClamped(req.query?.offset, 0, 0, 100000);

  const url = `${supabaseUrl}/rest/v1/contact_inquiries?select=*&order=created_at.desc&limit=${limit}&offset=${offset}`;

  const r = await fetch(url, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: "application/json",
    },
  });

  const text = await r.text();
  if (!r.ok) {
    console.error("contact-inquiries-admin: Supabase error", r.status, text.slice(0, 400));
    return res.status(502).json({
      error: "Supabase request failed",
      status: r.status,
      hint:
        "contact_inquiries に created_at 列がないと並び替えで失敗します。Supabase の Table Editor で列を確認するか、マイグレーションで created_at を追加してください。",
      detail: text.slice(0, 300),
    });
  }

  let rows;
  try {
    rows = JSON.parse(text);
  } catch {
    return res.status(502).json({ error: "Invalid JSON from Supabase" });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true, rows: Array.isArray(rows) ? rows : [] });
}

module.exports = handler;
