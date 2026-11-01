/**
 * Dropship routing allowlist.
 * Assignment is a fixed map. Unlisted products go to manual review.
 * Do not grow past maxAutoSuppliers without a human check of each supplier contract.
 */
(function (root, factory) {
  const catalog = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = catalog;
  root.__DROPSHIP_CATALOG__ = catalog;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const suppliers = [
    {
      id: "supplier-emr-tek",
      name: "EMR-TEK",
      /** Official store. Purchases leave this site with the Snowball code. */
      fulfillment: "affiliate",
      categories: ["red", "mask", "uv", "glasses", "stands", "indoor"],
    },
  ];

  return {
    /** Safe automatic cap. Extra suppliers must be added here by a person, not by the model. */
    maxAutoSuppliers: 8,
    /**
     * affiliate: send the shopper to that company's store (EMR-TEK uses Snowball).
     * stripe: keep checkout on this site and record the order for that company's Stripe.
     */
    suppliers,
    /** Optional exact product id → supplier id. Wins over category. */
    productSupplier: {},
  };
});
