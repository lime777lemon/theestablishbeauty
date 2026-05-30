#!/usr/bin/env python3
"""Replace local product-*.html links with EMR-TEK affiliate product URLs."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNOWBALL = "YUKI03417"

FILE_TO_ID = {
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

HANDLES = {
    "firewave-compact": "firewave",
    "firefly-portable": "firefly-1",
    "eterno-mask": "eterno-mask",
    "inferno-fullbody": "inferno",
    "inferno-pro-fullbody": "inferno-pro-red-and-near-infrared-light",
    "firehawk-fullbody": "firehawk",
    "firedragon-pro-panel": "firedragon-pro-red-and-near-infrared-light",
    "firewave-pro": "firewave-pro-300-watts-red-and-near-infrared-light",
    "emr-light-stand": "stand",
    "heavy-duty-stand": "heavy-duty-stand",
    "electronic-premium-stand": "electronic-premium-stand",
    "freya-glasses": "freya",
    "nyx-glasses": "nyx",
    "odin-magnesium-glasses": "odin",
    "athena-24k-glasses": "athena",
    "ares-aviator-glasses": "ares",
    "apollo-glasses": "apollo",
    "anubis-glasses": "anubis",
    "skoll-glasses": "skoll",
    "atlas-glasses": "atlas",
    "valkyrie-glasses": "valkyrie",
    "nova-kids-glasses": "nova",
    "krypton-uv-606w": "krypton-uv-500w-1400w",
    "krypton-uv-1612w": "krypton-uv-1612w",
    "krypton-mini-pro": "krypton-mini-pro-cob-intergration",
    "krypton-micro-portable": "krypton-micro",
    "krypton-floor-stand": "krpyton-floor-stand",
    "ultron-fullbody": "ultron-patent-pending",
    "firedragon": "firedragon",
    "firestorm-pro": "firestorm-pro",
}


def official_url(product_id: str) -> str:
    handle = HANDLES.get(product_id, product_id)
    return f"https://www.emr-tek.com/products/{handle}?snowball={SNOWBALL}"


def patch_html(text: str) -> tuple[str, int]:
    def sub_href(m: re.Match[str]) -> str:
        filename = m.group(1)
        product_id = FILE_TO_ID.get(filename)
        if not product_id:
            return m.group(0)
        return f'href="{official_url(product_id)}"'

    new_text, n = re.subn(r'href="\./(product-[^"]+\.html)"', sub_href, text)
    return new_text, n


def ensure_external_attrs(text: str) -> str:
    """Add target/rel to affiliate product links when missing."""
    for product_id in FILE_TO_ID.values():
        url = official_url(product_id)
        pattern = rf'(<a\b[^>]*href="{re.escape(url)}")(?![^>]*\btarget=)([^>]*>)'
        text = re.sub(
            pattern,
            rf'\1 target="_blank" rel="noopener noreferrer" data-product-id="{product_id}"\2',
            text,
        )
    return text


def main() -> None:
    targets = sorted(ROOT.glob("*.html"))
    total = 0
    for path in targets:
        if not path.exists():
            continue
        original = path.read_text(encoding="utf-8")
        updated, n = patch_html(original)
        updated = ensure_external_attrs(updated)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"{path.name}: {n} links")
            total += n
    print(f"done ({total} links updated)")


if __name__ == "__main__":
    main()
