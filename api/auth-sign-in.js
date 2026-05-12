/**
 * POST /api/auth-sign-in — sign in with email/password (anon key server-side).
 * Returns session tokens for client localStorage (same pattern as supabase-js browser).
 */

const { createClient } = require("@supabase/supabase-js");
const {
  readJsonBody,
  normalizeSupabaseUrl,
  isValidEmail,
  originAllowed,
  applyCors,
  sendJson,
} = require("./auth-shared");
const { getSupabaseJsOptions } = require("./supabase-node-options");

function getSupabaseAnon() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const key =
    String(process.env.SUPABASE_ANON_KEY || "").trim() ||
    String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  if (!url || !key) return null;
  return createClient(url, key, getSupabaseJsOptions());
}

function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyCors(req, res);
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return sendJson(req, res, 405, { ok: false, error: "method_not_allowed" });
  }
  if (!originAllowed(req)) {
    return sendJson(req, res, 403, { ok: false, error: "forbidden" });
  }

  const supabase = getSupabaseAnon();
  if (!supabase) {
    return sendJson(req, res, 503, { ok: false, error: "server_misconfigured" });
  }

  const body = readJsonBody(req);
  if (body === null) {
    return sendJson(req, res, 400, { ok: false, error: "invalid_json" });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!isValidEmail(email) || !password) {
    return sendJson(req, res, 400, { ok: false, error: "invalid_credentials" });
  }

  supabase.auth
    .signInWithPassword({ email, password })
    .then(({ data, error }) => {
      if (error || !data.session) {
        return sendJson(req, res, 401, {
          ok: false,
          error: "invalid_credentials",
          detail: error ? String(error.message || "") : undefined,
        });
      }
      const s = data.session;
      return sendJson(req, res, 200, {
        ok: true,
        session: {
          access_token: s.access_token,
          refresh_token: s.refresh_token,
          expires_in: s.expires_in,
          expires_at: s.expires_at,
          token_type: s.token_type,
        },
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email,
              user_metadata: data.user.user_metadata,
              app_metadata: data.user.app_metadata,
            }
          : undefined,
      });
    })
    .catch((e) => {
      return sendJson(req, res, 500, {
        ok: false,
        error: "server_error",
        detail: String(e && e.message ? e.message : e),
      });
    });
}

module.exports = handler;
