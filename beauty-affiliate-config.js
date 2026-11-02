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
const A8_COSMETICS_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBMW+CIP5PU+3AT8+5ZMCH" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=261102056757&wid=001&eno=01&mid=s00000015398001006000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4BGBMW+CIP5PU+3AT8+5ZMCH" alt="">';

const A8_HAIRCARE =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBMW+CEJ4HE+3HS2+2HCQGX" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=261102056750&wid=001&eno=01&mid=s00000016301015008000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BGBMW+CEJ4HE+3HS2+2HCQGX" alt="">';

const A8_SKINCARE =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBMW+CDC99U+3OIU+631SX" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=261102056748&wid=001&eno=01&mid=s00000017175001022000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BGBMW+CDC99U+3OIU+631SX" alt="">';

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
      banners: [{ id: "a8-haircare", html: A8_HAIRCARE }],
    },
    {
      id: "cosmetics",
      titleJa: "化粧品",
      titleEn: "Cosmetics",
      products: [],
      banners: [{ id: "a8-cosmetics-2", html: A8_COSMETICS_2 }],
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
      banners: [
        { id: "a8-skincare-2", html: A8_SKINCARE },
        { id: "a8-skincare-3", html: A8_COSMETICS_2 },
      ],
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
