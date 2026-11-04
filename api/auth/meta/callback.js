/**
 * GET /api/auth/meta/callback
 * Meta Instagram Unified Login OAuth redirect endpoint (Graph API v26.0).
 *
 * - Validates CSRF `state` against HttpOnly cookie
 * - Exchanges `code` for access token server-side (App Secret never leaves server)
 * - Never exposes access tokens to the browser
 * - Persists token to Supabase `meta_instagram_oauth` when configured
 *
 * Instagram auto-post Cron must stay disabled until auth is verified end-to-end.
 */

const {
  getMetaConfig,
  metaConfigReady,
  STATE_COOKIE,
  parseCookies,
  timingSafeEqualStr,
  buildStateCookie,
  exchangeCodeForToken,
  fetchLinkedMetaProfile,
  persistOAuthToken,
  sendHtml,
  escapeHtml,
  queryFromReq,
} = require("../../meta-oauth-lib");

function clearStateHeaders() {
  return { "Set-Cookie": buildStateCookie("", { clear: true }) };
}

async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Cache-Control", "no-store");
    return res.end("Method Not Allowed");
  }

  const params = queryFromReq(req);
  const error = params.get("error");
  const errorReason = params.get("error_reason");
  const errorDescription = params.get("error_description");
  const code = params.get("code");
  const state = params.get("state");

  // Probe / health: endpoint exists (Meta dashboard Redirect URI check)
  if (!error && !code && !state) {
    return sendHtml(
      res,
      200,
      "Meta OAuth コールバック",
      `<p>この URL は Meta Instagram Unified Login のリダイレクト先として利用可能です。</p>
       <p class="muted">認証を開始するには <a href="/api/auth/meta/start">/api/auth/meta/start</a> へ進んでください（管理用）。</p>
       <p class="muted">アクセストークンはブラウザに返しません。</p>`
    );
  }

  if (error) {
    const cancelled =
      error === "access_denied" ||
      errorReason === "user_denied" ||
      /cancel/i.test(String(errorDescription || ""));
    const title = cancelled ? "認証がキャンセルされました" : "Meta 認証エラー";
    return sendHtml(
      res,
      400,
      title,
      `<p>${escapeHtml(errorDescription || errorReason || error)}</p>
       <p class="muted">もう一度試す場合は <a href="/api/auth/meta/start">ログインを再開</a>してください。</p>
       <p class="muted"><a href="/">サイトトップへ戻る</a></p>`,
      clearStateHeaders()
    );
  }

  if (!code) {
    return sendHtml(
      res,
      400,
      "認証コードがありません",
      `<p>Meta からの <code>code</code> パラメータがありません。</p>
       <p class="muted"><a href="/api/auth/meta/start">ログインを再開</a></p>`,
      clearStateHeaders()
    );
  }

  const cookies = parseCookies(req.headers && req.headers.cookie);
  const cookieState = cookies[STATE_COOKIE] || "";
  if (!state || !cookieState || !timingSafeEqualStr(state, cookieState)) {
    return sendHtml(
      res,
      403,
      "不正なリクエスト（state）",
      `<p>CSRF 防止用の state が一致しません。ブックマークや古いリンクではなく、<a href="/api/auth/meta/start">認証開始 URL</a> からやり直してください。</p>`,
      clearStateHeaders()
    );
  }

  const cfg = getMetaConfig();
  if (!metaConfigReady(cfg)) {
    return sendHtml(
      res,
      503,
      "サーバー設定不足",
      `<p>Meta App の環境変数が未設定です。Vercel の Production に <code>META_APP_ID</code> / <code>META_APP_SECRET</code> / <code>META_LOGIN_CONFIG_ID</code> を入れて再デプロイしてください。</p>`,
      clearStateHeaders()
    );
  }

  let exchanged;
  try {
    exchanged = await exchangeCodeForToken(cfg, code);
  } catch (e) {
    console.error("meta-oauth: exchange threw", e && e.message ? e.message : e);
    return sendHtml(
      res,
      502,
      "トークン交換に失敗しました",
      `<p>Meta Graph API への接続中にエラーが発生しました。しばらくしてから再試行してください。</p>`,
      clearStateHeaders()
    );
  }

  if (!exchanged.ok) {
    console.error("meta-oauth: exchange failed", exchanged.status, exchanged.error);
    return sendHtml(
      res,
      502,
      "トークン交換に失敗しました",
      `<p>Meta が認証コードを拒否しました（詳細はサーバーログのみ）。</p>
       <p class="muted">リダイレクト URL が Meta ダッシュボード登録と完全一致しているか確認してください。</p>
       <p class="muted"><a href="/api/auth/meta/start">再試行</a></p>`,
      clearStateHeaders()
    );
  }

  // Token stays server-side only — never interpolate into HTML
  let profile = {
    clientBusinessId: null,
    instagramAccounts: [],
    meError: null,
    igError: null,
  };
  try {
    profile = await fetchLinkedMetaProfile(exchanged.accessToken);
  } catch (e) {
    console.error("meta-oauth: profile fetch threw", e && e.message ? e.message : e);
  }

  const persist = await persistOAuthToken({
    accessToken: exchanged.accessToken,
    tokenType: exchanged.tokenType,
    expiresIn: exchanged.expiresIn,
    clientBusinessId: profile.clientBusinessId,
    instagramAccounts: profile.instagramAccounts,
  });

  const igCount = profile.instagramAccounts.length;
  const igLabel =
    igCount > 0
      ? profile.instagramAccounts
          .map((a) => (a.username ? `@${a.username}` : a.id))
          .join(", ")
      : "（assigned_instagram_accounts なし — 権限・連携を確認）";

  const persistNote = persist.ok
    ? `<p class="muted">トークンはサーバー側ストアに保存しました（ブラウザには出していません）。</p>`
    : `<p class="muted">トークン交換は成功しましたが、永続化に失敗しました（<code>${escapeHtml(persist.error || "unknown")}</code>）。マイグレーション <code>meta_instagram_oauth</code> と <code>SUPABASE_SERVICE_ROLE_KEY</code> を確認してください。トークン自体はレスポンスに含めていません。</p>`;

  return sendHtml(
    res,
    200,
    "Instagram / Meta 連携に成功しました",
    `<p>Unified Login の認証コードをサーバーでアクセストークンに交換しました。</p>
     <p>連携 Instagram: ${escapeHtml(igLabel)}</p>
     ${
       profile.clientBusinessId
         ? `<p class="muted">client_business_id: ${escapeHtml(profile.clientBusinessId)}</p>`
         : `<p class="muted">client_business_id は取得できませんでした${
             profile.meError ? `（${escapeHtml(profile.meError)}）` : ""
           }。</p>`
     }
     ${persistNote}
     <p class="muted">自動投稿 Cron は、認証の最終確認が終わるまで有効化しないでください。</p>
     <p><a href="/">サイトトップへ戻る</a></p>`,
    clearStateHeaders()
  );
}

module.exports = handler;
