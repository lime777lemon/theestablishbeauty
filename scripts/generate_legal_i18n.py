#!/usr/bin/env python3
"""Generate i18n-legal-messages.js and patch legal policy HTML pages."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

COMMON = {
    "emr.common.breadcrumb.home": {"ja": "ホーム", "en": "Home"},
    "emr.legal.updated": {
        "ja": "最終更新日：2026年4月11日",
        "en": "Last updated: April 11, 2026",
    },
    "emr.legal.breadcrumb.aria": {
        "ja": "パンくず",
        "en": "Breadcrumb",
    },
    "emr.legal.footer.tagline": {
        "ja": "商品の紹介と、購入先の販売事業者への案内。",
        "en": "Product introductions and links to the selling business.",
    },
}

PAGES = {
    "tokushoho.html": {
        "prefix": "tokushoho",
        "doc_title": {
            "ja": "特定商取引法に基づく表記 – EMR-TEK",
            "en": "Specified Commercial Transactions – EMR-TEK",
        },
        "doc_desc": {
            "ja": "特定商取引法に基づく表記。本サイトは通信販売の販売者ではなく、配送・支払い・返品は購入先の事業者が行います。",
            "en": "Specified commercial transactions notice. This site is not the mail-order seller. The business you buy from handles shipping, payment, and returns.",
        },
        "crumb": {
            "ja": "特定商取引法に基づく表記",
            "en": "Specified Commercial Transactions",
        },
        "h1": {
            "ja": "特定商取引法に基づく表記",
            "en": "Specified Commercial Transactions",
        },
        "sub": {
            "ja": "本サイトは通信販売の販売者ではありません",
            "en": "This site is not the mail-order seller",
        },
        "updated": {
            "ja": "最終更新日：2026年11月7日",
            "en": "Last updated: November 7, 2026",
        },
    },
    "terms.html": {
        "prefix": "terms",
        "doc_title": {
            "ja": "利用規約 – The Establish Beauty",
            "en": "Terms of Service – The Establish Beauty",
        },
        "doc_desc": {
            "ja": "The Establish Beauty 利用規約。商品の購入契約は購入先の販売事業者との間で成立し、配送・支払い・返品は当該事業者が行います。",
            "en": "The Establish Beauty Terms. Purchase contracts are with the selling business, which handles shipping, payment, and returns.",
        },
        "updated": {
            "ja": "最終更新日：2026年11月7日",
            "en": "Last updated: November 7, 2026",
        },
        "crumb": {"ja": "利用規約", "en": "Terms of Service"},
        "h1": {"ja": "利用規約", "en": "Terms of Service"},
        "sub": {
            "ja": "本サイトの利用条件。売買契約の相手方は購入先の販売事業者です",
            "en": "Terms of use. The purchase contract is with the selling business",
        },
    },
    "privacy.html": {
        "prefix": "privacy",
        "doc_title": {
            "ja": "プライバシーポリシー – The Establish Beauty",
            "en": "Privacy Policy – The Establish Beauty",
        },
        "doc_desc": {
            "ja": "The Establish Beauty の個人情報の取扱い。商品の紹介、購入先の事業者、InstagramおよびMetaとの接続について。",
            "en": "How The Establish Beauty handles personal data, including product referrals, the selling business, and Instagram and Meta connections.",
        },
        "updated": {
            "ja": "最終更新日：2026年11月7日",
            "en": "Last updated: November 7, 2026",
        },
        "crumb": {"ja": "プライバシーポリシー", "en": "Privacy Policy"},
        "h1": {"ja": "プライバシーポリシー", "en": "Privacy Policy"},
        "sub": {
            "ja": "本サイトで取得する情報の取扱いについて",
            "en": "How we handle information collected on this site",
        },
    },
    "customer-policies.html": {
        "prefix": "policies",
        "doc_title": {
            "ja": "配送・返品・支払い・価格について – EMR-TEK",
            "en": "Shipping, Returns, Payment & Pricing – EMR-TEK",
        },
        "doc_desc": {
            "ja": "配送、返品、支払い、価格は購入先の販売事業者が定めます。The Establish Beauty はこれらの業務を行いません。",
            "en": "The selling business sets shipping, returns, payment, and price. The Establish Beauty does not perform those services.",
        },
        "updated": {
            "ja": "最終更新日：2026年11月7日",
            "en": "Last updated: November 7, 2026",
        },
        "crumb": {
            "ja": "配送・返品・支払い・価格",
            "en": "Shipping, Returns, Payment & Pricing",
        },
        "h1": {
            "ja": "配送・返品・支払い・価格について",
            "en": "Shipping, Returns, Payment & Pricing",
        },
        "sub": {
            "ja": "配送・返品・支払い・価格は、購入先の事業者が行います",
            "en": "The business you buy from handles shipping, returns, payment, and price",
        },
    },
}


def extract_body(html: str) -> str:
    m = re.search(
        r'<div data-i18n="emr\.legal\.[^"]+\.body" data-i18n-html>\s*([\s\S]*?)\s*</div>\s*</div>\s*</section>',
        html,
    )
    if m:
        return m.group(1).strip()
    m = re.search(
        r'<div class="panel prose legalDoc">\s*<p class="legalMeta">[^<]*</p>([\s\S]*?)</div>\s*</section>',
        html,
    )
    if not m:
        raise ValueError("legalDoc body not found")
    return m.group(1).strip()


def load_en_body(prefix: str) -> str:
    path = ROOT / "scripts" / "legal-i18n-en" / f"{prefix}.html"
    return path.read_text(encoding="utf-8").strip()


def build_messages() -> dict[str, dict[str, str]]:
    ja: dict[str, str] = {}
    en: dict[str, str] = {}

    for key, val in COMMON.items():
        ja[key] = val["ja"]
        en[key] = val["en"]

    for fname, cfg in PAGES.items():
        html = (ROOT / fname).read_text(encoding="utf-8")
        prefix = cfg["prefix"]
        p = f"emr.legal.{prefix}"
        ja[f"{p}.doc.title"] = cfg["doc_title"]["ja"]
        en[f"{p}.doc.title"] = cfg["doc_title"]["en"]
        ja[f"{p}.doc.desc"] = cfg["doc_desc"]["ja"]
        en[f"{p}.doc.desc"] = cfg["doc_desc"]["en"]
        ja[f"{p}.crumb"] = cfg["crumb"]["ja"]
        en[f"{p}.crumb"] = cfg["crumb"]["en"]
        ja[f"{p}.hero.h1"] = cfg["h1"]["ja"]
        en[f"{p}.hero.h1"] = cfg["h1"]["en"]
        ja[f"{p}.hero.sub"] = cfg["sub"]["ja"]
        en[f"{p}.hero.sub"] = cfg["sub"]["en"]
        if "updated" in cfg:
            ja[f"{p}.updated"] = cfg["updated"]["ja"]
            en[f"{p}.updated"] = cfg["updated"]["en"]
        ja[f"{p}.body"] = extract_body(html)
        en[f"{p}.body"] = load_en_body(prefix)

    return {"ja": ja, "en": en}


def write_messages_js(messages: dict[str, dict[str, str]]) -> None:
    out = ROOT / "i18n-legal-messages.js"
    payload = json.dumps(messages, ensure_ascii=False, indent=2)
    out.write_text(
        "/** Legal policy page strings — loaded before i18n.js */\n"
        "(function (g) {\n"
        f"  g.__LEGAL_I18N__ = {payload};\n"
        "})(typeof window !== 'undefined' ? window : globalThis);\n",
        encoding="utf-8",
    )
    print(f"wrote {out.name}")


def patch_i18n_js() -> None:
    path = ROOT / "i18n.js"
    text = path.read_text(encoding="utf-8")
    block = """  if (typeof window !== "undefined" && window.__LEGAL_I18N__) {
    Object.assign(MESSAGES.ja, window.__LEGAL_I18N__.ja || {});
    Object.assign(MESSAGES.en, window.__LEGAL_I18N__.en || {});
  }
"""
    if "__LEGAL_I18N__" in text:
        print("i18n.js already merges __LEGAL_I18N__")
        return
    needle = """  if (typeof window !== "undefined" && window.__CATALOG_I18N__) {
    Object.assign(MESSAGES.ja, window.__CATALOG_I18N__.ja || {});
    Object.assign(MESSAGES.en, window.__CATALOG_I18N__.en || {});
  }
"""
    if needle not in text:
        raise ValueError("CATALOG merge block not found")
    path.write_text(text.replace(needle, needle + "\n" + block), encoding="utf-8")
    print("patched i18n.js")


def inject_scripts(html: str) -> str:
    if "i18n-legal-messages.js" in html:
        return html
    target = '<script src="./i18n.js" defer></script>'
    insert = '    <script src="./i18n-legal-messages.js"></script>\n      '
    return html.replace(target, insert + target, 1)


def patch_page(fname: str, cfg: dict) -> None:
    path = ROOT / fname
    html = path.read_text(encoding="utf-8")
    prefix = cfg["prefix"]
    marker = f'data-i18n="emr.legal.{prefix}.hero.h1"'
    if marker in html:
        print(f"skip {fname} (already patched)")
        return

    p = f"emr.legal.{prefix}"
    html = inject_scripts(html)

    html = re.sub(
        r"<title>[^<]+</title>",
        f'<title data-i18n-title="{p}.doc.title">{cfg["doc_title"]["ja"]}</title>',
        html,
        count=1,
    )
    html = re.sub(
        r'(<meta\s+name="description"\s+)content="([^"]+)"',
        rf'\1data-i18n-desc="{p}.doc.desc" content="\2"',
        html,
        count=1,
    )

    html = html.replace(
        '<div class="breadcrumbs" aria-label="パンくず">',
        f'<div class="breadcrumbs" data-i18n-attr="aria-label:emr.legal.breadcrumb.aria" aria-label="パンくず">',
        1,
    )
    html = html.replace(
        '<a href="./index.html">ホーム</a>',
        f'<a href="./index.html" data-i18n="emr.common.breadcrumb.home">ホーム</a>',
        1,
    )

    crumb = cfg["crumb"]["ja"]
    html = html.replace(
        f'<span aria-current="page">{crumb}</span>',
        f'<span aria-current="page" data-i18n="{p}.crumb">{crumb}</span>',
        1,
    )

    h1 = cfg["h1"]["ja"]
    html = html.replace(
        f'<h1 class="h1">{h1}</h1>',
        f'<h1 class="h1" data-i18n="{p}.hero.h1">{h1}</h1>',
        1,
    )

    sub = cfg["sub"]["ja"]
    html = re.sub(
        rf'(<h1 class="h1" data-i18n="{re.escape(p)}\.hero\.h1">[^<]+</h1>\s*)<p class="subtle">\s*{re.escape(sub)}\s*</p>',
        rf'\1<p class="subtle" data-i18n="{p}.hero.sub">\n                {sub}\n              </p>',
        html,
        count=1,
    )

    html = re.sub(
        r'(<div class="panel prose legalDoc">\s*)<p class="legalMeta">[^<]*</p>',
        rf'\1<p class="legalMeta" data-i18n="emr.legal.updated">最終更新日：2026年4月11日</p>\n          <div data-i18n="{p}.body" data-i18n-html>',
        html,
        count=1,
    )
    html = re.sub(
        r"(</div>\s*</section>\s*</main>)",
        r"          </div>\n        \1",
        html,
        count=1,
    )

    html = html.replace(
        "<p>輸入EC・ドロップシッピングによるウェルネス製品のご提供。</p>",
        '<p data-i18n="emr.legal.footer.tagline">輸入EC・ドロップシッピングによるウェルネス製品のご提供。</p>',
        1,
    )

    path.write_text(html, encoding="utf-8")
    print(f"patched {fname}")


def main() -> None:
    messages = build_messages()
    write_messages_js(messages)
    patch_i18n_js()
    for fname, cfg in PAGES.items():
        patch_page(fname, cfg)


if __name__ == "__main__":
    main()
