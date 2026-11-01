/**
 * Daily beauty column settings.
 * The cron job at /api/beauty-column-daily rotates through `categories`.
 * Set enabled to false to stop new columns without removing ones already published.
 */
(function (root, factory) {
  const config = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = config;
  root.__BEAUTY_COLUMN_AUTO__ = config;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    enabled: true,
    categories: [
      "skincare",
      "haircare",
      "cosmetics",
      "nails",
      "makeup",
      "body",
      "fragrance",
      "inner",
      "tools",
    ],
  };
});
