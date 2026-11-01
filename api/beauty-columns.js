/**
 * GET /api/beauty-columns — published daily columns, newest first.
 */

const { listColumns } = require("./beauty-columns-lib");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const columns = await listColumns();
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).json({ columns });
  } catch (error) {
    console.error("beauty-columns:", error.message);
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ columns: [] });
  }
};
