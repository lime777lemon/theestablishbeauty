#!/usr/bin/env python3
"""Add data-i18n attributes to index.html."""
from __future__ import annotations

import re
from pathlib import Path

INDEX = Path(__file__).resolve().parents[1] / "index.html"


def main() -> None:
    html = INDEX.read_text(encoding="utf-8")
    if 'data-i18n="emr.index.hero.h1"' in html:
        print("index.html already patched")
        return

    def R(old: str, new: str) -> None:
        nonlocal html
        if old not in html:
            raise SystemExit(f"PATCH MISS:\n{old[:240]}")
        html = html.replace(old, new, 1)

    # --- head / scripts ---
    R("<title>ホーム – EMR-TEK</title>", '<title data-i18n-title="emr.index.doc.title">ホーム – EMR-TEK</title>')
    R(
        'name="description"\n      content="EMR-TEK 日本公式ストアのホーム。赤色光・近赤外、UV、LEDマスク、ブルーライトカット・コスメなど。全商品一覧は専用ページから。"',
        'name="description"\n      data-i18n-desc="emr.index.doc.desc"\n      content="EMR-TEK 日本公式ストアのホーム。赤色光・近赤外、UV、LEDマスク、ブルーライトカット・コスメなど。全商品一覧は専用ページから。"',
    )
    R(
        '<script src="./app.js?v=20260517" defer></script>\n      <script src="./i18n.js" defer></script>',
        '<script src="./i18n-index-messages.js"></script>\n    <script src="./app.js?v=20260517" defer></script>\n      <script src="./i18n.js" defer></script>',
    )

    # --- hero ---
    R(
        '<div class="breadcrumbs" aria-label="パンくず">',
        '<div class="breadcrumbs" data-i18n-attr="aria-label:emr.index.breadcrumb.aria" aria-label="パンくず">',
    )
    R('<span aria-current="page">EMR-TEK ストア</span>', '<span aria-current="page" data-i18n="emr.index.hero.breadcrumb">EMR-TEK ストア</span>')
    R("<h1 class=\"h1\">EMR-TEK TOKYO公式ストア</h1>", '<h1 class="h1" data-i18n="emr.index.hero.h1">EMR-TEK TOKYO公式ストア</h1>')
    R(
        "<p class=\"subtle\">\n                赤色光・近赤外、UV、LEDマスク、ブルーライトカット、コスメ、室内照明など。\n              </p>",
        '<p class="subtle" data-i18n="emr.index.hero.sub">\n                赤色光・近赤外、UV、LEDマスク、ブルーライトカット、コスメ、室内照明など。\n              </p>',
    )
    R(
        '<motion class="heroVideo" aria-label="プロモーション動画">',
        '<div class="heroVideo" data-i18n-attr="aria-label:emr.index.hero.videoAria" aria-label="プロモーション動画">',
    )

    INDEX.write_text(html, encoding="utf-8")
    print("ERROR: accidental motion in script")
