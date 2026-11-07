/**
 * GET /api/auth/youtube/callback
 * Google OAuth redirect. Exchanges the code and stores an encrypted refresh token.
 * Does not upload a video. The access token is never written into the HTML response.
 */

const {
  STATE_COOKIE,
  buildStateCookie,
  configReady,
  escapeHtml,
  exchangeCode,
  fetchChannel,
  getYoutubeConfig,
  parseCookies,
  persistYoutubeAuth,
  queryFromReq,
  sendHtml,
  timingSafeEqualStr,
} = require("../../youtube-oauth-lib");

function clearState() {
  return { "Set-Cookie": buildStateCookie("", { clear: true }) };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Cache-Control", "no-store");
    return res.end("Method Not Allowed");
  }

  const params = queryFromReq(req);
  const error = params.get("error");
  const code = params.get("code");
  const state = params.get("state");

  if (!error && !code && !state) {
    return sendHtml(
      res,
      200,
      "YouTube OAuth コールバック",
      `<p>この URL は Google OAuth のリダイレクト先として利用可能です。</p>
       <p class="muted">認証の開始は管理者だけが <a href="/api/auth/youtube/start">/api/auth/youtube/start</a> から行います。</p>
       <p class="muted">トークンはブラウザに返しません。動画のアップロードはまだ行いません。</p>`
    );
  }

  if (error) {
    const cancelled = error === "access_denied";
    return sendHtml(
      res,
      400,
      cancelled ? "認証がキャンセルされました" : "Google 認証エラー",
      `<p>${escapeHtml(params.get("error_description") || error)}</p>
       <p class="muted"><a href="/api/auth/youtube/start">認証をやり直す</a></p>`,
      clearState()
    );
  }

  const cookies = parseCookies(req.headers && req.headers.cookie);
  const cookieState = cookies[STATE_COOKIE] || "";
  if (!code || !state || !cookieState || !timingSafeEqualStr(state, cookieState)) {
    return sendHtml(
      res,
      403,
      "不正なリクエスト（state）",
      `<p>CSRF 防止用の state が一致しません。<a href="/api/auth/youtube/start">認証開始</a>からやり直してください。</p>`,
      clearState()
    );
  }

  const cfg = getYoutubeConfig();
  if (!configReady(cfg)) {
    return sendHtml(
      res,
      503,
      "サーバー設定不足",
      "<p><code>GOOGLE_CLIENT_ID</code> と <code>GOOGLE_CLIENT_SECRET</code> を確認してください。</p>",
      clearState()
    );
  }

  let exchanged;
  try {
    exchanged = await exchangeCode(cfg, code);
  } catch (exchangeError) {
    console.error("youtube-oauth: exchange threw", exchangeError && exchangeError.message);
    return sendHtml(
      res,
      502,
      "トークン交換に失敗しました",
      "<p>Google への接続中にエラーが発生しました。</p>",
      clearState()
    );
  }
  if (!exchanged.ok) {
    console.error("youtube-oauth: exchange failed", exchanged.status);
    return sendHtml(
      res,
      502,
      "トークン交換に失敗しました",
      `<p>Google が認証コードを拒否しました。リダイレクト URL が <code>${escapeHtml(cfg.redirectUri)}</code> と完全一致しているか確認してください。</p>`,
      clearState()
    );
  }
  if (!exchanged.refreshToken) {
    return sendHtml(
      res,
      502,
      "Refresh Token がありません",
      "<p>Google アカウントのアプリ連携を解除してから、認証をやり直してください。</p>",
      clearState()
    );
  }

  let channel = { ok: false, channelId: "", channelTitle: "", error: "" };
  try {
    channel = await fetchChannel(exchanged.accessToken);
  } catch (channelError) {
    console.error("youtube-oauth: channel lookup threw", channelError && channelError.message);
  }

  const saved = await persistYoutubeAuth({
    accessToken: exchanged.accessToken,
    refreshToken: exchanged.refreshToken,
    expiresIn: exchanged.expiresIn,
    scope: exchanged.scope,
    tokenType: exchanged.tokenType,
    channelId: channel.channelId,
    channelTitle: channel.channelTitle,
  });

  const channelLabel = channel.channelTitle || channel.channelId || "チャンネル名は取得できませんでした";
  const saveNote = saved.ok
    ? "<p>Refresh Token は暗号化してサーバーに保存しました。ブラウザには出していません。</p>"
    : `<p>トークン交換は成功しましたが、保存に失敗しました（<code>${escapeHtml(saved.error || "unknown")}</code>）。</p>`;

  return sendHtml(
    res,
    saved.ok ? 200 : 502,
    saved.ok ? "YouTube 連携に成功しました" : "YouTube 連携の保存に失敗しました",
    `<p>接続したチャンネル: ${escapeHtml(channelLabel)}</p>
     ${channel.ok ? "" : `<p class="muted">チャンネル情報の取得に失敗しました。</p>`}
     ${saveNote}
     <p class="muted">動画のアップロードは、この画面では行いません。</p>
     <p><a href="/">サイトトップへ戻る</a></p>`,
    clearState()
  );
};
