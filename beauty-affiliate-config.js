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

const A8_HAIR_TOOL =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+AVR8TU+3HS2+2BEEF5" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www22.a8.net/svt/bgt?aid=261102062658&wid=001&eno=01&mid=s00000016301014008000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4BGBN2+AVR8TU+3HS2+2BEEF5" alt="">';

const A8_HAIRCARE_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+BAN2YA+4KJC+BYLJL" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=261102062683&wid=001&eno=01&mid=s00000021324002009000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4BGBN2+BAN2YA+4KJC+BYLJL" alt="">';

const A8_HAIRCARE_3 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN3+6HZDIQ+4X44+609HT" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www23.a8.net/svt/bgt?aid=261102063393&wid=001&eno=01&mid=s00000022954001009000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4BGBN3+6HZDIQ+4X44+609HT" alt="">';

const A8_SHAVING =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+6ZUDO2+1JHI+C28PT" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=261102062423&wid=001&eno=01&mid=s00000007191002026000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4BGBN2+6ZUDO2+1JHI+C28PT" alt="">';

const A8_MENS =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+BBTY5U+328C+3N0NDT" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=261102062685&wid=001&eno=01&mid=s00000014286022006000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BGBN2+BBTY5U+328C+3N0NDT" alt="">';

const A8_DIET =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+805TKI+44UC+NV1XD" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=261102062484&wid=001&eno=01&mid=s00000019290004008000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4BGBN2+805TKI+44UC+NV1XD" alt="">';

const A8_BODY =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN3+B1PKVM+44UC+1BNJ9D" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=261102063668&wid=001&eno=01&mid=s00000019290008004000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4BGBN3+B1PKVM+44UC+1BNJ9D" alt="">';

const A8_BODY_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN3+B0IPO2+39SK+15Q22P" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=261102063666&wid=001&eno=01&mid=s00000015266007008000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4BGBN3+B0IPO2+39SK+15Q22P" alt="">';

const A8_ESTHE =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+BVH94I+1OGO+CCBDD" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=261102062718&wid=001&eno=01&mid=s00000007836002073000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4BGBN2+BVH94I+1OGO+CCBDD" alt="">';

const A8_ESTHE_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+B1PKVM+2CSS+60OXD" rel="nofollow">\n' +
  '<img border="0" width="234" height="60" alt="" src="https://www27.a8.net/svt/bgt?aid=261102062668&wid=001&eno=01&mid=s00000010990001011000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4BGBN2+B1PKVM+2CSS+60OXD" alt="">';

const A8_SEITAI =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+BMJR1U+3UK2+HWI5T" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=261102062703&wid=001&eno=01&mid=s00000017957003007000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4BGBN2+BMJR1U+3UK2+HWI5T" alt="">';

const A8_DEVICE =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+AUKDMA+54TM+I1075" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=261102062656&wid=001&eno=01&mid=s00000023953003028000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4BGBN2+AUKDMA+54TM+I1075" alt="">';

const A8_TOOLS_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN3+6PQ0DU+4GDM+ZQNG1" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=261102063406&wid=001&eno=01&mid=s00000020785006003000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4BGBN3+6PQ0DU+4GDM+ZQNG1" alt="">';

const A8_TOOLS_3 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN3+6HDXWY+4QVE+5ZMCH" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=261102063392&wid=001&eno=01&mid=s00000022145001006000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4BGBN3+6HDXWY+4QVE+5ZMCH" alt="">';

const A8_NAILS =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+AZXA2A+2SNC+656YP" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=261102062665&wid=001&eno=01&mid=s00000013044001032000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BGBN2+AZXA2A+2SNC+656YP" alt="">';

const A8_NAILS_2 =
  '<a href="https://px.a8.net/svt/ejp?a8mat=4BGBN2+AWCOFM+34VM+25G2DD" rel="nofollow">\n' +
  '<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=261102062659&wid=001&eno=01&mid=s00000014629013008000&mc=1"></a>\n' +
  '<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4BGBN2+AWCOFM+34VM+25G2DD" alt="">';

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
      banners: [
        { id: "a8-haircare", html: A8_HAIRCARE },
        { id: "a8-hair-tool", html: A8_HAIR_TOOL },
        { id: "a8-haircare-2", html: A8_HAIRCARE_2 },
        { id: "a8-haircare-3", html: A8_HAIRCARE_3 },
      ],
    },
    {
      id: "lashes",
      titleJa: "まつげ/眉毛",
      titleEn: "Lashes and brows",
      products: [],
    },
    {
      id: "transplant",
      titleJa: "植毛",
      titleEn: "Hair transplant",
      products: [],
    },
    {
      id: "nails",
      titleJa: "ネイル",
      titleEn: "Nails",
      blurbJa: "ネイルカラー、ケア、ジェル。",
      blurbEn: "Color, care, and gel.",
      products: [],
      banners: [
        { id: "a8-nails", html: A8_NAILS },
        { id: "a8-nails-2", html: A8_NAILS_2 },
      ],
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
        { id: "a8-skincare-device", html: A8_DEVICE },
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
      banners: [
        { id: "a8-body", html: A8_BODY },
        { id: "a8-body-2", html: A8_BODY_2 },
      ],
    },
    {
      id: "shaving",
      titleJa: "男性用シェービング",
      titleEn: "Men's shaving",
      products: [],
      banners: [{ id: "a8-shaving", html: A8_SHAVING }],
    },
    {
      id: "mens",
      titleJa: "男性美容",
      titleEn: "Men's beauty",
      products: [],
      banners: [
        { id: "a8-mens", html: A8_SHAVING },
        { id: "a8-mens-2", html: A8_MENS },
        { id: "a8-mens-device", html: A8_DEVICE },
      ],
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
      id: "diet",
      titleJa: "ダイエット",
      titleEn: "Diet",
      products: [],
      banners: [
        { id: "a8-diet", html: A8_DIET },
        { id: "a8-diet-body", html: A8_BODY },
      ],
    },
    {
      id: "surgery",
      titleJa: "美容整形",
      titleEn: "Cosmetic surgery",
      products: [],
    },
    {
      id: "esthe",
      titleJa: "エステ",
      titleEn: "Esthetic",
      products: [],
      banners: [
        { id: "a8-esthe", html: A8_ESTHE },
        { id: "a8-esthe-2", html: A8_ESTHE_2 },
      ],
    },
    {
      id: "seitai",
      titleJa: "美容整体",
      titleEn: "Beauty seitai",
      products: [],
      banners: [{ id: "a8-seitai", html: A8_SEITAI }],
    },
    {
      id: "tools",
      titleJa: "美容家電",
      titleEn: "Beauty tools",
      blurbJa: "ドライヤー、美顔器、ヘアアイロン。",
      blurbEn: "Dryers, facial devices, and irons.",
      products: [],
      banners: [
        { id: "a8-tools", html: A8_HAIR_TOOL },
        { id: "a8-tools-device", html: A8_DEVICE },
        { id: "a8-tools-2", html: A8_TOOLS_2 },
        { id: "a8-tools-3", html: A8_TOOLS_3 },
      ],
    },
  ],
};
