#!/usr/bin/env python3
"""Patch index.html with data-i18n (one-time)."""
from __future__ import annotations

import re
from pathlib import Path

INDEX = Path(__file__).resolve().parents[1] / "index.html"


def main() -> None:
    html = INDEX.read_text(encoding="utf-8")
    if 'data-i18n="emr.index.hero.h1"' in html:
        print("already patched")
        return

    def R(old: str, new: str) -> None:
        nonlocal html
        if old not in html:
            raise SystemExit(f"MISS ({len(old)} chars):\n{old[:280]}")
        html = html.replace(old, new, 1)

    R("<title>ホーム – EMR-TEK</title>", '<title data-i18n-title="emr.index.doc.title">ホーム – EMR-TEK</title>')
    html = re.sub(
        r'(<meta\s+name="description"\s+)content="([^"]+)"',
        r'\1data-i18n-desc="emr.index.doc.desc" content="\2"',
        html,
        count=1,
    )
    R(
        '<script src="./app.js?v=20260517" defer></script>\n      <script src="./i18n.js" defer></script>',
        '<script src="./i18n-index-messages.js"></script>\n    <script src="./app.js?v=20260517" defer></script>\n      <script src="./i18n.js" defer></script>',
    )

    R('<div class="breadcrumbs" aria-label="パンくず">', '<div class="breadcrumbs" data-i18n-attr="aria-label:emr.index.breadcrumb.aria" aria-label="パンくず">')
    R('<span aria-current="page">EMR-TEK ストア</span>', '<span aria-current="page" data-i18n="emr.index.hero.breadcrumb">EMR-TEK ストア</span>')
    R("<h1 class=\"h1\">EMR-TEK TOKYO公式ストア</h1>", '<h1 class="h1" data-i18n="emr.index.hero.h1">EMR-TEK TOKYO公式ストア</h1>')
    R(
        "<p class=\"subtle\">\n                赤色光・近赤外、UV、LEDマスク、ブルーライトカット、コスメ、室内照明など。\n              </p>",
        '<p class="subtle" data-i18n="emr.index.hero.sub">\n                赤色光・近赤外、UV、LEDマスク、ブルーライトカット、コスメ、室内照明など。\n              </p>',
    )
    R(
        '<div class="heroVideo" aria-label="プロモーション動画">',
        '<div class="heroVideo" data-i18n-attr="aria-label:emr.index.hero.videoAria" aria-label="プロモーション動画">',
    )
    R('alt="EMR-TEK プロモーション"', 'data-i18n-attr="alt:emr.index.hero.videoAlt" alt="EMR-TEK プロモーション"')

    R('<p class="uvPromo__kicker">自然光を、新たに</p>', '<p class="uvPromo__kicker" data-i18n="emr.index.uv.kicker">自然光を、新たに</p>')
    R(
        """<h2 id="uv-promo-heading" class="uvPromo__title">
            自然なUV光がもたらす、活力ある力を
            <span class="uvPromo__highlight">安全に、効果的に、どこからでも。</span>
          </h2>""",
        """<h2 id="uv-promo-heading" class="uvPromo__title">
            <span data-i18n="emr.index.uv.title">自然なUV光がもたらす、活力ある力を</span>
            <span class="uvPromo__highlight" data-i18n="emr.index.uv.highlight">安全に、効果的に、どこからでも。</span>
          </h2>""",
    )
    R(
        """<div class="uvPromo__rte">
            <p>
              体内リズムや季節のバランスの維持から、日々のウェルビーイングまで。
              <strong>EMR-TEK のUVライト</strong>は、過度な曝露のリスク<strong><em>を避けながら</em></strong>、太陽の有益な性質のひとつを取り入れられるよう設計されています。
            </p>
          </div>""",
        """<div class="uvPromo__rte">
            <p data-i18n="emr.index.uv.body" data-i18n-html>
              体内リズムや季節のバランスの維持から、日々のウェルビーイングまで。
              <strong>EMR-TEK のUVライト</strong>は、過度な曝露のリスク<strong><em>を避けながら</em></strong>、太陽の有益な性質のひとつを取り入れられるよう設計されています。
            </p>
          </div>""",
    )
    R(
        '<span class="btn-text"\n                >UVコレクションを見る',
        '<span class="btn-text" data-i18n="emr.index.uv.cta"\n                >UVコレクションを見る',
    )
    R('alt="EMR-TEK ライトセラピーデバイス"', 'data-i18n-attr="alt:emr.index.fire.alt" alt="EMR-TEK ライトセラピーデバイス"')
    R('<span class="imageTextSection__em">違う造り。</span>', '<span class="imageTextSection__em" data-i18n="emr.index.fire.titleEm">違う造り。</span>')
    R(
        '<strong class="imageTextSection__strong">それを証明するためにテストされました。</strong>',
        '<strong class="imageTextSection__strong" data-i18n="emr.index.fire.titleStrong">それを証明するためにテストされました。</strong>',
    )
    R(
        """<div class="imageTextSection__rte">
              <p>
                1,400 mW/cm² — 標準 SMD パネルの出力の 7 倍を実現する COB テクノロジー。630nm、670nm、830nm
                での精度波長はシトクロム c オキシダーゼの吸収ピークと一致しました。Meanwell 産業グレードのドライバー
                — ちらつきゼロ、磁場ゼロ。自己申告の仕様ではなく、第三者が検証した放射照度。光バイオモジュレーションが実際に機能するかどうかを判断する科学に基づいて構築されたすべてのデバイス:
                波長、放射照度、線量。
              </p>
            </div>""",
        """<div class="imageTextSection__rte">
              <p data-i18n="emr.index.fire.body">
                1,400 mW/cm² — 標準 SMD パネルの出力の 7 倍を実現する COB テクノロジー。630nm、670nm、830nm
                での精度波長はシトクロム c オキシダーゼの吸収ピークと一致しました。Meanwell 産業グレードのドライバー
                — ちらつきゼロ、磁場ゼロ。自己申告の仕様ではなく、第三者が検証した放射照度。光バイオモジュレーションが実際に機能するかどうかを判断する科学に基づいて構築されたすべてのデバイス:
                波長、放射照度、線量。
              </p>
            </div>""",
    )
    R(
        '<span class="btn-text"\n                  >ショップ ライトセラピー',
        '<span class="btn-text" data-i18n="emr.index.fire.cta"\n                  >ショップ ライトセラピー',
    )
    R('<p class="portfolioSection__kicker">ロック解除</p>', '<p class="portfolioSection__kicker" data-i18n="emr.index.portfolio.kicker">ロック解除</p>')
    R(
        """<h2 id="portfolio-heading" class="portfolioSection__title">
              ライトのパワーが、<br class="portfolioSection__titleBr" />
              バランスの取れた、活性化したあなたのために
            </h2>""",
        """<h2 id="portfolio-heading" class="portfolioSection__title" data-i18n="emr.index.portfolio.title" data-i18n-html>
              ライトのパワーが、<br class="portfolioSection__titleBr" />
              バランスの取れた、活性化したあなたのために
            </h2>""",
    )
    R(
        """<p class="portfolioSection__lead">
              バランスをサポートし、活力を高め、日常の健康を高めるように設計された最先端の照明システム—科学と日常のパフォーマンスが融合する場所。
            </p>""",
        """<p class="portfolioSection__lead" data-i18n="emr.index.portfolio.lead">
              バランスをサポートし、活力を高め、日常の健康を高めるように設計された最先端の照明システム—科学と日常のパフォーマンスが融合する場所。
            </p>""",
    )

    profiles = [
        ("restore", "emr.index.profile.restore"),
        ("performance", "emr.index.profile.performance"),
        ("energy", "emr.index.profile.energy"),
        ("wellness", "emr.index.profile.wellness"),
    ]
    for slug, prefix in profiles:
        html = html.replace(
            f'<p class="profileCard__heading" id="profile-heading-{slug}">',
            f'<p class="profileCard__heading" id="profile-heading-{slug}" data-i18n="{prefix}.title">',
            1,
        )
        html = html.replace(
            f'<h3 id="profile-dialog-title-{slug}" class="profileDialog__title">',
            f'<h3 id="profile-dialog-title-{slug}" class="profileDialog__title" data-i18n="{prefix}.title">',
            1,
        )
    html = html.replace(
        '<span class="sr-only">詳細を開く</span>',
        '<span class="sr-only" data-i18n="emr.index.profile.openSr">詳細を開く</span>',
    )
    html = re.sub(
        r'(<button type="button" class="icon-btn profileDialog__close" data-profile-dialog-close )aria-label="閉じる"',
        r'\1data-i18n-attr="aria-label:emr.index.profile.close" aria-label="閉じる"',
        html,
    )
    for slug, prefix in profiles:
        m = re.search(rf'<dialog id="profile-dialog-{slug}"[\s\S]*?</dialog>', html)
        if not m:
            raise SystemExit(f"dialog missing: {slug}")
        block = m.group(0)
        new_block = block
        for idx, pm in enumerate(re.finditer(r"<p>\s*([\s\S]*?)\s*</p>", block), start=1):
            full = pm.group(0)
            new_block = new_block.replace(full, full.replace("<p>", f'<p data-i18n="{prefix}.p{idx}">', 1), 1)
        html = html.replace(block, new_block, 1)

    R(
        '<section class="container favs" aria-label="お気に入り">',
        '<section class="container favs" data-i18n-attr="aria-label:emr.index.favs.aria" aria-label="お気に入り">',
    )
    R(
        '<h2 class="h2" style="margin-top: 6px">お気に入り</h2>',
        '<h2 class="h2" style="margin-top: 6px" data-i18n="emr.index.favs.title">お気に入り</h2>',
    )
    R(
        '<a class="btn btn--ghost btn--sm" href="./collection-all.html" aria-label="全商品一覧へ">すべて表示</a>',
        '<a class="btn btn--ghost btn--sm" href="./collection-all.html" data-i18n-attr="aria-label:emr.index.favs.viewAllAria" aria-label="全商品一覧へ" data-i18n="emr.index.favs.viewAll">すべて表示</a>',
    )
    html = re.sub(
        r'(<button class="btn" type="button" data-add-id="[^"]+">)カートに追加(</button>)',
        r'\1<span data-i18n="emr.index.btn.addToCart">カートに追加</span>\2',
        html,
    )
    html = html.replace('<div class="save">保存 ', '<div class="save"><span data-i18n="emr.index.saveLabel">保存</span> ')
    for ja, key in [
        ("モバイル", "emr.index.tag.mobile"),
        ("ポータブル", "emr.index.tag.portable"),
        ("肌を滑らかにします", "emr.index.tag.smoothSkin"),
        ("ベストセラー", "emr.index.tag.bestseller"),
        ("マルチスペクトル", "emr.index.tag.multispectral"),
    ]:
        html = re.sub(
            rf'(<(?:div|span) class="(?:pilltag|tag)">){re.escape(ja)}(</(?:div|span)>)',
            rf'\1<span data-i18n="{key}">{ja}</span>\2',
            html,
        )
    html = html.replace('aria-label="評価"', 'data-i18n-attr="aria-label:emr.index.aria.rating" aria-label="評価"')
    html = html.replace('aria-label="特徴"', 'data-i18n-attr="aria-label:emr.index.aria.features" aria-label="特徴"')
    html = html.replace('aria-label="価格"', 'data-i18n-attr="aria-label:emr.index.aria.price" aria-label="価格"')
    R(
        '<section class="marqueeSection section section--padding" aria-label="スクロールバナー">',
        '<section class="marqueeSection section section--padding" data-i18n-attr="aria-label:emr.index.marquee.aria" aria-label="スクロールバナー">',
    )
    html = html.replace(
        'aria-label="ブランドバナー"',
        'data-i18n-attr="aria-label:emr.index.marquee.banner" aria-label="ブランドバナー"',
        1,
    )

    R('<p class="reviewsSection__kicker">実際のレビュー</p>', '<p class="reviewsSection__kicker" data-i18n="emr.index.reviews.kicker">実際のレビュー</p>')
    for word, key in [
        ("サポート", "emr.index.reviews.word1"),
        ("あなたの", "emr.index.reviews.word2"),
        ("ライト", "emr.index.reviews.word3"),
        ("旅", "emr.index.reviews.word4"),
    ]:
        html = html.replace(
            f'<span class="reviewsSection__titleWord">{word}</span>',
            f'<span class="reviewsSection__titleWord" data-i18n="{key}">{word}</span>',
            1,
        )
    R(
        'class="btn btn--ghost reviewsSection__link"\n                href="https://emr-tek.com/en-jp/pages/reviews"',
        'class="btn btn--ghost reviewsSection__link" data-i18n="emr.index.reviews.viewAll"\n                href="https://emr-tek.com/en-jp/pages/reviews"',
    )
    R('data-t-prev aria-label="前のレビュー"', 'data-t-prev data-i18n-attr="aria-label:emr.index.reviews.prev" aria-label="前のレビュー"')
    R('data-t-next aria-label="次のレビュー"', 'data-t-next data-i18n-attr="aria-label:emr.index.reviews.next" aria-label="次のレビュー"')
    R('aria-label="お客様の声"', 'data-i18n-attr="aria-label:emr.index.reviews.carousel" aria-label="お客様の声"')
    R(
        'data-t-dots role="tablist" aria-label="レビューのページ"',
        'data-t-dots role="tablist" data-i18n-attr="aria-label:emr.index.reviews.dots" aria-label="レビューのページ"',
    )
    html = html.replace(
        'aria-label="5つ星うち5つ"',
        'data-i18n-attr="aria-label:emr.index.reviews.stars5" aria-label="5つ星うち5つ"',
    )
    articles = re.findall(r"<article class=\"testimonial\">([\s\S]*?)</article>", html)
    if len(articles) != 9:
        raise SystemExit(f"expected 9 testimonials, got {len(articles)}")
    for i, inner in enumerate(articles, start=1):
        old = f"<article class=\"testimonial\">{inner}</article>"
        mq = re.search(r"<p>\s*([\s\S]*?)\s*</p>", inner)
        if not mq:
            raise SystemExit(f"testimonial {i}: no quote")
        quote = mq.group(1)
        new_inner = inner.replace(
            f"<p>\n                    {quote}\n                  </p>",
            f'<p data-i18n="emr.index.review.{i}.body">\n                    {quote}\n                  </p>',
            1,
        )
        new_inner = new_inner.replace(
            '<cite class="testimonial__cite">',
            f'<cite class="testimonial__cite" data-i18n="emr.index.review.{i}.cite">',
            1,
        )
        html = html.replace(old, f"<article class=\"testimonial\">{new_inner}</article>", 1)

    R(
        '<h2 id="benefits-heading" class="h2">メリット：赤色光と近赤外線（NIR）ライト</h2>',
        '<h2 id="benefits-heading" class="h2" data-i18n="emr.index.benefits.title">メリット：赤色光と近赤外線（NIR）ライト</h2>',
    )
    R(
        """<p class="subtle">
              一貫した高品質の光へのエクスポージャー（曝露）を通じて、ウェルネスを多方面からサポートするポイントの整理です。
            </p>""",
        """<p class="subtle" data-i18n="emr.index.benefits.lead">
              一貫した高品質の光へのエクスポージャー（曝露）を通じて、ウェルネスを多方面からサポートするポイントの整理です。
            </p>""",
    )
    cards = re.findall(r"<article class=\"benefitCard\">([\s\S]*?)</article>", html)
    for i, inner in enumerate(cards, start=1):
        old = f"<article class=\"benefitCard\">{inner}</article>"
        ni = inner.replace(
            '<h3 class="benefitCard__title">',
            f'<h3 class="benefitCard__title" data-i18n="emr.index.benefit.{i}.title">',
            1,
        ).replace(
            '<p class="benefitCard__desc">',
            f'<p class="benefitCard__desc" data-i18n="emr.index.benefit.{i}.desc">',
            1,
        )
        html = html.replace(old, f"<article class=\"benefitCard\">{ni}</article>", 1)

    R('<h2 id="shop-all-heading" class="sr-only">商品一覧</h2>', '<h2 id="shop-all-heading" class="sr-only" data-i18n="emr.index.shop.srTitle">商品一覧</h2>')
    R(
        '<label class="shopAll__sortLabel" for="shop-all-sort">並べ替え</label>',
        '<label class="shopAll__sortLabel" for="shop-all-sort" data-i18n="emr.index.shop.sortLabel">並べ替え</label>',
    )
    sort_map = [
        ("best", "emr.index.shop.sort.best", "おすすめ"),
        ("bestselling", "emr.index.shop.sort.bestselling", "売れ筋順"),
        ("price_asc", "emr.index.shop.sort.priceAsc", "価格：安い順"),
        ("price_desc", "emr.index.shop.sort.priceDesc", "価格：高い順"),
        ("az", "emr.index.shop.sort.az", "名前：あいうえお順"),
        ("za", "emr.index.shop.sort.za", "名前：逆順"),
        ("new_desc", "emr.index.shop.sort.newDesc", "新着順"),
        ("old_asc", "emr.index.shop.sort.oldAsc", "発売が古い順"),
    ]
    for val, key, label in sort_map:
        sel = f'<option value="{val}" selected>{label}</option>'
        if sel in html:
            html = html.replace(
                sel,
                f'<option value="{val}" selected data-i18n="{key}">{label}</option>',
                1,
            )
        else:
            html = html.replace(
                f'<option value="{val}">{label}</option>',
                f'<option value="{val}" data-i18n="{key}">{label}</option>',
                1,
            )

    R('<summary class="shopFacets__summary">フィルターを表示</summary>', '<summary class="shopFacets__summary" data-i18n="emr.index.shop.facetsSummary">フィルターを表示</summary>')
    R('<label class="search__label" for="shop-all-q">キーワード</label>', '<label class="search__label" for="shop-all-q" data-i18n="emr.index.shop.keyword">キーワード</label>')
    R(
        'placeholder="例：Firefly / マスク / 630nm"',
        'data-i18n-attr="placeholder:emr.index.shop.searchPlaceholder" placeholder="例：Firefly / マスク / 630nm"',
    )
    R('<legend class="shopFacets__legend">カテゴリ</legend>', '<legend class="shopFacets__legend" data-i18n="emr.index.shop.categoryLegend">カテゴリ</legend>')
    cat_map = [
        ("red", "emr.index.shop.cat.red", "赤色光・近赤外"),
        ("mask", "emr.index.shop.cat.mask", "LEDマスク"),
        ("uv", "emr.index.shop.cat.uv", "UV"),
        ("glasses", "emr.index.shop.cat.glasses", "ブルーライトカット"),
        ("cosmetics", "emr.index.shop.cat.cosmetics", "コスメ"),
        ("indoor", "emr.index.shop.cat.indoor", "室内照明"),
        ("stands", "emr.index.shop.cat.stands", "スタンド"),
    ]
    for val, key, label in cat_map:
        html = html.replace(
            f'<input type="checkbox" data-filter="category" value="{val}" /> {label}',
            f'<input type="checkbox" data-filter="category" value="{val}" /> <span data-i18n="{key}">{label}</span>',
            1,
        )
    R('<span class="shopFacets__legend">価格（円・税込目安）</span>', '<span class="shopFacets__legend" data-i18n="emr.index.shop.priceLegend">価格（円・税込目安）</span>')
    R('placeholder="最低"', 'data-i18n-attr="placeholder:emr.index.shop.priceMin" placeholder="最低"')
    R('aria-label="最低価格"', 'data-i18n-attr="aria-label:emr.index.shop.priceMinAria" aria-label="最低価格"')
    R('placeholder="最高"', 'data-i18n-attr="placeholder:emr.index.shop.priceMax" placeholder="最高"')
    R('aria-label="最高価格"', 'data-i18n-attr="aria-label:emr.index.shop.priceMaxAria" aria-label="最高価格"')
    R('data-action="apply-price">価格を適用</button>', 'data-action="apply-price" data-i18n="emr.index.shop.applyPrice">価格を適用</button>')
    R(
        'data-action="clear-filters">\n                    条件をクリア\n                  </button>',
        'data-action="clear-filters" data-i18n="emr.index.shop.clearFilters">\n                    条件をクリア\n                  </button>',
    )
    R('<h2 class="collectionAll__subhead h2">カテゴリーから探す</h2>', '<h2 class="collectionAll__subhead h2" data-i18n="emr.index.shop.categoriesTitle">カテゴリーから探す</h2>')
    R(
        """<p class="subtle collectionAll__sublead">
              ベストセラー・用途別のコレクションへすぐ移動できます（
              <a href="https://emr-tek.com/en-jp/collections/all" target="_blank" rel="noopener noreferrer"
                >公式の Shop All</a
              >
              と同じ導線イメージ）。
            </p>""",
        """<p class="subtle collectionAll__sublead" data-i18n="emr.index.shop.categoriesLead" data-i18n-html>
              ベストセラー・用途別のコレクションへすぐ移動できます（
              <a href="https://emr-tek.com/en-jp/collections/all" target="_blank" rel="noopener noreferrer"
                >公式の Shop All</a
              >
              と同じ導線イメージ）。
            </p>""",
    )
    R(
        '<div class="cards collectionAll__promos" aria-label="カテゴリ別コレクション">',
        '<div class="cards collectionAll__promos" data-i18n-attr="aria-label:emr.index.shop.promosAria" aria-label="カテゴリ別コレクション">',
    )

    html = re.sub(
        r'<div class="cardlink__kicker">ベストセラー</div>',
        '<div class="cardlink__kicker" data-i18n="emr.index.tag.bestseller">ベストセラー</div>',
        html,
    )

    promo_descs = [
        ("肌・リカバリー・エネルギー向けに調整された赤色・近赤外のライトセラピー。", "emr.index.shop.promo.redDesc"),
        ("太陽光に近い体験を室内で。UV ライト関連製品。", "emr.index.shop.promo.uvDesc"),
        ("ライトセラピーと相性の良いセラム・スキンケア（公式の Face Mask / Cosmetics 相当）。", "emr.index.shop.promo.maskDesc"),
        ("目を守り、睡眠とホルモンバランスをサポート。", "emr.index.shop.promo.glassesDesc"),
        ("自然光に近い、サーカディアン配慮の室内照明・電球。", "emr.index.shop.promo.indoorDesc"),
    ]
    for text, key in promo_descs:
        html = html.replace(
            f'<div class="cardlink__desc">\n                    {text}\n                  </div>',
            f'<div class="cardlink__desc" data-i18n="{key}">\n                    {text}\n                  </div>',
            1,
        )
    R('<h2 id="learn-heading-all" class="h2">赤色光セラピーのメリットを学ぶ</h2>', '<h2 id="learn-heading-all" class="h2" data-i18n="emr.index.learn.title">赤色光セラピーのメリットを学ぶ</h2>')
    R('<a class="btn btn--ghost" href="./blog.html" aria-label="すべての記事">すべての記事</a>', '<a class="btn btn--ghost" href="./blog.html" data-i18n-attr="aria-label:emr.index.learn.allPostsAria" aria-label="すべての記事" data-i18n="emr.index.learn.allPosts">すべての記事</a>')
    learn_posts = [
        ("肌に本当に必要なものは？— プラスチックの“重さ”を見直す", "emr.index.learn.post1.title", "従来のLEDマスクは密着型。快適性と使い勝手のトレードオフをどう考えるか…", "emr.index.learn.post1.desc"),
        ("人は紫外線を見られる？見えない光の謎", "emr.index.learn.post2.title", "可視光の外側にある紫外線。見えない波長が私たちに与える影響を探ります。", "emr.index.learn.post2.desc"),
        ("赤色光を“肺”に使うには：ステップ別ガイド", "emr.index.learn.post3.title", "赤色光・近赤外の活用は広がっています。安全に楽しむための基本手順を紹介。", "emr.index.learn.post3.desc"),
    ]
    for title, tk, desc, dk in learn_posts:
        html = html.replace(f'<h3 class="post__title">\n                    {title}\n                  </h3>', f'<h3 class="post__title" data-i18n="{tk}">\n                    {title}\n                  </h3>', 1)
        html = html.replace(f'<p class="post__desc">\n                    {desc}\n                  </p>', f'<p class="post__desc" data-i18n="{dk}">\n                    {desc}\n                  </p>', 1)
    html = html.replace('aria-label="続きを読む"', 'data-i18n-attr="aria-label:emr.index.learn.readMoreAria" aria-label="続きを読む"')
    html = html.replace('>続きを読む</a', ' data-i18n="emr.index.learn.readMore">続きを読む</a')
    R('<section class="collectionAll__trust" aria-label="サービスと安心">', '<section class="collectionAll__trust" data-i18n-attr="aria-label:emr.index.trust.aria" aria-label="サービスと安心">')
    trust = [
        ("カスタマーサポート", "emr.index.trust.support.title", "ご不明点はいつでもお問い合わせください。チームがサポートします。", "emr.index.trust.support.body"),
        ("送料について", "emr.index.trust.shipping.title", "一定金額以上のご注文で送料無料になる場合があります（地域・キャンペーンにより異なります）。", "emr.index.trust.shipping.body"),
        ("お友だち紹介", "emr.index.trust.referral.title", "紹介プログラムにより双方に割引がある場合があります（公式の案内に準拠）。", "emr.index.trust.referral.body"),
        ("安全なお支払い", "emr.index.trust.payment.title", "決済情報は暗号化され安全に処理されます。", "emr.index.trust.payment.body"),
    ]
    for tt, tk, body, bk in trust:
        html = html.replace(f'<div class="collectionAll__trustTitle">{tt}</div>', f'<div class="collectionAll__trustTitle" data-i18n="{tk}">{tt}</div>', 1)
        html = html.replace(f'<p class="micro subtle">\n                    {body}\n                  </p>', f'<p class="micro subtle" data-i18n="{bk}">\n                    {body}\n                  </p>', 1)
    R('<p class="micro subtle collectionAll__cert">認証の例: FCC / RoHS / CE（製品により異なります）</p>', '<p class="micro subtle collectionAll__cert" data-i18n="emr.index.trust.cert">認証の例: FCC / RoHS / CE（製品により異なります）</p>')
    R('<h2 class="h2">注文を追跡</h2>', '<h2 class="h2" data-i18n="emr.index.track.title">注文を追跡</h2>')
    R('<p class="subtle">注文番号とメールアドレスを入力してください。</p>', '<p class="subtle" data-i18n="emr.index.track.lead">注文番号とメールアドレスを入力してください。</p>')
    R('<span>注文番号</span>', '<span data-i18n="emr.index.track.orderLabel">注文番号</span>')
    R('placeholder="例：#1234"', 'data-i18n-attr="placeholder:emr.index.track.orderPlaceholder" placeholder="例：#1234"')
    R('<span>メールアドレス</span>', '<span data-i18n="emr.index.track.emailLabel">メールアドレス</span>')
    R('<button class="btn" type="submit">追跡する</button>', '<button class="btn" type="submit" data-i18n="emr.index.track.submit">追跡する</button>')
    html = re.sub(
        r'(<div class="micro subtle">\s*<p>\s*<strong>重要な注意事項</strong>:)',
        r'<div class="micro subtle"><p data-i18n="emr.index.footer.disclaimer1" data-i18n-html><strong>重要な注意事項</strong>:',
        html,
        count=1,
    )
    R(
        '<p>\n              ※ これらの記述は食品医薬品局によって評価されていません。この製品は、病気の診断、治療、治癒、予防を目的としたものではありません。\n            </p>',
        '<p data-i18n="emr.index.footer.disclaimer2">\n              ※ これらの記述は食品医薬品局によって評価されていません。この製品は、病気の診断、治療、治癒、予防を目的としたものではありません。\n            </p>',
    )
    R('<li><a class="link" href="./collection-all.html">全商品</a></li>', '<li><a class="link" href="./collection-all.html" data-i18n="emr.index.footer.allProducts">全商品</a></li>')
    R(
        'この検索は一覧（全商品）に反映されます。',
        '<span data-i18n="emr.index.search.modalHint">この検索は一覧（全商品）に反映されます。</span>',
    )
    html = html.replace(
        '<form class="track__form" data-track-form>',
        '<form class="track__form" data-track-form data-i18n-track-result="emr.index.track.result">',
        1,
    )
    INDEX.write_text(html, encoding="utf-8")
    print("patched", INDEX)


if __name__ == "__main__":
    main()
