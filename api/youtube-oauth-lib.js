/**
 * YouTube OAuth helpers. Tokens stay on the server.
 * This module does not upload videos.
 */

const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const { normalizeSupabaseUrl } = require("./auth-shared");
const { getSupabaseJsOptions } = require("./supabase-node-options");

const STATE_COOKIE = "teb_youtube_oauth_state";
const STATE_MAX_AGE_SEC = 600;
const PRODUCTION_REDIRECT_URI = "https://theestablishbeauty.com/api/auth/youtube/callback";
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

function cleanEnv(value) {
  let out = String(value ?? "")
    .trim()
    .replace(/[\r\n\t]/g, "");
  if (
    (out.startsWith('"') && out.endsWith('"')) ||
    (out.startsWith("'") && out.endsWith("'"))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function randomState() {
  return crypto.randomBytes(24).toString("hex");
}

function timingSafeEqualStr(a, b) {
  const left = Buffer.from(String(a || ""), "utf8");
  const right = Buffer.from(String(b || ""), "utf8");
  if (!left.length || left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function parseCookies(header) {
  const out = {};
  for (const part of String(header || "").split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const key = part.slice(0, i).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(part.slice(i + 1).trim());
    } catch {
      out[key] = "";
    }
  }
  return out;
}

function useSecureCookie() {
  return process.env.VERCEL === "1" || cleanEnv(process.env.PUBLIC_SITE_URL).startsWith("https://");
}

function buildStateCookie(value, { clear = false } = {}) {
  const secure = useSecureCookie() ? "; Secure" : "";
  if (clear) {
    return `${STATE_COOKIE}=; Path=/api/auth/youtube; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
  }
  return `${STATE_COOKIE}=${encodeURIComponent(value)}; Path=/api/auth/youtube; HttpOnly; SameSite=Lax; Max-Age=${STATE_MAX_AGE_SEC}${secure}`;
}

function getYoutubeConfig() {
  const clientId = cleanEnv(process.env.GOOGLE_CLIENT_ID);
  const clientSecret = cleanEnv(process.env.GOOGLE_CLIENT_SECRET);
  const redirectUri = cleanEnv(process.env.GOOGLE_REDIRECT_URI) || PRODUCTION_REDIRECT_URI;
  return { clientId, clientSecret, redirectUri };
}

function configReady(cfg) {
  return Boolean(cfg.clientId && cfg.clientSecret && cfg.redirectUri);
}

function encryptionKey() {
  const raw = cleanEnv(process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY);
  if (!raw) return null;
  return crypto.createHash("sha256").update(raw, "utf8").digest();
}

function encryptSecret(plain) {
  const key = encryptionKey();
  if (!key) {
    const error = new Error("encryption_key_missing");
    error.status = 503;
    throw error;
  }
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(String(plain), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
}

function buildLoginUrl(cfg, state) {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", cfg.clientId);
  url.searchParams.set("redirect_uri", cfg.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", SCOPES.join(" "));
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("state", state);
  return url.toString();
}

function readBasic(req) {
  const header = String((req.headers && (req.headers.authorization || req.headers.Authorization)) || "");
  const match = /^Basic\s+(\S+)/i.exec(header.trim());
  if (!match) return null;
  let decoded = "";
  try {
    decoded = Buffer.from(match[1], "base64").toString("utf8");
  } catch {
    return null;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return null;
  return { user: decoded.slice(0, colon), pass: decoded.slice(colon + 1) };
}

function adminAuthorized(req) {
  const expectedUser = cleanEnv(process.env.ADMIN_BASIC_USER) || "admin";
  const expectedPass = cleanEnv(process.env.ADMIN_BASIC_PASSWORD);
  const host = String((req.headers && req.headers.host) || "");
  if (!expectedPass) return host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const creds = readBasic(req);
  if (!creds) return false;
  return timingSafeEqualStr(creds.user, expectedUser) && timingSafeEqualStr(creds.pass, expectedPass);
}

async function exchangeCode(cfg, code) {
  const body = new URLSearchParams({
    code,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    redirect_uri: cfg.redirectUri,
    grant_type: "authorization_code",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  if (!response.ok || !json || !json.access_token) {
    const message = (json && (json.error_description || json.error)) || "token_exchange_failed";
    return { ok: false, status: response.status, error: String(message).slice(0, 300) };
  }
  return {
    ok: true,
    accessToken: String(json.access_token),
    refreshToken: json.refresh_token ? String(json.refresh_token) : "",
    expiresIn: typeof json.expires_in === "number" ? json.expires_in : null,
    scope: json.scope ? String(json.scope) : SCOPES.join(" "),
    tokenType: json.token_type ? String(json.token_type) : "Bearer",
  };
}

async function fetchChannel(accessToken) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("mine", "true");
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  if (!response.ok) {
    const message = (json && json.error && json.error.message) || "channel_lookup_failed";
    return { ok: false, error: String(message).slice(0, 300) };
  }
  const channel = json && Array.isArray(json.items) ? json.items[0] : null;
  return {
    ok: true,
    channelId: channel && channel.id ? String(channel.id) : "",
    channelTitle: channel && channel.snippet && channel.snippet.title ? String(channel.snippet.title) : "",
  };
}

function getServiceSupabase() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) return null;
  return createClient(url, key, getSupabaseJsOptions());
}

async function persistYoutubeAuth(payload) {
  const supabase = getServiceSupabase();
  if (!supabase) return { ok: false, error: "supabase_not_configured" };
  if (!payload.refreshToken) return { ok: false, error: "refresh_token_missing" };
  let refreshTokenEncrypted = "";
  let accessTokenEncrypted = "";
  try {
    refreshTokenEncrypted = encryptSecret(payload.refreshToken);
    accessTokenEncrypted = encryptSecret(payload.accessToken);
  } catch (error) {
    return { ok: false, error: error.message || "encrypt_failed" };
  }
  const expiresAt =
    typeof payload.expiresIn === "number"
      ? new Date(Date.now() + payload.expiresIn * 1000).toISOString()
      : null;
  const row = {
    id: "default",
    updated_at: new Date().toISOString(),
    refresh_token_encrypted: refreshTokenEncrypted,
    access_token_encrypted: accessTokenEncrypted,
    token_type: payload.tokenType || "Bearer",
    expires_at: expiresAt,
    scope: payload.scope || "",
    channel_id: payload.channelId || null,
    channel_title: payload.channelTitle || null,
  };
  const { error } = await supabase.from("youtube_oauth").upsert(row, { onConflict: "id" });
  if (error) return { ok: false, error: String(error.message || error).slice(0, 300) };
  return { ok: true };
}

function queryFromReq(req) {
  const rawUrl = String(req.url || "/");
  const q = rawUrl.indexOf("?");
  if (q < 0) return new URLSearchParams();
  return new URLSearchParams(rawUrl.slice(q + 1));
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
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  if (extraHeaders) {
    for (const [key, value] of Object.entries(extraHeaders)) res.setHeader(key, value);
  }
  return res.end(html);
}

module.exports = {
  STATE_COOKIE,
  getYoutubeConfig,
  configReady,
  randomState,
  timingSafeEqualStr,
  parseCookies,
  buildStateCookie,
  buildLoginUrl,
  adminAuthorized,
  exchangeCode,
  fetchChannel,
  persistYoutubeAuth,
  queryFromReq,
  sendHtml,
  escapeHtml,
};
