#!/usr/bin/env python3
"""Add i18n + tracking script tags to category collection pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAGES = {
    "collection-blue-light-glasses.html": "blueLight",
    "collection-red-light.html": "redLight",
    "collection-indoor-lighting.html": "indoorLighting",
    "collection-uv.html": "uv",
}

FOOTER_LINKS = [
    (
        '<li><a class="link" href="./collection-red-light.html">Red Light Therapy Devices</a></li>',
        '<li><a class="link" href="./collection-red-light.html" data-i18n="emr.index.shop.promo.redTitle">Red Light Therapy Devices</a></li>',
    ),
    (
        '<li><a class="link" href="./collection-blue-light-glasses.html">Blue Light Blocking Glasses</a></li>',
        '<li><a class="link" href="./collection-blue-light-glasses.html" data-i18n="emr.index.shop.promo.glassesTitle">Blue Light Blocking Glasses</a></li>',
    ),
    (
        '<li><a class="link" href="./collection-indoor-lighting.html">Indoor Lighting Solutions</a></li>',
        '<li><a class="link" href="./collection-indoor-lighting.html" data-i18n="emr.index.shop.promo.indoorTitle">Indoor Lighting Solutions</a></li>',
    ),
    (
        '<li><a class="link" href="./collection-uv.html">UV</a></li>',
        '<li><a class="link" href="./collection-uv.html" data-i18n="emr.index.shop.promo.uvTitle">UV</a></li>',
    ),
]

SORT_OPTIONS = [
    ('value="bestselling" selected>売れ筋', 'value="bestselling" selected data-i18n="emr.collection.page.sort.bestselling">売れ筋'),
    ('value="price-asc">価格：安い順', 'value="price-asc" data-i18n="emr.collection.page.sort.priceAsc">価格：安い順'),
    ('value="price-desc">価格：高い順', 'value="price-desc" data-i18n="emr.collection.page.sort.priceDesc">価格：高い順'),
    ('value="title-asc">名前：あいうえお順', 'value="title-asc" data-i18n="emr.collection.page.sort.titleAsc">名前：あいうえお順'),
    ('value="title-desc">名前：逆順', 'value="title-desc" data-i18n="emr.collection.page.sort.titleDesc">名前：逆順'),
    ('value="date-desc">新着順', 'value="date-desc" data-i18n="emr.collection.page.sort.dateDesc">新着順'),
    ('value="date-asc">発売が古い順', 'value="date-asc" data-i18n="emr.collection.page.sort.dateAsc">発売が古い順'),
]


def inject_scripts(html: str) -> str:
    if "i18n-pages-messages.js" in html:
        return html
    target = '<script src="./i18n.js" defer></script>'
    insert = (
        '<script src="./i18n-index-messages.js"></script>\n'
        '    <script src="./i18n-pages-messages.js"></script>\n'
        '    <script src="./i18n-catalog-messages.js"></script>\n'
        "      "
    )
    return html.replace(target, insert + target, 1)


def patch_page(html: str, key: str) -> str:
    marker = f'data-i18n="emr.collection.{key}.hero.h1"'
    if marker in html:
        return html

    html = inject_scripts(html)

    title_m = re.search(r"<title>([^<]+)</title>", html)
    desc_m = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', html)
    if not title_m or not desc_m:
        raise ValueError(f"title/meta not found for {key}")

    html = html.replace(
        f"<title>{title_m.group(1)}</title>",
        f'<title data-i18n-title="emr.collection.{key}.doc.title">{title_m.group(1)}</title>',
        1,
    )
    html = re.sub(
        r'(<meta\s+name="description"\s+)content="([^"]+)"',
        rf'\1data-i18n-desc="emr.collection.{key}.doc.desc" content="\2"',
        html,
        count=1,
    )

    html = html.replace(
        '<div class="breadcrumbs" aria-label="パンくず">',
        '<div class="breadcrumbs" data-i18n-attr="aria-label:emr.collection.breadcrumb.aria" aria-label="パンくず">',
        1,
    )
    html = html.replace(
        '<a href="./index.html">コレクション</a>',
        '<a href="./index.html" data-i18n="emr.collection.breadcrumb.parent">コレクション</a>',
        1,
    )

    current_m = re.search(r'<span aria-current="page">([^<]+)</span>', html)
    if current_m:
        current = current_m.group(1)
        html = html.replace(
            f'<span aria-current="page">{current}</span>',
            f'<span aria-current="page" data-i18n="emr.collection.{key}.breadcrumb.current">{current}</span>',
            1,
        )

    h1_m = re.search(r'<h1 class="h1">([^<]+)</h1>', html)
    if h1_m:
        h1 = h1_m.group(1)
        html = html.replace(
            f'<h1 class="h1">{h1}</h1>',
            f'<h1 class="h1" data-i18n="emr.collection.{key}.hero.h1">{h1}</h1>',
            1,
        )

    sub_m = re.search(r'<div class="hero__titleRow">\s*<div>\s*<h1[^>]*>[^<]+</h1>\s*<p class="subtle">\s*([\s\S]*?)\s*</p>', html)
    if sub_m:
        sub = sub_m.group(1).strip()
        html = html.replace(
            f'<p class="subtle">\n                {sub}\n              </p>',
            f'<p class="subtle" data-i18n="emr.collection.{key}.hero.sub">\n                {sub}\n              </p>',
            1,
        )

    html = html.replace(
        '<h2 id="collection-heading" class="sr-only">商品一覧</h2>',
        '<h2 id="collection-heading" class="sr-only" data-i18n="emr.collection.page.srTitle">商品一覧</h2>',
        1,
    )
    html = html.replace(
        '<span data-collection-count>',
        '<span data-collection-count>',
        1,
    )
    html = re.sub(
        r'(<span data-collection-count>\d+</span>)\s*件の商品',
        r'\1<span data-collection-count-suffix> 件の商品</span>',
        html,
        count=1,
    )
    html = html.replace(
        '<label class="collectionToolbar__sortLabel" for="collection-sort">並び順</label>',
        '<label class="collectionToolbar__sortLabel" for="collection-sort" data-i18n="emr.collection.page.sortLabel">並び順</label>',
        1,
    )

    for old, new in SORT_OPTIONS:
        html = html.replace(f"<option {old}</option>", f"<option {new}</option>")

    html = html.replace(
        '<span class="collectionCard__tag">公式ストア</span>',
        '<span class="collectionCard__tag" data-i18n="emr.collection.page.tagOfficial">公式ストア</span>',
    )
    html = html.replace('title="レビュー"', 'data-i18n-attr="title:emr.collection.page.ratingTitle" title="レビュー"')

    if key == "blueLight":
        html = html.replace(
            '<p class="collectionCard__kicker">ブルーライトカット</p>',
            '<p class="collectionCard__kicker" data-i18n="emr.collection.page.kickerBlueLight">ブルーライトカット</p>',
        )
    elif key == "redLight":
        html = html.replace(
            '<p class="collectionCard__kicker">レッドおよび近赤外線ライトデバイス</p>',
            '<p class="collectionCard__kicker" data-i18n="emr.collection.page.kickerRedLight">レッドおよび近赤外線ライトデバイス</p>',
        )
    elif key == "indoorLighting":
        html = html.replace(
            '<p class="collectionCard__kicker">室内照明</p>',
            '<p class="collectionCard__kicker" data-i18n="emr.collection.page.kickerIndoor">室内照明</p>',
        )
        html = html.replace(
            'href="https://www.emr-tek.com/products/daylight-bulb?snowball=YUKI03417" target="_blank" rel="noopener noreferrer"',
            'href="https://www.emr-tek.com/products/daylight-bulb?snowball=YUKI03417" target="_blank" rel="noopener noreferrer" data-product-id="daylight-bulb"',
            2,
        )
    elif key == "uv":
        html = html.replace(
            '<p class="collectionCard__kicker">UV</p>',
            '<p class="collectionCard__kicker" data-i18n="emr.collection.page.kickerUv">UV</p>',
        )

    for old, new in FOOTER_LINKS:
        if old in html and new not in html:
            html = html.replace(old, new, 1)

    return html


def main() -> None:
    for fname, key in PAGES.items():
        path = ROOT / fname
        html = path.read_text(encoding="utf-8")
        patched = patch_page(html, key)
        path.write_text(patched, encoding="utf-8")
        print(f"patched {fname}")


if __name__ == "__main__":
    main()
