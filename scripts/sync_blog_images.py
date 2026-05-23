#!/usr/bin/env python3
"""Download EMR-TEK blog hero images into assets/blog/ from live article og:image URLs."""

from __future__ import annotations

import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "blog"

POSTS = [
    ("post1-skin-plastic.webp", "are-you-truly-giving-your-skin-what-it-deserves-or-weighing-it-down-with-plastic"),
    ("post2-uv-light.png", "can-humans-see-ultraviolet-light"),
    ("post3-red-light-lungs.png", "how-to-use-red-light-therapy-for-lungs"),
    ("post4-365-vs-395.png", "365-vs-395-uv-light"),
    ("post5-uvb-light.png", "what-is-uvb-light"),
    ("post6-textured-skin.png", "how-to-get-rid-of-textured-skin"),
]

OG_RE = re.compile(r'property="og:image"\s+content="([^"]+)"')


def fetch_og_image(slug: str) -> str:
    url = f"https://emr-tek.com/en-jp/blogs/news/{slug}"
    with urllib.request.urlopen(url) as res:
        html = res.read().decode("utf-8", "ignore")
    match = OG_RE.search(html)
    if not match:
        raise RuntimeError(f"og:image not found for {slug}")
    return match.group(1).replace("http://", "https://")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, slug in POSTS:
        img_url = fetch_og_image(slug)
        if "width=" not in img_url:
            img_url += ("&" if "?" in img_url else "?") + "width=1072"
        dest = OUT / filename
        with urllib.request.urlopen(img_url) as res:
            dest.write_bytes(res.read())
        print(f"saved {dest.name} <- {img_url}")


if __name__ == "__main__":
    main()
