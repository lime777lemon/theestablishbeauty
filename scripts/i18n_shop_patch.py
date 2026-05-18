"""Apply emr.index.shop.* i18n attributes to shop-all HTML blocks."""
from __future__ import annotations

import re


def apply_shop_section(html: str) -> str:
    if 'data-i18n="emr.index.shop.srTitle"' in html:
        return html

    def R(old: str, new: str) -> None:
        nonlocal html
        if old not in html:
            raise ValueError(f"shop patch miss:\n{old[:200]}")
        html = html.replace(old, new, 1)

    R(
        '<h2 id="shop-all-heading" class="sr-only">商品一覧</h2>',
        '<h2 id="shop-all-heading" class="sr-only" data-i18n="emr.index.shop.srTitle">商品一覧</h2>',
    )
    R(
        '<label class="shopAll__sortLabel" for="shop-all-sort">並べ替え</label>',
        '<label class="shopAll__sortLabel" for="shop-all-sort" data-i18n="emr.index.shop.sortLabel">並べ替え</label>',
    )
    for val, key, label in [
        ("best", "emr.index.shop.sort.best", "おすすめ"),
        ("bestselling", "emr.index.shop.sort.bestselling", "売れ筋順"),
        ("price_asc", "emr.index.shop.sort.priceAsc", "価格：安い順"),
        ("price_desc", "emr.index.shop.sort.priceDesc", "価格：高い順"),
        ("az", "emr.index.shop.sort.az", "名前：あいうえお順"),
        ("za", "emr.index.shop.sort.za", "名前：逆順"),
        ("new_desc", "emr.index.shop.sort.newDesc", "新着順"),
        ("old_asc", "emr.index.shop.sort.oldAsc", "発売が古い順"),
    ]:
        sel = f'<option value="{val}" selected>{label}</option>'
        if sel in html:
            html = html.replace(sel, f'<option value="{val}" selected data-i18n="{key}">{label}</option>', 1)
        else:
            html = html.replace(f'<option value="{val}">{label}</option>', f'<option value="{val}" data-i18n="{key}">{label}</option>', 1)

    R('<summary class="shopFacets__summary">フィルターを表示</summary>', '<summary class="shopFacets__summary" data-i18n="emr.index.shop.facetsSummary">フィルターを表示</summary>')
    R('<label class="search__label" for="shop-all-q">キーワード</label>', '<label class="search__label" for="shop-all-q" data-i18n="emr.index.shop.keyword">キーワード</label>')
    R('placeholder="例：Firefly / マスク / 630nm"', 'data-i18n-attr="placeholder:emr.index.shop.searchPlaceholder" placeholder="例：Firefly / マスク / 630nm"')
    R('<legend class="shopFacets__legend">カテゴリ</legend>', '<legend class="shopFacets__legend" data-i18n="emr.index.shop.categoryLegend">カテゴリ</legend>')
    for val, key, label in [
        ("red", "emr.index.shop.cat.red", "赤色光・近赤外"),
        ("mask", "emr.index.shop.cat.mask", "LEDマスク"),
        ("uv", "emr.index.shop.cat.uv", "UV"),
        ("glasses", "emr.index.shop.cat.glasses", "ブルーライトカット"),
        ("cosmetics", "emr.index.shop.cat.cosmetics", "コスメ"),
        ("indoor", "emr.index.shop.cat.indoor", "室内照明"),
        ("stands", "emr.index.shop.cat.stands", "スタンド"),
    ]:
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
    R('data-action="clear-filters">\n                    条件をクリア\n                  </button>', 'data-action="clear-filters" data-i18n="emr.index.shop.clearFilters">\n                    条件をクリア\n                  </button>')
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
    R('<div class="cards collectionAll__promos" aria-label="カテゴリ別コレクション">', '<div class="cards collectionAll__promos" data-i18n-attr="aria-label:emr.index.shop.promosAria" aria-label="カテゴリ別コレクション">')
    html = html.replace('<div class="cards collectionAll__promos"', '<div class="cards collectionAll__promos"', 1)
    html = re.sub(r'<div class="cardlink__kicker">ベストセラー</div>', '<div class="cardlink__kicker" data-i18n="emr.index.tag.bestseller">ベストセラー</div>', html)
    html = html.replace('<div class="cardlink__kicker"', '<div class="cardlink__kicker"', 1)
    for text, key in [
        ("肌・リカバリー・エネルギー向けに調整された赤色・近赤外のライトセラピー。", "emr.index.shop.promo.redDesc"),
        ("太陽光に近い体験を室内で。UV ライト関連製品。", "emr.index.shop.promo.uvDesc"),
        ("ライトセラピーと相性の良いセラム・スキンケア（公式の Face Mask / Cosmetics 相当）。", "emr.index.shop.promo.maskDesc"),
        ("目を守り、睡眠とホルモンバランスをサポート。", "emr.index.shop.promo.glassesDesc"),
        ("自然光に近い、サーカディアン配慮の室内照明・電球。", "emr.index.shop.promo.indoorDesc"),
    ]:
        html = html.replace(
            f'<div class="cardlink__desc">\n                    {text}\n                  </div>',
            f'<div class="cardlink__desc" data-i18n="{key}">\n                    {text}\n                  </div>',
            1,
        )
    html = html.replace('</div>', '</div>')
    return html
