/**
 * GET /api/auth-google-start?target=consumer|business
 * Returns { ok, url } for Google OAuth (Supabase Auth). Browser opens url.
 *
 * Supabase Dashboard → Authentication → URL Configuration に次を追加:
 *   {PUBLIC_SITE_URL}/auth/oauth-callback.html
 *   例: http://localhost:5173/auth/oauth-callback.html
 */

const { createClient } = require("@supabase/supabase-js");
const {
  normalizeSupabaseUrl,
  originAllowed,
  applyCors,
  sendJson,
} = require("./auth-shared");
const { getSupabaseJsOptions } = require("./supabase-node-options");
const { getPublicSiteOrigin } = require("./auth-welcome-email");

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
  if (req.method !== "GET") {
    return sendJson(req, res, 405, { ok: false, error: "method_not_allowed" });
  }
  if (!originAllowed(req)) {
    return sendJson(req, res, 403, { ok: false, error: "forbidden" });
  }

  const supabase = getSupabaseAnon();
  if (!supabase) {
    return sendJson(req, res, 503, { ok: false, error: "server_misconfigured" });
  }

  const rawUrl = String(req.url || "/");
  let search = "";
  const q = rawUrl.indexOf("?");
  if (q >= 0) search = rawUrl.slice(q);
  const params = new URLSearchParams(search);
  const target = params.get("target") === "business" ? "business" : "consumer";

  const siteOrigin = getPublicSiteOrigin();
  if (!siteOrigin) {
    return sendJson(req, res, 503, {
      ok: false,
      error: "missing_site_origin",
      hint: "Set PUBLIC_SITE_URL or https URL in CONTACT_ALLOWED_ORIGINS",
    });
  }

  const redirectTo = `${siteOrigin}/auth/oauth-callback.html?target=${encodeURIComponent(target)}`;

  supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    })
    .then(({ data, error }) => {
      if (error || !data || !data.url) {
        return sendJson(req, res, 502, {
          ok: false,
          error: "oauth_url_failed",
          detail: error ? String(error.message || error) : "no_url",
        });
      }
      return sendJson(req, res, 200, { ok: true, url: data.url });
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
