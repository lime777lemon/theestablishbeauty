/**
 * Supabase Database Webhook（contact_inquiries INSERT）→ Resend で通知メール
 *
 * デプロイ後の URL 例: https://<project>.vercel.app/api/notify-contact-inquiry
 *
 * 環境変数（Vercel ダッシュボード）:
 * - RESEND_API_KEY
 * - CONTACT_NOTIFY_FROM  … Resend で検証済みの送信元（例: onboarding@resend.dev または自ドメイン）
 * - CONTACT_NOTIFY_TO    … 通知を受け取る宛先（例: info@theestablish.jp）
 * - CONTACT_WEBHOOK_SECRET … 共有秘密。Supabase Webhook の Authorization: Bearer と一致させる
 */

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readJsonBody(req) {
  const b = req.body;
  if (b === undefined || b === null) {
    return null;
  }
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString("utf8") || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "string") {
    try {
      return JSON.parse(b || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "object") {
    return b;
  }
  return null;
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  const auth = req.headers.authorization || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_NOTIFY_FROM;
  const to = process.env.CONTACT_NOTIFY_TO;
  if (!resendKey || !from || !to) {
    console.error("notify-contact-inquiry: missing RESEND_API_KEY / CONTACT_NOTIFY_FROM / CONTACT_NOTIFY_TO");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  let body = readJsonBody(req);
  if (body === null) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Expected JSON object" });
  }

  const root = body.payload && typeof body.payload === "object" ? body.payload : body;
  const type = root.type ?? root.eventType ?? body.event?.type ?? body.event_type;
  const table = root.table ?? body.event?.table;
  const schema = root.schema ?? body.event?.schema ?? "public";
  const record = root.record ?? root.new ?? body.record ?? body.new ?? body.event?.record ?? null;

  const schemaOk = String(schema || "public").toLowerCase() === "public";
  const tableOk = String(table || "").toLowerCase() === "contact_inquiries";
  const typeOk = String(type || "").toUpperCase() === "INSERT";

  if (!schemaOk || !tableOk || !typeOk) {
    console.warn("notify-contact-inquiry: skipped (not contact_inquiries INSERT)", {
      schema,
      table,
      type,
      topKeys: Object.keys(body),
    });
    return res.status(200).json({ ok: true, skipped: true });
  }
  if (!record || typeof record !== "object") {
    console.error("notify-contact-inquiry: missing record keys", Object.keys(body));
    return res.status(400).json({ error: "Missing record" });
  }

  const name = record.name ?? "";
  const email = record.email ?? "";
  const inquiryType = record.inquiry_type ?? "";
  const message = record.message ?? "";
  const id = record.id ?? "";
  const createdAt = record.created_at ?? "";

  const text = [
    `お問い合わせが届きました（contact_inquiries）`,
    ``,
    `ID: ${id}`,
    `日時: ${createdAt}`,
    `お名前: ${name}`,
    `メール: ${email}`,
    `種別: ${inquiryType}`,
    ``,
    `--- 内容 ---`,
    message,
  ].join("\n");

  const html = `
    <p>お問い合わせが届きました（<code>contact_inquiries</code>）</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0"><strong>ID</strong></td><td>${escapeHtml(id)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>日時</strong></td><td>${escapeHtml(createdAt)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>お名前</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>メール</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>種別</strong></td><td>${escapeHtml(inquiryType)}</td></tr>
    </table>
    <p><strong>内容</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;background:#f6f6f6;padding:12px;border-radius:6px">${escapeHtml(
      message
    )}</pre>
  `.trim();

  const subject = `【お問い合わせ】${name ? String(name).slice(0, 40) : "(無名)"}`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
    }),
  });

  const raw = await r.text();
  if (!r.ok) {
    console.error("Resend error", r.status, raw);
    return res.status(502).json({ error: "Resend request failed", status: r.status });
  }

  return res.status(200).json({ ok: true });
}

module.exports = handler;
