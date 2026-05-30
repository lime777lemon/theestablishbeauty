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
        "ja": "輸入EC・ドロップシッピングによるウェルネス製品のご提供。",
        "en": "Wellness products via import e-commerce and dropshipping.",
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
            "ja": "特定商取引法に基づく表記 — 販売業者、代金、配送、返品等（輸入EC・ドロップシッピング）。",
            "en": "Legal seller disclosures — pricing, shipping, returns (import e-commerce & dropshipping).",
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
            "ja": "通信販売（輸入EC・ドロップシッピング）に関する表示",
            "en": "Disclosures for online sales (import e-commerce & dropshipping)",
        },
    },
    "terms.html": {
        "prefix": "terms",
        "doc_title": {
            "ja": "利用規約 – EMR-TEK",
            "en": "Terms of Service – EMR-TEK",
        },
        "doc_desc": {
            "ja": "EMR-TEK 利用規約 — 輸入EC・ドロップシッピング、支払い、配送、返品等について。",
            "en": "EMR-TEK Terms — import e-commerce, dropshipping, payment, shipping, returns, and more.",
        },
        "crumb": {"ja": "利用規約", "en": "Terms of Service"},
        "h1": {"ja": "利用規約", "en": "Terms of Service"},
        "sub": {
            "ja": "本サイトのご利用条件（輸入EC・ドロップシッピング）",
            "en": "Terms of use for this site (import e-commerce & dropshipping)",
        },
    },
    "privacy.html": {
        "prefix": "privacy",
        "doc_title": {
            "ja": "プライバシーポリシー – EMR-TEK",
            "en": "Privacy Policy – EMR-TEK",
        },
        "doc_desc": {
            "ja": "EMR-TEK の個人情報の取扱い、輸入EC・ドロップシッピングに伴う第三者提供等について。",
            "en": "How EMR-TEK handles personal data, including sharing for import e-commerce and dropshipping.",
        },
        "crumb": {"ja": "プライバシーポリシー", "en": "Privacy Policy"},
        "h1": {"ja": "プライバシーポリシー", "en": "Privacy Policy"},
        "sub": {
            "ja": "輸入EC・ドロップシッピングにおける個人情報の取扱いについて",
            "en": "Personal data handling for import e-commerce and dropshipping",
        },
    },
    "customer-policies.html": {
        "prefix": "policies",
        "doc_title": {
            "ja": "配送・返品・支払い・価格について – EMR-TEK",
            "en": "Shipping, Returns, Payment & Pricing – EMR-TEK",
        },
        "doc_desc": {
            "ja": "配送ポリシー（海外発送・所要日数・関税）、返品・返金、お支払い方法、価格表示について。",
            "en": "Shipping (international delivery, timelines, duties), returns, payment methods, and pricing.",
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
            "ja": "輸入EC・海外発送を前提としたご案内",
            "en": "Guidance for import e-commerce and international shipping",
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
