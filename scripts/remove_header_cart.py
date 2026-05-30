#!/usr/bin/env python3
"""Remove header cart icon button from EMR storefront HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CART_BTN = re.compile(
    r'\n\s*<button class="icon-btn" type="button" data-action="open-cart"[\s\S]*?</button>',
    re.MULTILINE,
)


def remove(text: str) -> tuple[str, bool]:
    new = CART_BTN.sub("", text)
    return new, new != text


def patch_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    new_text, ok = remove(text)
    if not ok:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    paths: list[Path] = sorted(ROOT.glob("*.html"))
    paths += sorted((ROOT / "auth").glob("*.html"))
    changed = [str(p.relative_to(ROOT)) for p in paths if patch_file(p)]
    print("Updated:", len(changed))
    for name in changed:
        print(" ", name)


if __name__ == "__main__":
    main()
