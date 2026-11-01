/**
 * GET /api/beauty-column-daily — Vercel Cron, once a day.
 * Writes one beauty column for the current date in Asia/Tokyo.
 * Authorization: Bearer CRON_SECRET (sent automatically when that env var is set).
 */

const { cronAuthorized, findByDate, generateColumn, tokyoDate } = require("./beauty-columns-lib");

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!cronAuthorized(req)) {
    return res.status(401).json({ error: "認証が必要です。" });
  }

  const date = tokyoDate();
  try {
    const existing = await findByDate(date);
    if (existing) {
      return res.status(200).json({ ok: true, created: false, column: existing });
    }
    const column = await generateColumn(date);
    return res.status(201).json({ ok: true, created: true, column });
  } catch (error) {
    const status = Number(error.status) || 500;
    return res.status(status).json({ error: error.message || "コラムの作成に失敗しました。" });
  }
};
