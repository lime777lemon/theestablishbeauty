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
      "teb.about.doc.title": "私たちについて — The Establish Beauty",
      "teb.about.doc.desc":
        "The Establish Beauty のミッション、Beauty Commerce Infrastructure、マーケットプレイスの仕組みについて。",
      "teb.about.crumb.store": "EMR-TEK ストア",
      "teb.about.crumb.page": "私たちについて",
      "teb.about.h1": "The Establish Beauty について",

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
      "teb.nav.about": "私たちについて",
      "teb.nav.b2b.register": "法人登録",
      "teb.nav.b2b.login": "法人ログイン",
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
      "teb.hero.tagline1":
        "統合チェックアウトと split fulfillment（分割フルフィル）を備えた、マルチベンダー型ビューティマーケットプレイス。",
      "teb.hero.tagline2":
        "決済は一元化、配送・在庫はベンダー分散。キュレーションされたビューティコマース基盤。",
      "teb.hero.tagline3":
        "美容デバイスメーカー、D2C スキンケアブランド、オンライン主軸のビューティ企業をつなぐ、キュレーション型マーケットプレイス。",

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
        "（英語でのポジショニング表現）<strong>beauty commerce infrastructure</strong>（美容コマース基盤）というレイヤーであり、単なるストアフロントにとどまらず、ブランド集積・LP 配信・決済・顧客ジャーニー・注文ルーティング・獲得をひと続きで束ねる統合スタックを指します。",

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
      "teb.footer.link.b2b.register": "法人・取引先登録",
      "teb.footer.link.b2b.login": "B2B ログイン",
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
      "emr.topbar.teb": "The Establish Beauty — 私たちについて",
      "emr.nav.teb": "私たちについて",
      "emr.nav.shop": "ショップ",
      "emr.nav.science": "科学を学ぶ",
      "emr.nav.blog": "ブログ",
      "emr.nav.track": "注文追跡",
      "emr.nav.faq": "FAQ",
      "emr.nav.contact": "お問い合わせ",
      "emr.nav.register": "新規登録",
      "emr.nav.login": "ログイン",
      "emr.nav.sql": "SQL メモ",
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
      "emr.footer.teb_main": "The Establish Beauty（私たちについて）",
      "emr.footer.about": "EMR-TEKについて",
      "emr.footer.faq": "よくある質問",
      "emr.footer.allproducts": "全商品",
      "emr.footer.legal": "法的情報",

      "auth.oauth.stub":
        "Google（Gmail）での登録・ログインは、OAuth 接続を設定したあとに有効になります。例：Supabase Auth の signInWithOAuth({ provider: 'google' }) を /api または Edge Function から呼び出し、このボタンの href を認可 URL に差し替えてください。",
      "auth.oauth.google": "Google で続ける（Gmail）",
      "auth.or": "または",
      "auth.field.displayName": "お名前（表示名）",
      "auth.field.email": "メールアドレス",
      "auth.field.workEmail": "メールアドレス（業務用）",
      "auth.field.password": "パスワード",
      "auth.field.password2": "パスワード（確認）",
      "auth.field.company": "会社名・団体名",
      "auth.field.dept": "部署名（任意）",
      "auth.field.adminName": "ご担当者名",
      "auth.field.phone": "電話番号",
      "auth.submit.register": "登録する",
      "auth.submit.login": "ログイン",
      "auth.remember": "ログイン状態を保持する",
      "auth.forgot": "パスワードをお忘れの方",
      "auth.link.toLogin": "ログインはこちら",
      "auth.link.toRegister": "新規登録はこちら",
      "auth.link.businessPortal": "法人・取引先の方はこちら",
      "auth.link.consumerPortal": "個人のお客様はこちら",
      "auth.consent.consumer":
        "<a class=\"link\" href=\"./terms.html\">利用規約</a> および <a class=\"link\" href=\"./privacy.html\">プライバシーポリシー</a> に同意します",
      "auth.consent.business":
        "入力内容が正確であること、および <a class=\"link\" href=\"./terms.html\">利用規約</a>・<a class=\"link\" href=\"./privacy.html\">プライバシーポリシー</a> に同意することを確認します",
      "auth.consumer.reg.title": "会員登録（個人）",
      "auth.consumer.reg.desc":
        "メールアドレスとパスワードで登録できます（Vercel の /api/auth-sign-up 経由で Supabase Auth に保存）。Google（Gmail）は OAuth 設定後に有効化します。",
      "auth.consumer.reg.docTitle": "会員登録（個人）– EMR-TEK",
      "auth.consumer.login.title": "ログイン（個人）",
      "auth.consumer.login.desc": "登録済みのメールアドレス、または Google でログインできます。",
      "auth.consumer.login.docTitle": "ログイン（個人）– EMR-TEK",
      "auth.business.reg.title": "法人アカウント登録",
      "auth.business.reg.desc":
        "卸・取引先向けの法人登録です（/api/auth-sign-up）。審査のため、担当よりご連絡する場合があります。Google は OAuth 設定後に有効化します。",
      "auth.business.reg.docTitle": "法人登録 – The Establish Beauty",
      "auth.business.login.title": "法人ログイン",
      "auth.business.login.desc": "法人登録済みのワークスペースメール、または Google でサインインしてください。",
      "auth.business.login.docTitle": "法人ログイン – The Establish Beauty",
      "auth.stub.submit":
        "このメッセージは旧スタブです。auth-forms.js が読み込まれていない可能性があります。",
      "auth.api.sending": "送信中…",
      "auth.api.network": "通信に失敗しました。ネットワークと /api のあるホスト（本番 URL または vercel dev）で再度お試しください。",
      "auth.api.password_mismatch": "パスワードが一致しません。",
      "auth.api.register_ok": "登録を受け付けました。続けてログインしてください。",
      "auth.api.login_ok": "ログインしました。まもなく移動します…",
      "auth.api.error.forbidden": "このサイトからのリクエストとして許可されていません（CONTACT_ALLOWED_ORIGINS を確認してください）。",
      "auth.api.error.misconfigured":
        "Supabase の環境変数が足りません。新規登録には SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY（Dashboard → Settings → API の service_role）が必要です。ローカル（npm run dev）ならリポジトリ直下の .env.local に記載し、サーバーを再起動してください。export KEY=value 形式でも読み込みます。本番・Preview は Vercel の Environment Variables に同じ名前で設定してください。",
      "auth.api.error.invalid_credentials": "メールアドレスまたはパスワードが正しくありません。",
      "auth.api.error.email_exists": "このメールアドレスは既に登録されています。",
      "auth.api.error.consent_required": "同意にチェックを入れてください。",
      "auth.api.error.password_too_short": "パスワードが短すぎます（個人: 8 文字以上、法人: 10 文字以上）。",
      "auth.api.error.missing_display_name": "表示名を入力してください。",
      "auth.api.error.missing_business_fields": "会社名・電話・担当者名を入力してください。",
      "auth.api.error.invalid_email": "メールアドレスの形式が正しくありません。",
      "auth.api.error.generic": "処理に失敗しました。時間をおいて再度お試しください。",
      "auth.api.error.registration_save":
        "認証ユーザーは作成できましたが、登録テーブルへの保存に失敗しました。Supabase のマイグレーション（consumer_registrations / business_registrations）を適用し、Table Editor にテーブルがあるか確認してください。",
      "auth.api.error.no_api_host":
        "この URL では /api が動いていません（例: Python のみの http.server、または file://）。認証・お問い合わせを試すときは、リポジトリで npm run dev（Node 開発サーバー）か npm run dev:vercel を使い、http://localhost:5173 などで開いてください。HTML だけなら npm run dev:static でも構いません。",
      "auth.crumb.consumer": "個人アカウント",
      "auth.crumb.business": "法人アカウント",

      "cart.title": "カート – EMR-TEK",
      "cart.desc": "ショッピングカートの内容を確認し、購入手続きへお進みください。",
      "cart.crumb": "カート",
      "cart.h1": "カート",
      "cart.sub": "内容をご確認のうえ、購入手続きへお進みください。",
      "cart.continue": "ショップを続ける",
      "cart.gotocheckout": "購入手続きへ進む",

      "contact.doc.title": "お問い合わせ – EMR-TEK",
      "contact.doc.desc": "EMR-TEK 日本語版 – お問い合わせ",
      "contact.crumb.home": "ホーム",
      "contact.crumb.current": "お問い合わせ",
      "contact.hero.sub": "ご質問・ご相談はこちらからお送りください。",
      "contact.form.h2": "お問い合わせフォーム",
      "contact.lead":
        "必須項目を入力し、同意にチェックを入れたうえで「送信」を押すと、<strong>Vercel の API 経由で Supabase（public.contact_inquiries）に保存</strong>されます（秘密鍵はサーバー側のみ）。メールアプリは開きません。返信は入力いただいたメールアドレス宛に行います。<code class=\"micro\">file://</code> や API のない静的ホストでは保存に失敗することがあるため、本番の https URL または <code class=\"micro\">vercel dev</code> で試してください。",
      "contact.field.name": "お名前",
      "contact.field.email": "メールアドレス",
      "contact.field.topic": "お問い合わせ種別",
      "contact.field.message": "内容",
      "contact.placeholder.name": "例：山田 太郎",
      "contact.placeholder.message": "お問い合わせ内容をご記入ください",
      "contact.topic.product": "製品について",
      "contact.topic.order": "注文・配送について",
      "contact.topic.returns": "返品・返金について",
      "contact.topic.wholesale": "卸・法人について",
      "contact.topic.other": "その他",
      "contact.consent": "入力内容に同意して送信します",
      "contact.submit": "送信",
      "contact.aside.label": "連絡先",
      "contact.aside.email": "メール",
      "contact.aside.email.hint": "通常 1〜2営業日以内に返信します。",
      "contact.aside.faq": "よくある質問",
      "contact.aside.faq.hint": "購入前のよくある質問はFAQをご確認ください。",
      "contact.aside.faq.btn": "FAQを見る",
      "contact.result.demo": "送信しました（デモ：Supabase 未設定）。",
      "contact.result.success":
        "送信しました。Vercel の API 経由で Supabase の public.contact_inquiries に保存しました（anon キーはブラウザに出しません）。\n\n通知メールは Database Webhook → /api/notify-contact-inquiry → Resend を設定済みの場合のみ届きます。届かないときは Supabase の Webhook ログと Vercel Functions のログを確認してください。",
      "contact.result.fail": "送信に失敗しました。",
      "contact.result.detailPrefix": "詳細：",
      "contact.result.fileHint":
        "\n\n※ file:// で開いている場合は https の本番 URL か、python3 -m http.server などで http://localhost:… から開き直してください。",
      "contact.result.mailLine": "\n\nメール：info@theestablishbeauty.com",
      "contact.demo.name": "お名前：",
      "contact.demo.email": "メール：",
      "contact.demo.topic": "種別：",
      "contact.demo.body": "内容：",
      "contact.admin.hint":
        "店舗運営の方は <a class=\"link\" href=\"./contact-inquiries-admin.html\">お問い合わせ一覧（認証）</a> から送信内容を確認できます（Vercel の <code class=\"micro\">CONTACT_INQUIRIES_ADMIN_SECRET</code> と同じトークンが必要です）。",

      "inquiries.doc.title": "お問い合わせ一覧（運営）– EMR-TEK",
      "inquiries.doc.desc": "お問い合わせフォーム送信分の閲覧（管理者トークン・サーバー API 経由）",
      "inquiries.crumb.current": "一覧（運営）",
      "inquiries.hero.h1": "お問い合わせ一覧",
      "inquiries.hero.lead":
        "public.contact_inquiries の行を表示します。編集・削除は Supabase の Table Editor または SQL で行ってください。",
      "inquiries.notice":
        "<strong>閲覧のみです。</strong> ブラウザに service_role は渡りません。Vercel の <code class=\"micro\">/api/contact-inquiries-admin</code> が <code class=\"micro\">Authorization: Bearer</code>（<code class=\"micro\">CONTACT_INQUIRIES_ADMIN_SECRET</code> と一致）を検証したうえで Supabase から取得します。",
      "inquiries.token.label": "管理者トークン",
      "inquiries.token.placeholder": "Vercel の CONTACT_INQUIRIES_ADMIN_SECRET と同じ値",
      "inquiries.token.hint": "このブラウザの sessionStorage にだけ保存されます（タブを閉じるまで）。",
      "inquiries.token.clear": "トークンを消去",
      "inquiries.token.cleared": "トークンと一覧を消去しました。",
      "inquiries.load": "読み込み",
      "inquiries.refresh": "再読み込み",
      "inquiries.csv": "CSV 出力",
      "inquiries.filter.label": "絞り込み",
      "inquiries.filter.placeholder": "メール・名前・内容など",
      "inquiries.filter.empty": "絞り込みに一致する行がありません。",
      "inquiries.empty": "データがありません。",
      "inquiries.err.notoken": "管理者トークンを入力してください。",
      "inquiries.loading": "読み込み中…",
      "inquiries.loaded": "最新の {n} 件を表示しています。",
      "inquiries.csv.empty": "出力する行がありません。",
      "inquiries.csv.copied": "CSV をクリップボードにコピーしました。",
      "inquiries.csv.downloaded": "CSV をダウンロードしました。",
      "inquiries.msg.expand": "全文",

      "sql.doc.title": "SQL メモ – EMR-TEK",
      "sql.doc.desc": "SQL を書いて Supabase の SQL Editor に貼り付けるためのメモ用ページ（ブラウザから DB は実行しません）",
      "sql.crumb.current": "SQL メモ",
      "sql.hero.h1": "SQL メモ",
      "sql.hero.lead": "クエリの下書き用です。このページからデータベースへは実行しません。",
      "sql.notice":
        "<strong>このページからデータベースへクエリは送信されません。</strong> コピーして Supabase Dashboard の SQL Editor に貼り付けて実行してください。",
      "sql.ref.label": "プロジェクト ref（ダッシュボード URL 用）",
      "sql.ref.placeholder": "例：your-project-ref",
      "sql.ref.hint": "この値はブラウザのローカルにだけ保存されます。",
      "sql.textarea.label": "SQL",
      "sql.textarea.placeholder":
        "-- 例\nSELECT * FROM public.contact_inquiries ORDER BY created_at DESC LIMIT 20;",
      "sql.copy": "コピー",
      "sql.clear": "クリア",
      "sql.openDash": "Supabase の SQL を開く",
      "sql.copied": "クリップボードにコピーしました。",
      "sql.copyCmd": "コマンドをコピー",
      "sql.copiedCmd": "ターミナル用コマンドをコピーしました。",
      "sql.runwhere.bad.title": "SQL Editor にシェルを貼らないでください",
      "sql.runwhere.bad.body":
        "ダッシュボードの SQL Editor は <strong>SQL だけ</strong>を Postgres に送ります。<code>./scripts/sql-shell.sh</code> のようなシェル行を貼ると SQL として解釈され、<code>.</code> 付近で <code>42601</code> の文法エラーになります。",
      "sql.runwhere.title": "どこで何を実行するか",
      "sql.runwhere.dash.heading": "Supabase の SQL Editor（ブラウザ）",
      "sql.runwhere.dash.lead": "許可されるのは SQL だけです。シェルやスクリプトのパスはここでは実行できません。",
      "sql.runwhere.dash.hint": "下の「Supabase の SQL を開く」でダッシュボードへ移動し、このページで書いた SQL を貼って Run（⌘↵）してください。",
      "sql.runwhere.term.heading": "ターミナル（この PC）",
      "sql.runwhere.term.lead": "リポジトリのルート（例：redlight フォルダ）で、シェルから接続スクリプトを実行します。",
      "sql.runwhere.term.hint": "scripts/sql-shell.sh は .env.local の SUPABASE_DATABASE_URL と、必要なら SUPABASE_DB_PASSWORD を読みます。",

      "emr.footer.legalnav": "法的情報",
      "emr.footer.privacy_link": "プライバシーポリシー",
      "emr.footer.terms_link": "利用規約",
      "emr.footer.tokushoho_link": "特定商取引法に基づく表記",
      "emr.footer.policies_link": "配送・返品・支払い",
      "emr.search.close": "閉じる",
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
      "teb.nav.about": "About us",
      "teb.nav.b2b.register": "Business signup",
      "teb.nav.b2b.login": "Business login",
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
      "teb.hero.tagline1":
        "Multi-vendor beauty marketplace with unified checkout and split fulfillment.",
      "teb.hero.tagline2":
        "Curated beauty commerce platform with centralized checkout and distributed vendor fulfillment.",
      "teb.hero.tagline3":
        "A curated beauty marketplace connecting beauty device manufacturers, D2C skincare brands, and online-first beauty companies.",

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
        "Positioning in English: a <strong>beauty commerce infrastructure</strong> layer — not only a storefront, but the integrated stack for brand aggregation, LP delivery, payments, customer journeys, order routing, and acquisition.",

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
      "teb.footer.link.b2b.register": "Business / partner signup",
      "teb.footer.link.b2b.login": "Business login",
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
      "emr.topbar.teb": "The Establish Beauty — About",
      "emr.nav.teb": "About us",
      "emr.nav.shop": "Shop",
      "emr.nav.science": "Science",
      "emr.nav.blog": "Blog",
      "emr.nav.track": "Order tracking",
      "emr.nav.faq": "FAQ",
      "emr.nav.contact": "Contact",
      "emr.nav.register": "Sign up",
      "emr.nav.login": "Log in",
      "emr.nav.sql": "SQL scratchpad",
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
      "emr.footer.teb_main": "The Establish Beauty (about us)",
      "emr.footer.about": "About EMR-TEK",
      "emr.footer.faq": "FAQ",
      "emr.footer.allproducts": "All products",
      "emr.footer.legal": "Legal",

      "auth.oauth.stub":
        "Google (Gmail) sign-in will work after you wire OAuth—for example Supabase Auth signInWithOAuth({ provider: 'google' }) from an API route—and set this button’s href to your authorization URL.",
      "auth.oauth.google": "Continue with Google (Gmail)",
      "auth.or": "or",
      "auth.field.displayName": "Display name",
      "auth.field.email": "Email",
      "auth.field.workEmail": "Work email",
      "auth.field.password": "Password",
      "auth.field.password2": "Confirm password",
      "auth.field.company": "Company or organization",
      "auth.field.dept": "Department (optional)",
      "auth.field.adminName": "Contact person",
      "auth.field.phone": "Phone",
      "auth.submit.register": "Create account",
      "auth.submit.login": "Log in",
      "auth.remember": "Keep me signed in",
      "auth.forgot": "Forgot password?",
      "auth.link.toLogin": "Already have an account? Log in",
      "auth.link.toRegister": "Need an account? Sign up",
      "auth.link.businessPortal": "Business / partner portal",
      "auth.link.consumerPortal": "Personal customer portal",
      "auth.consent.consumer":
        "I agree to the <a class=\"link\" href=\"./terms.html\">Terms</a> and <a class=\"link\" href=\"./privacy.html\">Privacy policy</a>",
      "auth.consent.business":
        "I confirm the information is accurate and I agree to the <a class=\"link\" href=\"./terms.html\">Terms</a> and <a class=\"link\" href=\"./privacy.html\">Privacy policy</a>",
      "auth.consumer.reg.title": "Sign up (personal)",
      "auth.consumer.reg.desc":
        "Sign up with email and password via /api/auth-sign-up (Supabase Auth). Google (Gmail) activates after OAuth is configured.",
      "auth.consumer.reg.docTitle": "Sign up (personal) — EMR-TEK",
      "auth.consumer.login.title": "Log in (personal)",
      "auth.consumer.login.desc": "Use your registered email or Google to sign in.",
      "auth.consumer.login.docTitle": "Log in (personal) — EMR-TEK",
      "auth.business.reg.title": "Business account signup",
      "auth.business.reg.desc":
        "For wholesale and trade partners (/api/auth-sign-up). We may contact you to verify details. Google activates after OAuth is configured.",
      "auth.business.reg.docTitle": "Business signup — The Establish Beauty",
      "auth.business.login.title": "Business login",
      "auth.business.login.desc": "Use your work email or Google to access the business workspace.",
      "auth.business.login.docTitle": "Business login — The Establish Beauty",
      "auth.stub.submit":
        "Legacy stub message. auth-forms.js may not be loaded.",
      "auth.api.sending": "Sending…",
      "auth.api.network": "Request failed. Try again from a host that serves /api (production https or vercel dev).",
      "auth.api.password_mismatch": "Passwords do not match.",
      "auth.api.register_ok": "Account created. Please log in to continue.",
      "auth.api.login_ok": "Signed in. Redirecting…",
      "auth.api.error.forbidden": "This origin is not allowed (check CONTACT_ALLOWED_ORIGINS).",
      "auth.api.error.misconfigured":
        "Supabase env vars are missing. Sign-up needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (service_role secret under Dashboard → Settings → API). For npm run dev, put them in .env.local at the repo root and restart; export KEY=value lines are supported. On Vercel, add the same names under Environment Variables.",
      "auth.api.error.invalid_credentials": "Invalid email or password.",
      "auth.api.error.email_exists": "This email is already registered.",
      "auth.api.error.consent_required": "Please accept the terms to continue.",
      "auth.api.error.password_too_short": "Password is too short (personal: 8+ chars, business: 10+).",
      "auth.api.error.missing_display_name": "Please enter your display name.",
      "auth.api.error.missing_business_fields": "Please fill in company, phone, and contact name.",
      "auth.api.error.invalid_email": "Please enter a valid email address.",
      "auth.api.error.generic": "Something went wrong. Please try again later.",
      "auth.api.error.registration_save":
        "The auth user was created but saving to the registration tables failed. Apply the Supabase migration for consumer_registrations / business_registrations and confirm the tables exist in Table Editor.",
      "auth.api.error.no_api_host":
        "No /api on this URL (e.g. Python-only http.server or file://). Use npm run dev (Node dev server) or npm run dev:vercel from the repo, then open http://localhost:5173. For static preview only, npm run dev:static is fine.",
      "auth.crumb.consumer": "Personal account",
      "auth.crumb.business": "Business account",

      "cart.title": "Cart — EMR-TEK",
      "cart.desc": "Review your cart and continue to checkout.",
      "cart.crumb": "Cart",
      "cart.h1": "Cart",
      "cart.sub": "Review your items, then continue to checkout.",
      "cart.continue": "Continue shopping",
      "cart.gotocheckout": "Go to checkout",

      "contact.doc.title": "Contact — EMR-TEK",
      "contact.doc.desc": "Contact EMR-TEK — questions and support",
      "contact.crumb.home": "Home",
      "contact.crumb.current": "Contact",
      "contact.hero.sub": "Send us your questions or requests using the form below.",
      "contact.form.h2": "Contact form",
      "contact.lead":
        "Fill in the required fields, check consent, then click <strong>Submit</strong>. We save via the <strong>Vercel API</strong> to Supabase (<code class=\"micro\">public.contact_inquiries</code>); keys stay on the server and <strong>no mail app opens</strong>. We reply to the email address you enter. Saving fails on <code class=\"micro\">file://</code> or static hosts without <code class=\"micro\">/api</code>; use your production https URL or <code class=\"micro\">vercel dev</code>.",
      "contact.field.name": "Name",
      "contact.field.email": "Email",
      "contact.field.topic": "Topic",
      "contact.field.message": "Message",
      "contact.placeholder.name": "e.g. Jane Doe",
      "contact.placeholder.message": "How can we help?",
      "contact.topic.product": "Product",
      "contact.topic.order": "Order & shipping",
      "contact.topic.returns": "Returns & refunds",
      "contact.topic.wholesale": "Wholesale / business",
      "contact.topic.other": "Other",
      "contact.consent": "I agree to submit the information above",
      "contact.submit": "Submit",
      "contact.aside.label": "Contact",
      "contact.aside.email": "Email",
      "contact.aside.email.hint": "We usually reply within 1–2 business days.",
      "contact.aside.faq": "FAQ",
      "contact.aside.faq.hint": "See the FAQ for common questions before you buy.",
      "contact.aside.faq.btn": "Open FAQ",
      "contact.result.demo": "Sent (demo: Supabase not configured).",
      "contact.result.success":
        "Saved. Your entry was written to public.contact_inquiries via the Vercel API (no Supabase keys in the browser).\n\nNotification emails are only sent if Database Webhook → /api/notify-contact-inquiry → Resend is configured. If mail is missing, check Supabase webhook logs and Vercel function logs.",
      "contact.result.fail": "Could not send.",
      "contact.result.detailPrefix": "Details: ",
      "contact.result.fileHint":
        "\n\nIf you opened this page as file://, try again from your https site or http://localhost via a simple HTTP server.",
      "contact.result.mailLine": "\n\nEmail: info@theestablishbeauty.com",
      "contact.demo.name": "Name: ",
      "contact.demo.email": "Email: ",
      "contact.demo.topic": "Topic: ",
      "contact.demo.body": "Message: ",
      "contact.admin.hint":
        "If you run the store, you can review submissions on the <a class=\"link\" href=\"./contact-inquiries-admin.html\">inquiries list (authenticated)</a> page (use the same value as <code class=\"micro\">CONTACT_INQUIRIES_ADMIN_SECRET</code> on Vercel).",

      "inquiries.doc.title": "Contact inquiries (admin) — EMR-TEK",
      "inquiries.doc.desc": "Read-only list of contact form rows (admin token + server API).",
      "inquiries.crumb.current": "List (admin)",
      "inquiries.hero.h1": "Contact inquiries",
      "inquiries.hero.lead":
        "Shows rows from public.contact_inquiries. Edit or delete in Supabase Table Editor or SQL.",
      "inquiries.notice":
        "<strong>Read-only.</strong> The service role never ships to the browser. <code class=\"micro\">/api/contact-inquiries-admin</code> checks <code class=\"micro\">Authorization: Bearer</code> against <code class=\"micro\">CONTACT_INQUIRIES_ADMIN_SECRET</code>, then fetches from Supabase.",
      "inquiries.token.label": "Admin token",
      "inquiries.token.placeholder": "Same value as CONTACT_INQUIRIES_ADMIN_SECRET on Vercel",
      "inquiries.token.hint": "Stored only in this browser tab (sessionStorage).",
      "inquiries.token.clear": "Clear token",
      "inquiries.token.cleared": "Cleared token and table.",
      "inquiries.load": "Load",
      "inquiries.refresh": "Reload",
      "inquiries.csv": "Export CSV",
      "inquiries.filter.label": "Filter",
      "inquiries.filter.placeholder": "Email, name, message…",
      "inquiries.filter.empty": "No rows match this filter.",
      "inquiries.empty": "No rows returned.",
      "inquiries.err.notoken": "Enter the admin token.",
      "inquiries.loading": "Loading…",
      "inquiries.loaded": "Showing {n} row(s).",
      "inquiries.csv.empty": "Nothing to export.",
      "inquiries.csv.copied": "CSV copied to clipboard.",
      "inquiries.csv.downloaded": "CSV downloaded.",
      "inquiries.msg.expand": "Full text",

      "sql.doc.title": "SQL scratchpad — EMR-TEK",
      "sql.doc.desc": "Draft SQL to paste into Supabase SQL Editor (this page does not run queries against your database).",
      "sql.crumb.current": "SQL scratchpad",
      "sql.hero.h1": "SQL scratchpad",
      "sql.hero.lead": "For drafting only. Nothing here is executed against your database.",
      "sql.notice":
        "<strong>This page does not send SQL to your database.</strong> Copy and run statements in the Supabase Dashboard → SQL Editor.",
      "sql.ref.label": "Project ref (for dashboard link)",
      "sql.ref.placeholder": "e.g. your-project-ref",
      "sql.ref.hint": "Stored only in this browser (localStorage).",
      "sql.textarea.label": "SQL",
      "sql.textarea.placeholder":
        "-- e.g.\nSELECT * FROM public.contact_inquiries ORDER BY created_at DESC LIMIT 20;",
      "sql.copy": "Copy",
      "sql.clear": "Clear",
      "sql.openDash": "Open Supabase SQL",
      "sql.copied": "Copied to clipboard.",
      "sql.copyCmd": "Copy command",
      "sql.copiedCmd": "Terminal command copied.",
      "sql.runwhere.bad.title": "Do not paste shell commands into the SQL Editor",
      "sql.runwhere.bad.body":
        "The Supabase SQL Editor sends <strong>SQL only</strong> to Postgres. If you paste a shell line like <code>./scripts/sql-shell.sh</code>, Postgres parses it as SQL and you get a syntax error near <code>.</code> (e.g. <code>42601</code>).",
      "sql.runwhere.title": "Where to run what",
      "sql.runwhere.dash.heading": "Supabase SQL Editor (browser)",
      "sql.runwhere.dash.lead": "Only SQL statements are allowed. Shell paths and scripts cannot be run there.",
      "sql.runwhere.dash.hint": "Use “Open Supabase SQL” below, paste your draft SQL, then Run (⌘↵).",
      "sql.runwhere.term.heading": "Terminal (this computer)",
      "sql.runwhere.term.lead": "From your repo root (e.g. the redlight folder), run the helper script in a shell.",
      "sql.runwhere.term.hint": "scripts/sql-shell.sh reads SUPABASE_DATABASE_URL and, if set, SUPABASE_DB_PASSWORD from .env.local.",

      "emr.footer.legalnav": "Legal",
      "emr.footer.privacy_link": "Privacy policy",
      "emr.footer.terms_link": "Terms of use",
      "emr.footer.tokushoho_link": "Specified commercial transactions",
      "emr.footer.policies_link": "Shipping, returns & payment",
      "emr.search.close": "Close",
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
      if (el instanceof HTMLOptionElement) {
        el.textContent = val;
        return;
      }
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

  window.siteI18n = { getLang, setLang, t };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
