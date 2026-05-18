#!/usr/bin/env python3
"""Insert site-wide under-construction notification banner after skip-link (or after <body>)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP = {
    "emr-tek.html",
}

BANNER = """    <div
      class="siteNotify"
      role="region"
      data-i18n-attr="aria-label:emr.siteNotify.aria"
      aria-label="サイト構築のお知らせ"
    >
      <div class="container siteNotify__inner">
        <p class="siteNotify__text" data-i18n="emr.siteNotify.text">現在Webサイト構築中</p>
      </div>
    </div>
"""

BANNER_MINIMAL = """    <div class="siteNotify siteNotify--minimal" role="status" aria-label="サイト構築のお知らせ">
      <p class="siteNotify__text">現在Webサイト構築中 · Website currently under construction</p>
    </div>
"""


def inject(text: str, minimal: bool = False) -> tuple[str, bool]:
    if 'class="siteNotify"' in text:
        return text, False
    banner = BANNER_MINIMAL if minimal else BANNER
    skip = re.search(r'(<a class="skip-link"[^>]*>[\s\S]*?</a>\s*)', text)
    if skip:
        pos = skip.end()
        return text[:pos] + "\n" + banner + "\n" + text[pos:], True
    body = re.search(r"(<body[^>]*>\s*)", text, re.IGNORECASE)
    if body:
        pos = body.end()
        return text[:pos] + banner + "\n" + text[pos:], True
    return text, False


def patch_file(path: Path) -> bool:
    if path.name in SKIP:
        return False
    text = path.read_text(encoding="utf-8")
    minimal = "styles.css" not in text
    new_text, ok = inject(text, minimal=minimal)
    if not ok or new_text == text:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    paths: list[Path] = sorted(ROOT.glob("*.html"))
    paths += sorted((ROOT / "auth").glob("*.html"))
    changed = []
    for p in paths:
        if patch_file(p):
            changed.append(str(p.relative_to(ROOT)))
    print("Updated:", len(changed))
    for n in changed:
        print(" ", n)


if __name__ == "__main__":
    main()
