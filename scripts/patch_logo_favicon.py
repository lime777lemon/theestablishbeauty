#!/usr/bin/env python3
"""Set site brand text and favicon across HTML pages."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FAVICON_BLOCK = """\
    <link rel="shortcut icon" href="/favicon.ico?v=17" />
    <link rel="icon" href="/favicon.ico?v=17" sizes="48x48" />
    <link rel="icon" href="/assets/favicon-48.png?v=17" type="image/png" sizes="48x48" />
    <link rel="icon" href="/assets/favicon-32.png?v=17" type="image/png" sizes="32x32" />
    <link rel="icon" href="/assets/favicon-16.png?v=17" type="image/png" sizes="16x16" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=17" />"""

OLD_HEADER_LOGO = re.compile(
    r"""<img\s+
      class="establishBrand__logo--header"\s+
      src="\{prefix\}assets/emr-tek-logo\.png"\s+
      width="\d+"\s+
      height="\d+"\s+
      decoding="async"\s+
      data-i18n-attr="alt:emr\.brand\.logoAlt"\s+
      alt="[^"]*"\s*
      />""",
    re.VERBOSE | re.MULTILINE,
)

NEW_LOGO_TEXT = """<img
              class="establishBrand__logo--header"
              src="{prefix}assets/site-logo.png"
              width="84"
              height="32"
              decoding="async"
              data-i18n-attr="alt:teb.brand.logoAlt"
              alt="The Establish Beauty"
            />"""


def asset_prefix(path: Path) -> str:
    rel = path.relative_to(ROOT)
    depth = len(rel.parts) - 1
    return "../" * depth if depth else "./"


def patch_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    prefix = asset_prefix(path)

    if "assets/favicon.svg" not in text and "<head>" in text:
        marker = '<meta name="color-scheme" content="light" />'
        if marker in text and "favicon.ico" not in text:
            text = text.replace(marker, marker + "\n" + FAVICON_BLOCK, 1)

    text = OLD_HEADER_LOGO.sub(NEW_LOGO_TEXT, text)

    if text == original:
        return False
    path.write_text(text, encoding="utf-8")
    return True


def main() -> None:
    changed = 0
    for path in sorted(ROOT.glob("**/*.html")):
        if "node_modules" in path.parts or "stripe-connect-sinatra" in path.parts:
            continue
        if patch_file(path):
            changed += 1
            print("patched", path.relative_to(ROOT))
    print(f"done: {changed} files")


if __name__ == "__main__":
    main()
