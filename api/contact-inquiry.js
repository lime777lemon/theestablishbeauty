/**
 * お問い合わせフォーム → Supabase public.contact_inquiries（キーは環境変数のみ）
 *
 * URL: /api/contact-inquiry
 *
 * 環境変数（Vercel）:
 * - SUPABASE_URL … 例 https://xxxx.supabase.co
 * - SUPABASE_SERVICE_ROLE_KEY … 推奨（サーバー専用。RLS をバイパスして挿入）
 *   または SUPABASE_ANON_KEY … RLS が anon の INSERT を許可している場合のみ
 *
 * 任意:
 * - CONTACT_ALLOWED_ORIGINS … カンマ区切り。設定時は Origin / Referer がいずれかに一致する POST のみ許可
 *   例: https://theestablishbeauty.com,http://localhost:5173
 */

const TOPICS = new Set(["product", "order", "returns", "wholesale", "other"]);

function clampStr(s, max) {
  const t = String(s ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max);
}

function isValidEmail(s) {
  const t = String(s ?? "").trim();
  if (t.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function originAllowed(req) {
  const raw = process.env.CONTACT_ALLOWED_ORIGINS;
  if (!raw || !String(raw).trim()) return true;
  const allowed = String(raw)
    .split(",")
    .map((x) => x.trim().replace(/\/$/, ""))
    .filter(Boolean);
  if (!allowed.length) return true;

  const origin = String(req.headers.origin || "").replace(/\/$/, "");
  const referer = String(req.headers.referer || "");
  const vercel = process.env.VERCEL_URL;

  for (const a of allowed) {
    if (origin && origin === a) return true;
    if (referer === a || referer.startsWith(a + "/")) return true;
  }
  if (vercel) {
    const v = `https://${vercel}`.replace(/\/$/, "");
    if (origin === v || referer === v || referer.startsWith(v + "/")) return true;
  }
  return false;
}

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Expected JSON object" });
  }

  const name = clampStr(body.name, 200) || null;
  const emailRaw = clampStr(body.email, 320);
  if (!emailRaw || !isValidEmail(emailRaw)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const inquiryType = String(body.inquiry_type ?? body.topic ?? "").trim();
  if (!TOPICS.has(inquiryType)) {
    return res.status(400).json({ error: "Invalid inquiry_type" });
  }

  const message = clampStr(body.message, 12000);
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const consent = body.consent === true || body.consent === "true" || body.consent === "on" || body.consent === 1;
  if (!consent) {
    return res.status(400).json({ error: "Consent is required" });
  }

  const pagePath = clampStr(body.page_path, 500) || null;
  const locale = clampStr(body.locale, 32) || null;
  const userAgent = clampStr(body.user_agent, 500) || null;

  const supabaseUrl = String(process.env.SUPABASE_URL || "")
    .trim()
    .replace(/\/$/, "");
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const anonKey = String(process.env.SUPABASE_ANON_KEY || "").trim();
  const key = serviceKey || anonKey;

  if (!supabaseUrl || !key) {
    console.error("contact-inquiry: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_ANON_KEY");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const row = {
    name,
    email: emailRaw,
    inquiry_type: inquiryType,
    message,
    consent: true,
    page_path: pagePath,
    locale,
    user_agent: userAgent,
  };

  const r = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  const raw = await r.text();
  if (!r.ok) {
    console.error("contact-inquiry: Supabase error", r.status, raw.slice(0, 500));
    let msg = raw.trim() || `HTTP ${r.status}`;
    try {
      const j = JSON.parse(raw);
      if (j && typeof j.message === "string" && j.message) msg = j.message;
      else if (j && typeof j.error === "string" && j.error) msg = j.error;
      else if (j && typeof j.hint === "string" && j.hint) msg = j.hint;
    } catch {
      /* keep msg */
    }
    if (msg.length > 400) msg = msg.slice(0, 397) + "…";
    return res.status(502).json({ error: msg, status: r.status });
  }

  return res.status(200).json({ ok: true });
}

module.exports = handler;
