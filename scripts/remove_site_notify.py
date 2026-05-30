#!/usr/bin/env python3
"""Remove site-wide under-construction notification banner from HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FULL = re.compile(
    r'\n\s*<div\s*\n\s*class="siteNotify"[\s\S]*?\n    </div>\n',
    re.MULTILINE,
)
MINIMAL = re.compile(
    r"\s*<div class=\"siteNotify siteNotify--minimal\"[\s\S]*?</div>\s*\n",
    re.MULTILINE,
)


def remove(text: str) -> tuple[str, bool]:
    new = FULL.sub("\n", text)
    new = MINIMAL.sub("", new)
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
