/**
 * Beauty Column catalog (separate from EMR-TEK / Social Snowball).
 *
 * Add a product inside the matching category's `products` array:
 * {
 *   id: "unique-id",
 *   titleJa: "商品名",
 *   titleEn: "Product name",
 *   blurbJa: "短い説明",
 *   blurbEn: "Short description",
 *   href: "https://affiliate.example/product",
 *   image: "./assets/example.jpg",
 *   priceJa: "¥3,980",
 *   priceEn: "¥3,980",
 * }
 */
window.__BEAUTY_AFFILIATE_CONFIG__ = {
  programName: "Beauty Column",
  categories: [
    {
      id: "haircare",
      titleJa: "ヘアケア",
      titleEn: "Hair care",
      blurbJa: "シャンプー、トリートメント、頭皮ケア。",
      blurbEn: "Shampoo, treatments, and scalp care.",
      products: [],
    },
    {
      id: "cosmetics",
      titleJa: "化粧品",
      titleEn: "Cosmetics",
      products: [],
    },
    {
      id: "nails",
      titleJa: "ネイル",
      titleEn: "Nails",
      blurbJa: "ネイルカラー、ケア、ジェル。",
      blurbEn: "Color, care, and gel.",
      products: [],
    },
    {
      id: "skincare",
      titleJa: "スキンケア",
      titleEn: "Skincare",
      blurbJa: "洗顔、保湿、日中ケア。",
      blurbEn: "Cleansing, moisture, and daytime care.",
      products: [],
    },
    {
      id: "makeup",
      titleJa: "メイクアップ",
      titleEn: "Makeup",
      blurbJa: "ベース、ポイントメイク、仕上げ。",
      blurbEn: "Base, color, and finishing.",
      products: [],
    },
    {
      id: "body",
      titleJa: "ボディケア",
      titleEn: "Body care",
      blurbJa: "ボディウォッシュ、クリーム、ハンドケア。",
      blurbEn: "Wash, cream, and hand care.",
      products: [],
    },
    {
      id: "fragrance",
      titleJa: "フレグランス",
      titleEn: "Fragrance",
      blurbJa: "香水、ボディミスト、ホームフレグランス。",
      blurbEn: "Perfume, body mist, and home fragrance.",
      products: [],
    },
    {
      id: "inner",
      titleJa: "インナービューティー",
      titleEn: "Inner beauty",
      blurbJa: "美容サプリ、ドリンク。",
      blurbEn: "Beauty supplements and drinks.",
      products: [],
    },
    {
      id: "tools",
      titleJa: "美容家電",
      titleEn: "Beauty tools",
      blurbJa: "ドライヤー、美顔器、ヘアアイロン。",
      blurbEn: "Dryers, facial devices, and irons.",
      products: [],
    },
  ],
};
