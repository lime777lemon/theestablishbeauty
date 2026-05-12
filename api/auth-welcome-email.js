/**
 * 会員登録完了後のお客様向けメール（Resend）
 * 環境変数: RESEND_API_KEY, CONTACT_NOTIFY_FROM（または AUTH_REGISTER_EMAIL_FROM）
 * ログイン URL 用: PUBLIC_SITE_URL / SITE_URL / AUTH_PUBLIC_SITE_ORIGIN（推奨）。
 * 未設定時は CONTACT_ALLOWED_ORIGINS の先頭 https、または VERCEL_URL を使用。
 */

function cleanEnvLine(s) {
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

function trimOrigin(s) {
  return String(s || "")
    .trim()
    .replace(/\/+$/, "");
}

function getPublicSiteOrigin() {
  let o = trimOrigin(
    process.env.PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.AUTH_PUBLIC_SITE_ORIGIN
  );
  if (o) return o;
  const raw = String(process.env.CONTACT_ALLOWED_ORIGINS || "");
  for (const part of raw.split(",")) {
    const t = trimOrigin(part);
    if (t.startsWith("https://")) return t;
    if (t.startsWith("http://localhost") || t.startsWith("http://127.0.0.1")) return t;
  }
  const v = trimOrigin(process.env.VERCEL_URL);
  if (v) return v.startsWith("http") ? v : `https://${v}`;
  return "";
}

/**
 * @returns {Promise<boolean>} Resend 送信に成功したか（スキップは false）
 */
async function sendRegistrationWelcomeEmail({
  flow,
  email,
  displayName,
  company,
  contactName,
}) {
  const resendKey = cleanEnvLine(process.env.RESEND_API_KEY);
  const from =
    cleanEnvLine(process.env.AUTH_REGISTER_EMAIL_FROM) ||
    cleanEnvLine(process.env.CONTACT_NOTIFY_FROM);
  if (!resendKey || !from) {
    console.warn(
      "auth-welcome-email: skipped (set RESEND_API_KEY and CONTACT_NOTIFY_FROM or AUTH_REGISTER_EMAIL_FROM)"
    );
    return false;
  }

  const origin = getPublicSiteOrigin();
  if (!origin) {
    console.warn(
      "auth-welcome-email: skipped (set PUBLIC_SITE_URL or https URL in CONTACT_ALLOWED_ORIGINS, or deploy with VERCEL_URL)"
    );
    return false;
  }

  const isConsumer = flow === "consumer";
  const loginPath = isConsumer
    ? "/auth-consumer-login.html"
    : "/auth-business-login.html";
  const loginUrl = `${origin}${loginPath}`;

  const greeting = isConsumer
    ? displayName || "お客様"
    : contactName || company || "お客様";
  const subject = isConsumer
    ? "【EMR-TEK】会員登録が完了しました"
    : "【The Establish Beauty】法人アカウント登録が完了しました";

  const brandLine = isConsumer
    ? "EMR-TEK の個人会員登録を受け付けました。"
    : "The Establish Beauty の法人アカウント登録を受け付けました。";

  const text = [
    `${greeting} 様`,
    ``,
    brandLine,
    ``,
    `下記リンクからログインしてください（登録時に設定したパスワードを使用します）。`,
    loginUrl,
    ``,
    `※ このメールに心当たりがない場合は破棄してください。`,
  ].join("\n");

  const html = `
    <p>${escapeHtml(greeting)} 様</p>
    <p>${escapeHtml(brandLine)}</p>
    <p>下のボタンからログインしてください（登録時に設定したパスワードを使用します）。</p>
    <p style="margin:24px 0">
      <a href="${escapeHtml(loginUrl)}" style="display:inline-block;padding:12px 20px;background:#111827;color:#fff;text-decoration:none;border-radius:8px;font-family:sans-serif;font-size:15px">ログインページを開く</a>
    </p>
    <p style="font-size:13px;color:#555;font-family:sans-serif">リンクが使えない場合は、次の URL をブラウザに貼り付けてください。<br/><span style="word-break:break-all">${escapeHtml(
      loginUrl
    )}</span></p>
    <p style="font-size:12px;color:#888;font-family:sans-serif">※ このメールに心当たりがない場合は破棄してください。</p>
  `.trim();

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject,
      text,
      html,
    }),
  });

  const raw = await r.text();
  if (!r.ok) {
    console.error("auth-welcome-email: Resend error", r.status, raw.slice(0, 500));
    return false;
  }
  return true;
}

module.exports = {
  sendRegistrationWelcomeEmail,
  getPublicSiteOrigin,
};
