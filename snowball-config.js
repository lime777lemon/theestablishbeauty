/**
 * Social Snowball (headless Shopify) — edit shop if your myshopify URL differs.
 * @see https://help.socialsnowball.io/en/articles/8887785-social-snowball-for-headless-shopify-stores
 */
window.__SNOWBALL_CONFIG__ = {
  shop: "emr-tek.myshopify.com",
  /** Days to keep affiliate code in localStorage (Social Snowball cookie window may differ). */
  attributionDays: 30,
  /**
   * Default affiliate landing (Social Snowball /CODE on emr-tek.com).
   * Used for shop CTAs site-wide when set.
   */
  referralShopUrl: "https://www.emr-tek.com/YUKI03417",
  defaultSnowballCode: "YUKI03417",
  /**
   * Optional: affiliate signup portal URL from Social Snowball dashboard.
   * When set, footer can link “Become an affiliate” (see snowball-affiliate.mjs).
   */
  affiliatePortalUrl: "",
};
