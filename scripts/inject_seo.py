#!/usr/bin/env python3
"""Add seo-config.js and seo.mjs to storefront HTML pages."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEAD_SNIPPET = '    <script src="./seo-config.js"></script>\n'
BODY_SNIPPET = '    <script type="module" src="./seo.mjs"></script>\n'

SKIP = {
    "stripe-connect-sinatra/frontend/index.html",
}


def patch_file(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in SKIP:
        return False

    text = path.read_text(encoding="utf-8")
    changed = False

    if "seo-config.js" not in text and "<head>" in text:
        text = text.replace("<head>", "<head>\n" + HEAD_SNIPPET, 1)
        changed = True

    if "seo.mjs" not in text and "snowball-affiliate.mjs" in text:
        text = text.replace(
            '<script type="module" src="./snowball-affiliate.mjs"></script>',
            BODY_SNIPPET + '    <script type="module" src="./snowball-affiliate.mjs"></script>',
            1,
        )
        changed = True
    elif "seo.mjs" not in text and "</body>" in text:
        text = text.replace("</body>", BODY_SNIPPET + "  </body>", 1)
        changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
    return changed


def main() -> None:
    paths = sorted(ROOT.glob("*.html")) + sorted((ROOT / "auth").glob("*.html"))
    updated = [p for p in paths if patch_file(p)]
    print(f"Updated {len(updated)} files")


if __name__ == "__main__":
    main()
