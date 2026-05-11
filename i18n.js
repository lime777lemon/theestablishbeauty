/**
 * Japanese / English UI strings for static pages.
 * Preference: localStorage key establish_site_lang ("ja" | "en")
 */
(function () {
  const STORAGE_KEY = "establish_site_lang";

  const MESSAGES = {
    ja: {
      "teb.doc.title": "The Establish Beauty — ホーム",
      "teb.doc.desc":
        "The Establish Beauty — Beauty Commerce Infrastructure。ブランド専用LP（/brands/...）で世界観を分け、アカウント・カート・Checkoutは統合。split fulfillment。マルチベンダー・キュレーション・手数料モデル。",

      "teb.skip": "本文へスキップ",
      "teb.topbar.tagline": "Unified account · checkout · split fulfillment",
      "teb.brand.aria": "The Establish Beauty ホーム",
      "teb.brand.logoAlt": "The Establish Beauty ロゴ",
      "teb.nav.main": "メイン",
      "teb.nav.menu": "メニュー",
      "teb.nav.home": "ホーム",
      "teb.nav.model": "仕組み",
      "teb.nav.infra": "インフラ",
      "teb.nav.marketplace": "Marketplace",
      "teb.nav.partners": "取引先",
      "teb.nav.emr": "EMR-TEK ストア",
      "teb.nav.contact": "お問い合わせ",
      "teb.crumb.label": "パンくず",
      "teb.crumb.home": "ホーム",
      "teb.hero.kicker": "Beauty Commerce Infrastructure",
      "teb.hero.h1": "美しさを、正直に届ける。",
      "teb.hero.lead":
        "<strong>ブランド専用 LP</strong>で世界観を分け（例：<span class=\"establishPath\">/brands/redlight</span> · <span class=\"establishPath\">/brands/kbeauty</span> · <span class=\"establishPath\">/brands/organic</span>）、一方で<strong>アカウント・カート・Checkout はマーケット共通</strong>の現代的な型です。決済は統合、出荷はベンダーごとに<strong>split fulfillment</strong>。単なる EC ではなく、集積・LP・決済・導線・分配・獲得を束ねる<strong>インフラ</strong>として設計します。",
      "teb.btn.lp": "LP / 統合チェックアウト",
      "teb.btn.infra": "インフラとしての価値",
      "teb.btn.market": "Marketplace",
      "teb.btn.emr": "EMR-TEK ストアへ",
      "teb.hero.img.alt":
        "艶やかなウェーブヘアの女性の横顔 — 上質なビューティをイメージしたヒーロービジュアル",

      "teb.showroom.h2": "キュレーションされた発見の場",
      "teb.showroom.p":
        "美容デバイスからスキンケアまで、厳選ブランドが並ぶショールームのような体験を、オンラインでも。The Establish Beauty が目指すのは、インフラの背後にある「信頼できる美の選び方」です。",
      "teb.showroom.img.alt":
        "The Establish Beauty のネオンサインと、カウンターに並ぶコスメ・美容デバイスが映る上質なショールーム空間",

      "teb.showcase.h2": "ブランドの世界観",
      "teb.showcase.p":
        "デバイスからスキンケア、メイクまで。キュレーションされたビジュアルで、マーケットの幅をイメージしてください。",
      "teb.showcase.alt.portrait": "明るい照明のもと、白いニットを着た女性のポートレート — プレミアムビューティのトーン",
      "teb.showcase.alt.cosmetics":
        "大理石の上に並ぶ MAC・Estée Lauder・Urban Decay などのラグジュアリーコスメ — 多様なブランドの並び",
      "teb.showcase.alt.skincare": "LUMIN のリカバリーオイルとチャコールクレンザー — ミニマルな黒パッケージのスキンケア",
      "teb.showcase.alt.glossier":
        "淡いブルーと白の背景に Glossier のスキンケア・メイク製品が並ぶバナー — Cloud Paint、日焼け止め、Solution など",
      "teb.showcase.alt.collection":
        "ポートレートとスキンケア製品のコラージュ。「BEAUTY COLLECTION」「厳選ブランドをひとつに」のキャプション入りのプロモーションビジュアル",

      "teb.model.h2": "マルチベンダー型マーケットプレイス",
      "teb.model.intro":
        "<strong>見せ方は LP ごと、買い手体験は統合。</strong>ブランドごとに専用 LP と世界観を分け、ログイン・カート・Checkout はマーケット全体で共通にします。",
      "teb.url.h3": "ブランド LP の URL 例",
      "teb.url.p": "スラッグは契約・実装で確定。世界観・トーンはパス単位で分離する想定です。",
      "teb.buyer.h3": "買い手側（マーケット統合）",
      "teb.buyer.li1": "<strong>アカウント</strong> — <strong>共通</strong>（単一プロファイル／マーケット横断）。",
      "teb.buyer.li2": "<strong>カート</strong> — <strong>共通</strong>。複数ブランドの商品を同一カートへ。",
      "teb.buyer.li3":
        "<strong>Checkout</strong> — <strong>共通</strong>（<strong>unified / centralized checkout</strong>）。",
      "teb.buyer.li4":
        "<strong>フルフィル</strong> — <strong>分割</strong>（<strong>split fulfillment</strong> — ベンダーごとに出荷・在庫）。",
      "teb.buyer.li5": "<strong>注文データ</strong> — <strong>各社へ分配</strong>。",

      "teb.pillars.h3": "コピー・設計上の 3 つの柱",
      "teb.pillars.intro": "対外向けメッセージと内部の設計判断をそろえるためのラベルです。",
      "teb.pillars.img.alt":
        "3 列の図解：Marketplace（市場レイヤー）、Curated Commerce（キュレーションによるコマース）、Inventory-light Platform（在庫・オペレーションの基盤）をアイコンと日本語で説明したインフォグラフィック。",
      "teb.pillar.m.title": "Marketplace",
      "teb.pillar.c.title": "Curated Commerce",
      "teb.pillar.i.title": "Inventory-light Platform",
      "teb.pillar.m.body":
        "複数ブランドをひとつの場に載せ、発見から購入導線までを横断的に提供する「市場」レイヤー。",
      "teb.pillar.c.body":
        "掲載基準と編集によるキュレーション。ストーリーと品質のそろったコマース体験としてブランドを紹介する層。",
      "teb.pillar.i.body":
        "自社フルフィル中心の大量在庫モデルではなく、パートナー在庫・物流と組み合わせる在庫・オペレーションの基盤。",

      "teb.infra.h2": "Beauty Commerce Infrastructure",
      "teb.infra.intro":
        "単なる EC 店舗ではなく、美容ブランドのコマースを載せる<strong>インフラ</strong>として定義します。次を<strong>一つの基盤で統合</strong>することで、プラットフォームの価値は「店を出す」以上に大きくなります。",
      "teb.infra.diagram.alt":
        "BRAND を中心としたプラットフォームの全体図。周囲にブランド集積・LP 提供・決済・顧客導線・注文分配・顧客獲得の 6 領域、下部に統合データ基盤・パートナー連携・セキュリティ等の基盤要素を示す。",
      "teb.infra.li1": "<strong>ブランド集積</strong> — キュレーションされた掲載とパートナー管理。",
      "teb.infra.li2": "<strong>LP 提供</strong> — ブランド専用パス・テンプレ・世界観の分離。",
      "teb.infra.li3":
        "<strong>決済</strong> — 統合チェックアウトとリスク・コンプライアンスの集約（設計次第）。",
      "teb.infra.li4": "<strong>顧客導線</strong> — 発見から購入までの一貫した体験設計。",
      "teb.infra.li5":
        "<strong>注文分配</strong> — オーダーをベンダーへ振り分け、split fulfillment を支えるデータ層。",
      "teb.infra.li6":
        "<strong>顧客獲得</strong> — マーケット・キュレーションに紐づく獲得・リテンション（施策は別途）。",
      "teb.infra.note":
        "Positioning in English: a <strong>beauty commerce infrastructure</strong> layer — not only a storefront, but the integrated stack for brand aggregation, LP delivery, payments, customer journeys, order routing, and acquisition.",

      "teb.market.h2": "Beauty Marketplace",
      "teb.market.intro":
        "マルチベンダー型として、横断一覧・検索に加え、<strong>共通アカウント・共通カート・共通 Checkout</strong>と<strong>注文分配（split fulfillment）</strong>を載せたマーケットを準備中です。収益は<strong>販売手数料</strong>を中心とした設計を想定しています。",
      "teb.market.platform": "プラットフォーム側の役割（想定）",
      "teb.market.li1":
        "<span class=\"establishPath\">/brands/…</span> 形式のブランド専用 LP・テンプレ・掲載基準・キュレーション",
      "teb.market.li2":
        "統合アイデンティティ（共通アカウント）、共通カート、<strong>unified checkout</strong>、計測",
      "teb.market.li3": "注文確定後のデータ分配・ベンダー向けフルフィル（API・管理画面等は実装で定義）",
      "teb.market.li4": "在庫は原則パートナー側 — inventory-light（自社は大量在庫を持たない）",
      "teb.market.li5": "取引成立に連動する手数料・契約に基づくレベニューシェア",

      "teb.partners.h2": "取引先ブランド",
      "teb.partners.intro":
        "各ブランドは <span class=\"establishPath\">/brands/{slug}</span> 相当の専用 LP で世界観を分け、購入時は<strong>同一アカウント・同一カート・同一 Checkout</strong>に集約します。出荷と在庫は原則ベンダー側（split fulfillment）です。現在は EMR-TEK の日本語ストアを同一サイト内の導線（ブランド LP 相当）としてご利用いただけます。",
      "teb.partner.kicker": "Partner",
      "teb.partner.emr.desc":
        "赤色光・近赤外、UV、LED マスク、ブルーライトカット、コスメ、室内照明など。光とスキンケアのデバイスを中心に展開するブランドです。",
      "teb.partner.emr.btn": "EMR-TEK ストアを開く",
      "teb.partner.other.h3": "その他のブランド",
      "teb.partner.other.p": "追加の取引先が決まり次第、この欄に掲載します。",

      "teb.footer.note":
        "メインの法人・連絡先・ポリシー文面はドメイン公開時に合わせて整備してください。このページは静的プレースホルダーです。",
      "teb.footer.explore": "探索",
      "teb.footer.link.home": "ホーム",
      "teb.footer.link.showroom": "キュレーション・ショールーム",
      "teb.footer.link.model": "マルチベンダー型・3 つの柱",
      "teb.footer.link.infra": "Beauty Commerce Infrastructure",
      "teb.footer.link.market": "Beauty Marketplace",
      "teb.footer.link.emr": "EMR-TEK ストア",
      "teb.footer.link.contact": "お問い合わせ",
      "teb.footer.legal": "法的情報（EMR-TEK ストア）",
      "teb.footer.privacy": "プライバシーポリシー",
      "teb.footer.terms": "利用規約",
      "teb.footer.tokushoho": "特定商取引法に基づく表記",
      "teb.footer.legalnav": "法的情報",
      "teb.footer.credit2": "EMR-TEK 商品ページは従来どおり維持",

      "lang.label": "言語",
      "lang.ja": "日本語",
      "lang.en": "English",

      "emr.skip": "本文へスキップ",
      "emr.nav.main": "メイン",
      "emr.topbar.badge": "出荷2〜5営業日・お届け7〜14日目安",
      "emr.topbar.teb": "The Establish Beauty — メインページ",
      "emr.nav.teb": "TEB ホーム",
      "emr.nav.shop": "ショップ",
      "emr.nav.science": "科学を学ぶ",
      "emr.nav.blog": "ブログ",
      "emr.nav.track": "注文追跡",
      "emr.nav.faq": "FAQ",
      "emr.nav.contact": "お問い合わせ",
      "emr.brand.aria": "EMR-TEK ホーム",
      "emr.aria.search": "検索",
      "emr.aria.cart": "カート",
      "emr.aria.cartcount": "カート内商品数",
      "emr.topbar.langcurrency": "言語と通貨",
      "emr.pill.lang": "日本語",
      "emr.pill.currency": "日本 (JPY ¥)",

      "emr.modal.cart": "カート",
      "emr.modal.close": "閉じる",
      "emr.cart.empty": "カートは空です。",
      "emr.cart.subtotal": "小計",
      "emr.cart.checkout": "購入手続きへ",
      "emr.cart.clear": "カートを空にする",
      "emr.modal.search": "検索",
      "emr.search.keyword": "キーワード",
      "emr.search.placeholder": "例：Firewave / マスク / 近赤外",
      "emr.search.hint": "この検索は一覧（全商品）に反映されます。",
      "emr.search.apply": "適用",

      "emr.cookie.dialog": "Cookieの利用",
      "emr.cookie.title": "Cookieを使用しています",
      "emr.cookie.body": "体験向上と分析のためにCookieを利用します。設定はいつでも変更できます。",
      "emr.cookie.decline": "拒否",
      "emr.cookie.accept": "同意",

      "emr.footer.shop": "ショップ",
      "emr.footer.learn": "学ぶ",
      "emr.footer.newsletter": "ニュースレター",
      "emr.footer.newsletter.hint": "新商品・キャンペーン情報をお届けします。",
      "emr.footer.email.placeholder": "メールアドレス",
      "emr.footer.subscribe": "登録",
      "emr.footer.teb_main": "The Establish Beauty（メインページ）",
      "emr.footer.about": "EMR-TEKについて",
      "emr.footer.faq": "よくある質問",
      "emr.footer.allproducts": "全商品",
      "emr.footer.legal": "法的情報",

      "cart.title": "カート – EMR-TEK",
      "cart.desc": "ショッピングカートの内容を確認し、購入手続きへお進みください。",
      "cart.crumb": "カート",
      "cart.h1": "カート",
      "cart.sub": "内容をご確認のうえ、購入手続きへお進みください。",
      "cart.continue": "ショップを続ける",
      "cart.gotocheckout": "購入手続きへ進む",
    },
    en: {
      "teb.doc.title": "The Establish Beauty — Home",
      "teb.doc.desc":
        "The Establish Beauty — beauty commerce infrastructure. Brand LPs at /brands/…, unified account, cart, and checkout, with split fulfillment. Multi-vendor, curated, commission-based marketplace.",

      "teb.skip": "Skip to content",
      "teb.topbar.tagline": "Unified account · checkout · split fulfillment",
      "teb.brand.aria": "The Establish Beauty home",
      "teb.brand.logoAlt": "The Establish Beauty logo",
      "teb.nav.main": "Main",
      "teb.nav.menu": "Menu",
      "teb.nav.home": "Home",
      "teb.nav.model": "How it works",
      "teb.nav.infra": "Infrastructure",
      "teb.nav.marketplace": "Marketplace",
      "teb.nav.partners": "Partners",
      "teb.nav.emr": "EMR-TEK store",
      "teb.nav.contact": "Contact",
      "teb.crumb.label": "Breadcrumb",
      "teb.crumb.home": "Home",
      "teb.hero.kicker": "Beauty Commerce Infrastructure",
      "teb.hero.h1": "Beauty, delivered with integrity.",
      "teb.hero.lead":
        "Each brand gets its own <strong>dedicated LP</strong> (e.g. <span class=\"establishPath\">/brands/redlight</span> · <span class=\"establishPath\">/brands/kbeauty</span> · <span class=\"establishPath\">/brands/organic</span>), while <strong>account, cart, and checkout stay shared</strong> across the market. One payment flow; <strong>split fulfillment</strong> by vendor. We are building <strong>infrastructure</strong>—not just a store—for aggregation, LPs, payments, journeys, routing, and growth.",
      "teb.btn.lp": "LP & unified checkout",
      "teb.btn.infra": "Platform value",
      "teb.btn.market": "Marketplace",
      "teb.btn.emr": "EMR-TEK store",
      "teb.hero.img.alt":
        "Profile of a woman with glossy wavy hair — hero visual for premium beauty",

      "teb.showroom.h2": "A curated place to discover",
      "teb.showroom.p":
        "From devices to skincare, we bring a showroom-like experience online—where curated brands meet in one trusted place. The Establish Beauty stands for how you choose beauty with confidence.",
      "teb.showroom.img.alt":
        "Showroom space with The Establish Beauty neon sign, cosmetics, and beauty devices on display",

      "teb.showcase.h2": "Brand worlds",
      "teb.showcase.p":
        "From devices to skincare and makeup—visual cues for the breadth of a curated market.",
      "teb.showcase.alt.portrait": "Portrait of a woman in a white knit sweater—premium beauty tone under soft light",
      "teb.showcase.alt.cosmetics":
        "Luxury cosmetics on marble—MAC, Estée Lauder, Urban Decay and more, showing diverse brands side by side",
      "teb.showcase.alt.skincare": "LUMIN Recovery Oil and Charcoal Cleanser—minimal black skincare packaging",
      "teb.showcase.alt.glossier":
        "Glossier skincare and makeup on a pale blue and white set—Cloud Paint, sunscreen, Solution, and more in a clean banner layout",
      "teb.showcase.alt.collection":
        "Promotional collage: portrait, skincare products, and Beauty Collection / curated brands together caption",

      "teb.model.h2": "Multi-vendor marketplace model",
      "teb.model.intro":
        "<strong>Split LPs, unified buyer experience.</strong> Each brand keeps its own LP and story; sign-in, cart, and checkout are shared market-wide.",
      "teb.url.h3": "Example brand LP URLs",
      "teb.url.p": "Slugs are finalized in contracts and implementation. Tone and world are separated per path.",
      "teb.buyer.h3": "Buyer side (unified)",
      "teb.buyer.li1": "<strong>Account</strong> — <strong>shared</strong> (one profile across the market).",
      "teb.buyer.li2": "<strong>Cart</strong> — <strong>shared</strong>. Add products from multiple brands in one cart.",
      "teb.buyer.li3":
        "<strong>Checkout</strong> — <strong>shared</strong> (<strong>unified / centralized checkout</strong>).",
      "teb.buyer.li4":
        "<strong>Fulfillment</strong> — <strong>split</strong> (<strong>split fulfillment</strong> — shipping and inventory per vendor).",
      "teb.buyer.li5": "<strong>Order data</strong> — <strong>routed to each vendor</strong>.",

      "teb.pillars.h3": "Three strategic pillars",
      "teb.pillars.intro": "Labels we use in product and messaging to align story and decisions.",
      "teb.pillars.img.alt":
        "Three-column infographic: Marketplace, Curated Commerce, and Inventory-light Platform—with icons and Japanese captions describing each layer.",
      "teb.pillar.m.title": "Marketplace",
      "teb.pillar.c.title": "Curated Commerce",
      "teb.pillar.i.title": "Inventory-light Platform",
      "teb.pillar.m.body":
        "The market layer: multiple brands in one place, from discovery to purchase paths.",
      "teb.pillar.c.body":
        "Curation by standards and editorial—commerce with coherent story and quality.",
      "teb.pillar.i.body":
        "Not a heavy owned-inventory model—light operations with partner inventory and logistics.",

      "teb.infra.h2": "Beauty Commerce Infrastructure",
      "teb.infra.intro":
        "More than a single storefront: we define <strong>infrastructure</strong> for beauty brands. Integrating the stack below makes the platform bigger than “opening a shop.”",
      "teb.infra.diagram.alt":
        "Platform diagram centered on BRAND: six areas around it (aggregation, LPs, payments, journeys, order routing, acquisition), with unified data, partners, and security foundations below.",
      "teb.infra.li1": "<strong>Brand aggregation</strong> — curated listings and partner management.",
      "teb.infra.li2": "<strong>LP delivery</strong> — brand paths, templates, separated worlds.",
      "teb.infra.li3":
        "<strong>Payments</strong> — unified checkout; risk and compliance as designed.",
      "teb.infra.li4": "<strong>Customer journeys</strong> — coherent experience from discovery to buy.",
      "teb.infra.li5":
        "<strong>Order routing</strong> — data to vendors; the layer behind split fulfillment.",
      "teb.infra.li6":
        "<strong>Acquisition</strong> — growth tied to the market and curation (tactics TBD).",
      "teb.infra.note":
        "Positioning: a <strong>beauty commerce infrastructure</strong> layer—not only a storefront, but the integrated stack for brand aggregation, LP delivery, payments, customer journeys, order routing, and acquisition.",

      "teb.market.h2": "Beauty Marketplace",
      "teb.market.intro":
        "Cross-brand catalog and search with <strong>shared account, cart, and checkout</strong>, plus <strong>split fulfillment</strong>. Revenue is designed around <strong>sales commissions</strong>.",
      "teb.market.platform": "What the platform does (planned)",
      "teb.market.li1":
        "Brand LPs at <span class=\"establishPath\">/brands/…</span>, templates, listing rules, curation",
      "teb.market.li2":
        "Unified identity (shared account), shared cart, <strong>unified checkout</strong>, analytics",
      "teb.market.li3": "Post-checkout routing and vendor fulfillment (APIs / admin TBD)",
      "teb.market.li4": "Inventory mainly with partners—inventory-light on our side",
      "teb.market.li5": "Revenue share and fees tied to completed orders",

      "teb.partners.h2": "Partner brands",
      "teb.partners.intro":
        "Each brand has an LP under <span class=\"establishPath\">/brands/{slug}</span>; purchases converge on the <strong>same account, cart, and checkout</strong>. Shipping and stock stay with vendors (split fulfillment). The Japanese EMR-TEK store is available today as a brand LP on this site.",
      "teb.partner.kicker": "Partner",
      "teb.partner.emr.desc":
        "Red and near-infrared light, UV, LED masks, blue-light eyewear, cosmetics, indoor lighting—a brand focused on light and skincare devices.",
      "teb.partner.emr.btn": "Open EMR-TEK store",
      "teb.partner.other.h3": "More brands",
      "teb.partner.other.p": "We will list additional partners here as they join.",

      "teb.footer.note":
        "Legal entity, contact, and policy copy will be finalized at domain launch. This page is a static placeholder.",
      "teb.footer.explore": "Explore",
      "teb.footer.link.home": "Home",
      "teb.footer.link.showroom": "Curated showroom",
      "teb.footer.link.model": "Multi-vendor & pillars",
      "teb.footer.link.infra": "Beauty Commerce Infrastructure",
      "teb.footer.link.market": "Beauty Marketplace",
      "teb.footer.link.emr": "EMR-TEK store",
      "teb.footer.link.contact": "Contact",
      "teb.footer.legal": "Legal (EMR-TEK store)",
      "teb.footer.privacy": "Privacy policy",
      "teb.footer.terms": "Terms of use",
      "teb.footer.tokushoho": "Specified commercial transactions act",
      "teb.footer.legalnav": "Legal",
      "teb.footer.credit2": "EMR-TEK product pages unchanged",

      "lang.label": "Language",
      "lang.ja": "日本語",
      "lang.en": "English",

      "emr.skip": "Skip to content",
      "emr.nav.main": "Main",
      "emr.topbar.badge": "Ships in 2–5 business days · delivery ~7–14 days",
      "emr.topbar.teb": "The Establish Beauty — main site",
      "emr.nav.teb": "TEB home",
      "emr.nav.shop": "Shop",
      "emr.nav.science": "Science",
      "emr.nav.blog": "Blog",
      "emr.nav.track": "Order tracking",
      "emr.nav.faq": "FAQ",
      "emr.nav.contact": "Contact",
      "emr.brand.aria": "EMR-TEK home",
      "emr.aria.search": "Search",
      "emr.aria.cart": "Cart",
      "emr.aria.cartcount": "Items in cart",
      "emr.topbar.langcurrency": "Language and currency",
      "emr.pill.lang": "Japanese",
      "emr.pill.currency": "Japan (JPY ¥)",

      "emr.modal.cart": "Cart",
      "emr.modal.close": "Close",
      "emr.cart.empty": "Your cart is empty.",
      "emr.cart.subtotal": "Subtotal",
      "emr.cart.checkout": "Checkout",
      "emr.cart.clear": "Clear cart",
      "emr.modal.search": "Search",
      "emr.search.keyword": "Keyword",
      "emr.search.placeholder": "e.g. Firewave / mask / NIR",
      "emr.search.hint": "This search applies to the all-products listing.",
      "emr.search.apply": "Apply",

      "emr.cookie.dialog": "Cookie notice",
      "emr.cookie.title": "We use cookies",
      "emr.cookie.body": "Cookies help us improve the experience and understand usage. You can change preferences anytime.",
      "emr.cookie.decline": "Decline",
      "emr.cookie.accept": "Accept",

      "emr.footer.shop": "Shop",
      "emr.footer.learn": "Learn",
      "emr.footer.newsletter": "Newsletter",
      "emr.footer.newsletter.hint": "New products and offers in your inbox.",
      "emr.footer.email.placeholder": "Email address",
      "emr.footer.subscribe": "Subscribe",
      "emr.footer.teb_main": "The Establish Beauty (main site)",
      "emr.footer.about": "About EMR-TEK",
      "emr.footer.faq": "FAQ",
      "emr.footer.allproducts": "All products",
      "emr.footer.legal": "Legal",

      "cart.title": "Cart — EMR-TEK",
      "cart.desc": "Review your cart and continue to checkout.",
      "cart.crumb": "Cart",
      "cart.h1": "Cart",
      "cart.sub": "Review your items, then continue to checkout.",
      "cart.continue": "Continue shopping",
      "cart.gotocheckout": "Go to checkout",
    },
  };

  function getLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "en" || v === "ja") return v;
    } catch (_) {}
    return "ja";
  }

  function setLang(lang) {
    if (lang !== "ja" && lang !== "en") return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
    document.documentElement.setAttribute("data-site-lang", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "ja");
    applyMessages(lang);
    document.dispatchEvent(new CustomEvent("site-lang-change", { detail: { lang } }));
    syncLangButtons(lang);
  }

  function t(lang, key) {
    const pack = MESSAGES[lang] || MESSAGES.ja;
    return pack[key] ?? MESSAGES.ja[key] ?? key;
  }

  function applyMessages(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(lang, key);
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = val;
      } else {
        const chev = el.querySelector(":scope > .chev");
        if (chev) {
          while (chev.previousSibling) {
            chev.previousSibling.remove();
          }
          chev.before(document.createTextNode(val));
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr");
      if (!spec || !spec.includes(":")) return;
      const i = spec.indexOf(":");
      const attr = spec.slice(0, i).trim();
      const key = spec.slice(i + 1).trim();
      el.setAttribute(attr, t(lang, key));
    });

    const metaDesc = document.querySelector('meta[name="description"][data-i18n-desc]');
    if (metaDesc) {
      const key = metaDesc.getAttribute("data-i18n-desc");
      if (key) metaDesc.setAttribute("content", t(lang, key));
    }

    const titleKeyEl = document.querySelector("[data-i18n-title]");
    if (titleKeyEl) {
      const key = titleKeyEl.getAttribute("data-i18n-title");
      if (key) document.title = t(lang, key);
    }
  }

  function syncLangButtons(lang) {
    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      const v = btn.getAttribute("data-lang-switch");
      btn.classList.toggle("is-active", v === lang);
      btn.setAttribute("aria-pressed", v === lang ? "true" : "false");
      if (v === "ja" || v === "en") {
        btn.textContent = v === "ja" ? t(lang, "lang.ja") : t(lang, "lang.en");
      }
    });
  }

  function init() {
    const lang = getLang();
    document.documentElement.setAttribute("data-site-lang", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "ja");
    applyMessages(lang);
    syncLangButtons(lang);

    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const v = btn.getAttribute("data-lang-switch");
        if (v === "ja" || v === "en") setLang(v);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
