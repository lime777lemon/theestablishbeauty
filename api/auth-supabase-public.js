/**
 * GET /api/auth-supabase-public
 * Returns anon URL + key for browser OAuth (PKCE). The anon key is not a secret;
 * it is already exposed to clients in typical Supabase apps.
 */

const {
  normalizeSupabaseUrl,
  originAllowed,
  applyCors,
  sendJson,
} = require("./auth-shared");

function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyCors(req, res);
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(204).end();
  }
  if (req.method !== "GET") {
    return sendJson(req, res, 405, { ok: false, error: "method_not_allowed" });
  }
  if (!originAllowed(req)) {
    return sendJson(req, res, 403, { ok: false, error: "forbidden" });
  }

  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const supabaseAnonKey =
    String(process.env.SUPABASE_ANON_KEY || "").trim() ||
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    return sendJson(req, res, 503, { ok: false, error: "server_misconfigured" });
  }

  return sendJson(req, res, 200, {
    ok: true,
    supabaseUrl,
    supabaseAnonKey,
  });
}

module.exports = handler;
