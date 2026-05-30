#!/usr/bin/env python3
"""Add product-page i18n hooks to static product HTML files."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PRODUCT_ID_BY_FILE = {
    "product-firewave-compact.html": "firewave-compact",
    "product-emr-light-stand.html": "emr-light-stand",
    "product-eterno.html": "eterno-mask",
    "product-firedragon.html": "firedragon",
    "product-freya.html": "freya-glasses",
    "product-inferno.html": "inferno-fullbody",
    "product-firewave-pro.html": "firewave-pro",
    "product-firefly.html": "firefly-portable",
    "product-nyx.html": "nyx-glasses",
    "product-odin-magnesium.html": "odin-magnesium-glasses",
    "product-athena-24k.html": "athena-24k-glasses",
    "product-ares-aviator.html": "ares-aviator-glasses",
    "product-apollo.html": "apollo-glasses",
    "product-firedragon-pro.html": "firedragon-pro-panel",
    "product-anubis-glasses.html": "anubis-glasses",
    "product-skoll-glasses.html": "skoll-glasses",
    "product-inferno-pro.html": "inferno-pro-fullbody",
    "product-krypton-uv-606w.html": "krypton-uv-606w",
    "product-electronic-premium-stand.html": "electronic-premium-stand",
    "product-heavy-duty-stand.html": "heavy-duty-stand",
    "product-atlas-glasses.html": "atlas-glasses",
    "product-valkyrie-glasses.html": "valkyrie-glasses",
    "product-krypton-uv-1612w.html": "krypton-uv-1612w",
    "product-nova-kids-glasses.html": "nova-kids-glasses",
    "product-krypton-mini-pro.html": "krypton-mini-pro",
    "product-firestorm-pro.html": "firestorm-pro",
    "product-krypton-micro-portable.html": "krypton-micro-portable",
    "product-krypton-floor-stand.html": "krypton-floor-stand",
    "product-firehawk.html": "firehawk-fullbody",
    "product-ultron.html": "ultron-fullbody",
}


def patch_file(path: Path, product_id: str) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    if 'src="./i18n-catalog-messages.js"' not in text:
        text = text.replace(
            '<script src="./i18n.js" defer></script>',
            '<script src="./i18n-catalog-messages.js"></script>\n      <script src="./i18n.js" defer></script>',
        )

    if "data-product-static" not in text:
        text = re.sub(
            r'(<div class="productPage")>',
            rf'\1 data-product-static data-product-id="{product_id}">',
            text,
            count=1,
        )
        text = re.sub(
            r'(<div class="productPage" data-product-static data-product-id="' + re.escape(product_id) + r'")\s*\n',
            rf'\1>\n',
            text,
            count=1,
        )

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = 0
    for filename, product_id in PRODUCT_ID_BY_FILE.items():
        path = ROOT / filename
        if not path.exists():
            print(f"skip missing: {filename}")
            continue
        if patch_file(path, product_id):
            changed += 1
            print(f"patched: {filename}")

    product_html = ROOT / "product.html"
    if product_html.exists():
        text = product_html.read_text(encoding="utf-8")
        if 'src="./i18n-catalog-messages.js"' not in text:
            text = text.replace(
                '<script src="./i18n.js" defer></script>',
                '<script src="./i18n-catalog-messages.js"></script>\n      <script src="./i18n.js" defer></script>',
            )
            product_html.write_text(text, encoding="utf-8")
            changed += 1
            print("patched: product.html")

    print(f"done ({changed} files)")


if __name__ == "__main__":
    main()
