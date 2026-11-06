/**
 * Meta Instagram Unified Login (Login for Business) helpers.
 * Graph API v26.0 — tokens never returned to the browser.
 */

const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const { normalizeSupabaseUrl } = require("./auth-shared");
const { getSupabaseJsOptions } = require("./supabase-node-options");
const { getPublicSiteOrigin } = require("./auth-welcome-email");

const GRAPH_API_VERSION = "v26.0";
const STATE_COOKIE = "teb_meta_oauth_state";
const STATE_MAX_AGE_SEC = 600;
const PRODUCTION_OAUTH_REDIRECT_URI =
  "https://theestablishbeauty.com/api/auth/meta/callback";

function cleanEnv(s) {
  return String(s ?? "")
    .trim()
    .replace(/[\r\n\t]/g, "");
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isVercelDeploymentUrl(raw) {
  try {
    const host = new URL(raw).hostname.toLowerCase();
    return host === "vercel.app" || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function publicOriginForOAuth() {
  const named = [
    process.env.PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.AUTH_PUBLIC_SITE_ORIGIN,
  ];
  for (const candidate of named) {
    const origin = cleanEnv(candidate).replace(/\/+$/, "");
    if (origin && !isVercelDeploymentUrl(origin)) return origin;
  }
  for (const part of String(process.env.CONTACT_ALLOWED_ORIGINS || "").split(",")) {
    const origin = cleanEnv(part).replace(/\/+$/, "");
    if (!origin.startsWith("https://") || isVercelDeploymentUrl(origin)) continue;
    return origin;
  }
  return "";
}

/**
 * Start and the code exchange must use the same redirect_uri.
 * Production never falls back to the deployment-specific VERCEL_URL.
 */
function getMetaRedirectUri() {
  const explicit = cleanEnv(process.env.META_OAUTH_REDIRECT_URI);
  const production = process.env.VERCEL_ENV === "production";
  if (explicit && !(production && isVercelDeploymentUrl(explicit))) {
    return explicit;
  }
  if (production) return PRODUCTION_OAUTH_REDIRECT_URI;
  const origin = publicOriginForOAuth();
  return origin ? `${origin}/api/auth/meta/callback` : "";
}

function getMetaConfig() {
  const appId = cleanEnv(process.env.META_APP_ID);
  const appSecret = cleanEnv(process.env.META_APP_SECRET);
  const configId = cleanEnv(process.env.META_LOGIN_CONFIG_ID);
  const redirectUri = getMetaRedirectUri();
  const siteOrigin = redirectUri ? redirectUri.replace(/\/api\/auth\/meta\/callback$/, "") : "";
  return { appId, appSecret, configId, redirectUri, siteOrigin };
}

function metaConfigReady(cfg) {
  return Boolean(cfg.appId && cfg.appSecret && cfg.configId && cfg.redirectUri);
}

function randomState() {
  return crypto.randomBytes(24).toString("hex");
}

function timingSafeEqualStr(a, b) {
  const aa = String(a || "");
  const bb = String(b || "");
  if (!aa || !bb || aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(Buffer.from(aa), Buffer.from(bb));
}

function parseCookies(header) {
  const out = {};
  const raw = String(header || "");
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

function useSecureCookie() {
  if (process.env.VERCEL === "1") return true;
  const origin = getPublicSiteOrigin();
  return Boolean(origin && origin.startsWith("https://"));
}

function buildStateCookie(value, { clear = false } = {}) {
  const secure = useSecureCookie() ? "; Secure" : "";
  if (clear) {
    return `${STATE_COOKIE}=; Path=/api/auth/meta; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
  }
  return `${STATE_COOKIE}=${encodeURIComponent(value)}; Path=/api/auth/meta; HttpOnly; SameSite=Lax; Max-Age=${STATE_MAX_AGE_SEC}${secure}`;
}

function buildLoginUrl(cfg, state) {
  const u = new URL(`https://www.facebook.com/${GRAPH_API_VERSION}/dialog/oauth`);
  u.searchParams.set("client_id", cfg.appId);
  u.searchParams.set("config_id", cfg.configId);
  u.searchParams.set("redirect_uri", cfg.redirectUri);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("override_default_response_type", "true");
  u.searchParams.set("state", state);
  u.searchParams.set("prompt", "login");
  return u.toString();
}

async function exchangeCodeForToken(cfg, code) {
  const u = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/oauth/access_token`);
  u.searchParams.set("client_id", cfg.appId);
  u.searchParams.set("client_secret", cfg.appSecret);
  u.searchParams.set("redirect_uri", cfg.redirectUri);
  u.searchParams.set("code", code);
  const r = await fetch(u.toString(), { method: "GET" });
  const text = await r.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  if (!r.ok || !json || !json.access_token) {
    const errMsg =
      (json && (json.error_message || (json.error && json.error.message))) ||
      text.slice(0, 300) ||
      "token_exchange_failed";
    return { ok: false, error: String(errMsg), status: r.status };
  }
  return {
    ok: true,
    accessToken: String(json.access_token),
    tokenType: json.token_type ? String(json.token_type) : null,
    expiresIn: typeof json.expires_in === "number" ? json.expires_in : null,
  };
}

async function graphGet(accessToken, path, fields) {
  const u = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}${path}`);
  if (fields) u.searchParams.set("fields", fields);
  u.searchParams.set("access_token", accessToken);
  const r = await fetch(u.toString(), { method: "GET" });
  const text = await r.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  if (!r.ok) {
    const msg =
      (json && json.error && json.error.message) || text.slice(0, 200) || "graph_error";
    return { ok: false, error: String(msg) };
  }
  return { ok: true, data: json };
}

async function fetchLinkedMetaProfile(accessToken) {
  const me = await graphGet(accessToken, "/me", "client_business_id");
  const ig = await graphGet(accessToken, "/me/assigned_instagram_accounts", "id,username");
  const clientBusinessId =
    me.ok && me.data && me.data.client_business_id
      ? String(me.data.client_business_id)
      : null;
  const accounts = [];
  if (ig.ok && ig.data && Array.isArray(ig.data.data)) {
    for (const row of ig.data.data) {
      if (!row || !row.id) continue;
      accounts.push({
        id: String(row.id),
        username: row.username ? String(row.username) : null,
      });
    }
  }
  return {
    clientBusinessId,
    instagramAccounts: accounts,
    meError: me.ok ? null : me.error,
    igError: ig.ok ? null : ig.error,
  };
}

function getServiceSupabase() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) return null;
  return createClient(url, key, getSupabaseJsOptions());
}

/**
 * Persist token server-side only. Never write tokens into HTML/JSON responses.
 * Returns { ok, error? } — missing table / env is a soft failure for first deploy.
 */
async function persistOAuthToken(payload) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return { ok: false, error: "supabase_not_configured" };
  }
  const row = {
    id: "default",
    updated_at: new Date().toISOString(),
    access_token: payload.accessToken,
    token_type: payload.tokenType,
    expires_in: payload.expiresIn,
    client_business_id: payload.clientBusinessId,
    instagram_accounts: payload.instagramAccounts || [],
  };
  const { error } = await supabase.from("meta_instagram_oauth").upsert(row, {
    onConflict: "id",
  });
  if (error) {
    console.error("meta-oauth: persist failed", error.message || error);
    return { ok: false, error: String(error.message || error) };
  }
  return { ok: true };
}

function sendHtml(res, status, title, bodyHtml, extraHeaders) {
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<title>${escapeHtml(title)}</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1.25rem;line-height:1.55;color:#1a1a1a;background:#fafafa}
  h1{font-size:1.25rem;margin:0 0 .75rem}
  p{margin:.5rem 0;color:#333}
  .muted{color:#666;font-size:.9rem}
  a{color:#0b57d0}
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
${bodyHtml}
</body>
</html>`;
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    ...(extraHeaders || {}),
  };
  res.statusCode = status;
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === "set-cookie" && Array.isArray(v)) {
      // Node / Vercel: multiple Set-Cookie via append if available
      if (typeof res.appendHeader === "function") {
        for (const c of v) res.appendHeader("Set-Cookie", c);
      } else if (typeof res.setHeader === "function") {
        res.setHeader("Set-Cookie", v);
      }
      continue;
    }
    if (typeof res.setHeader === "function") res.setHeader(k, v);
  }
  if (typeof res.end === "function") return res.end(html);
  return html;
}

function queryFromReq(req) {
  const rawUrl = String(req.url || "/");
  const q = rawUrl.indexOf("?");
  if (q < 0) return new URLSearchParams();
  return new URLSearchParams(rawUrl.slice(q + 1));
}

module.exports = {
  GRAPH_API_VERSION,
  STATE_COOKIE,
  getMetaConfig,
  metaConfigReady,
  randomState,
  timingSafeEqualStr,
  parseCookies,
  buildStateCookie,
  buildLoginUrl,
  exchangeCodeForToken,
  fetchLinkedMetaProfile,
  persistOAuthToken,
  sendHtml,
  escapeHtml,
  queryFromReq,
};
