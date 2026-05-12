#!/usr/bin/env python3
"""Align EMR storefront HTML headers (topbar + brand + main nav) with index.html."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP = {
    "establish-beauty.html",
    "about-us.html",
    "auth-business-register.html",
    "auth-business-login.html",
    "emr-tek.html",
}

TOPBAR = """    <div class="topbar">
      <div class="container topbar__inner">
        <div class="topbar__left" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px">
          <a class="link micro" href="./about-us.html" data-i18n="emr.topbar.teb" style="font-weight: 600; white-space: nowrap"
            >The Establish Beauty — メインページ</a
          >
          <span class="badge" data-i18n="emr.topbar.badge">出荷2〜5営業日・お届け7〜14日目安</span>
        </div>

        <div class="topbar__right" aria-label="言語と通貨" data-i18n-attr="aria-label:emr.topbar.langcurrency" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;justify-content:flex-end">
          <div class="lang-switch" role="group" data-i18n-attr="aria-label:lang.label">
            <button type="button" class="pill pill--lang" data-lang-switch="ja">日本語</button>
            <button type="button" class="pill pill--lang" data-lang-switch="en">English</button>
          </div>
        </div>
      </div>
    </div>"""

BRAND = """        <div class="brand">
          <a
            class="brand__link establishBrand__link"
            href="./index.html"
            data-i18n-attr="aria-label:emr.brand.aria"
            aria-label="EMR-TEK ホーム"
          >
            <img
              class="establishBrand__logo--header"
              src="./assets/teb-logo.png"
              width="200"
              height="200"
              decoding="async"
              data-i18n-attr="alt:teb.brand.logoAlt"
              alt="The Establish Beauty ロゴ"
            />
          </a>
        </div>"""

NAV_OPEN = '        <nav class="nav" data-i18n-attr="aria-label:emr.nav.main" aria-label="メイン">\n'
NAV_CLOSE = "        </nav>"


def nav_link(href: str, i18n: str, label: str, active: bool) -> str:
    cls = "nav__link nav__link--active" if active else "nav__link"
    return f'          <a class="{cls}" href="{href}" data-i18n="{i18n}">{label}</a>'


def active_key_for(filename: str) -> str | None:
    if filename == "science.html":
        return "science"
    if filename == "blog.html":
        return "blog"
    if filename == "faq.html":
        return "faq"
    if filename == "contact.html":
        return "contact"
    if filename == "collection-all.html" or filename.startswith("collection-"):
        return "shop"
    if filename == "auth-consumer-register.html":
        return "register"
    if filename == "auth-consumer-login.html":
        return "login"
    return None


def build_nav(filename: str) -> str:
    track_href = "#track" if filename == "index.html" else "./index.html#track"
    ak = active_key_for(filename)

    parts = [
        nav_link("./about-us.html", "emr.nav.teb", "私たちについて", ak == "teb"),
        nav_link("./collection-all.html", "emr.nav.shop", "ショップ", ak == "shop"),
        nav_link("./science.html", "emr.nav.science", "科学を学ぶ", ak == "science"),
        nav_link("./blog.html", "emr.nav.blog", "ブログ", ak == "blog"),
        nav_link(track_href, "emr.nav.track", "注文追跡", ak == "track"),
        nav_link("./faq.html", "emr.nav.faq", "FAQ", ak == "faq"),
        nav_link(
            "./auth-consumer-register.html",
            "emr.nav.register",
            "新規登録",
            ak == "register",
        ),
        nav_link("./auth-consumer-login.html", "emr.nav.login", "ログイン", ak == "login"),
        nav_link("./contact.html", "emr.nav.contact", "お問い合わせ", ak == "contact"),
    ]
    if filename == "sql-editor.html":
        parts.append(nav_link("./sql-editor.html", "emr.nav.sql", "SQL メモ", True))
    elif filename == "contact-inquiries-admin.html":
        parts.append(nav_link("./sql-editor.html", "emr.nav.sql", "SQL メモ", False))
    return NAV_OPEN + "\n".join(parts) + "\n" + NAV_CLOSE


def replace_topbar(text: str) -> str:
    start = text.find('<div class="topbar">')
    header_start = text.find('<header class="header">')
    if start == -1 or header_start == -1 or header_start <= start:
        return text
    prefix = text[:start].rstrip()
    return prefix + "\n\n" + TOPBAR.strip() + "\n\n" + text[header_start:]


def replace_brand_old(text: str) -> tuple[str, int]:
    old_brand = re.compile(
        r"\s*<div class=\"brand\">\s*"
        r'<a class="brand__link" href="\./index\.html" data-i18n-attr="aria-label:emr\.brand\.aria"[^>]*>\s*'
        r'<span class="brand__name">EMR-TEK</span>\s*'
        r"</a>\s*"
        r"</div>",
        re.DOTALL,
    )
    return old_brand.subn("\n" + BRAND + "\n", text, count=1)


def replace_nav(text: str, filename: str) -> tuple[str, int]:
    nav_re = re.compile(
        r'<nav class="nav" data-i18n-attr="aria-label:emr\.nav\.main" aria-label="メイン">.*?</nav>',
        re.DOTALL,
    )
    return nav_re.subn(build_nav(filename), text, count=1)


def patch_file(path: Path) -> bool:
    if path.name in SKIP:
        return False
    text = path.read_text(encoding="utf-8")
    if 'data-i18n-attr="aria-label:emr.nav.main"' not in text:
        return False

    orig = text
    text = replace_topbar(text)
    text, _ = replace_brand_old(text)
    text, n_nav = replace_nav(text, path.name)
    if n_nav == 0:
        return False

    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for p in sorted(ROOT.glob("*.html")):
        if patch_file(p):
            changed.append(p.name)
    print("Updated:", len(changed))
    for n in changed:
        print(" ", n)


if __name__ == "__main__":
    main()
