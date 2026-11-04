/**
 * GET /api/auth/meta/start
 * Issues CSRF state cookie and redirects to Meta Unified Login (config_id).
 *
 * Env: META_APP_ID, META_APP_SECRET, META_LOGIN_CONFIG_ID,
 *      META_OAUTH_REDIRECT_URI (optional; defaults to {PUBLIC_SITE_URL}/api/auth/meta/callback)
 */

const {
  getMetaConfig,
  metaConfigReady,
  randomState,
  buildStateCookie,
  buildLoginUrl,
  sendHtml,
} = require("../../meta-oauth-lib");

function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Cache-Control", "no-store");
    return res.end("Method Not Allowed");
  }

  const cfg = getMetaConfig();
  if (!metaConfigReady(cfg)) {
    return sendHtml(
      res,
      503,
      "Meta OAuth 未設定",
      `<p>Vercel に <code>META_APP_ID</code> / <code>META_APP_SECRET</code> / <code>META_LOGIN_CONFIG_ID</code> と、公開オリジン（<code>PUBLIC_SITE_URL</code> または <code>META_OAUTH_REDIRECT_URI</code>）を設定してください。</p>
       <p class="muted">App Secret はブラウザに出しません。このページは設定確認用です。</p>`
    );
  }

  const state = randomState();
  const loginUrl = buildLoginUrl(cfg, state);
  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Set-Cookie", buildStateCookie(state));
  res.setHeader("Location", loginUrl);
  return res.end();
}

module.exports = handler;
