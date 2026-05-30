#!/usr/bin/env python3
"""Add seo-config.js and seo.mjs to storefront HTML pages."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "seo-config.js"
HEAD_SNIPPET = '    <script src="./seo-config.js"></script>\n'
BODY_SNIPPET = '    <script type="module" src="./seo.mjs"></script>\n'
GSC_META_RE = re.compile(
    r'\n\s*<meta name="google-site-verification" content="[^"]*" />\n',
    re.IGNORECASE,
)

SKIP = {
    "stripe-connect-sinatra/frontend/index.html",
}


def read_google_verification() -> str:
    if not CONFIG.is_file():
        return ""
    text = CONFIG.read_text(encoding="utf-8")
    m = re.search(r'googleSiteVerification:\s*"([^"]*)"', text)
    return m.group(1).strip() if m else ""


def sync_google_verification(text: str, code: str) -> str:
    text = GSC_META_RE.sub("\n", text)
    if not code:
        return text
    meta = f'    <meta name="google-site-verification" content="{code}" />\n'
    if HEAD_SNIPPET.strip() in text:
        return text.replace(HEAD_SNIPPET, HEAD_SNIPPET + meta, 1)
    if "<head>" in text:
        return text.replace("<head>", "<head>\n" + meta, 1)
    return text


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


def sync_index_verification() -> bool:
    code = read_google_verification()
    index = ROOT / "index.html"
    if not index.is_file():
        return False
    text = index.read_text(encoding="utf-8")
    updated = sync_google_verification(text, code)
    if updated == text:
        return False
    index.write_text(updated, encoding="utf-8")
    return True


def main() -> None:
    paths = sorted(ROOT.glob("*.html")) + sorted((ROOT / "auth").glob("*.html"))
    updated = [p for p in paths if patch_file(p)]
    if sync_index_verification():
        print("Synced google-site-verification meta on index.html")
    print(f"Updated {len(updated)} files")


if __name__ == "__main__":
    main()
