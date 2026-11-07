/**
 * GET /api/auth/youtube/start
 * Admin-only redirect to Google OAuth. Does not upload a video.
 *
 * Env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI,
 *      YOUTUBE_TOKEN_ENCRYPTION_KEY, ADMIN_BASIC_USER, ADMIN_BASIC_PASSWORD
 */

const {
  adminAuthorized,
  buildLoginUrl,
  buildStateCookie,
  configReady,
  getYoutubeConfig,
  randomState,
  sendHtml,
} = require("../../youtube-oauth-lib");

module.exports = function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Cache-Control", "no-store");
    return res.end("Method Not Allowed");
  }
  if (!adminAuthorized(req)) {
    const pass = String(process.env.ADMIN_BASIC_PASSWORD || "").trim();
    if (!pass) {
      return sendHtml(
        res,
        503,
        "管理者パスワードが未設定です",
        "<p>Vercel に <code>ADMIN_BASIC_PASSWORD</code> を設定してください。</p>"
      );
    }
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", 'Basic realm="Establish Beauty Admin", charset="UTF-8"');
    res.setHeader("Cache-Control", "no-store");
    return res.end("Authentication required");
  }

  const cfg = getYoutubeConfig();
  if (!configReady(cfg) || !String(process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY || "").trim()) {
    return sendHtml(
      res,
      503,
      "YouTube OAuth 未設定",
      `<p>Vercel に <code>GOOGLE_CLIENT_ID</code>、<code>GOOGLE_CLIENT_SECRET</code>、<code>GOOGLE_REDIRECT_URI</code>、<code>YOUTUBE_TOKEN_ENCRYPTION_KEY</code> を設定してください。</p>
       <p class="muted">Client Secret はブラウザに出しません。</p>`
    );
  }

  const state = randomState();
  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Set-Cookie", buildStateCookie(state));
  res.setHeader("Location", buildLoginUrl(cfg, state));
  return res.end();
};
