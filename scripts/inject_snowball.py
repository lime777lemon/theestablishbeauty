#!/usr/bin/env python3
"""Inject Social Snowball config (head) and affiliate module (before </body>)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_MARK = "snowball-config.js"
MODULE_MARK = "snowball-affiliate.mjs"

HEAD_SNIPPET_ROOT = '    <script src="./snowball-config.js"></script>\n'
HEAD_SNIPPET_AUTH = '    <script src="../snowball-config.js"></script>\n'

BODY_AFTER_ROOT = (
    '    <script type="module" src="./video-analytics.mjs"></script>\n'
    '    <script type="module" src="./snowball-affiliate.mjs"></script>'
)
BODY_AFTER_AUTH = (
    '    <script type="module" src="../video-analytics.mjs"></script>\n'
    '    <script type="module" src="../snowball-affiliate.mjs"></script>'
)
BODY_FALLBACK_ROOT = (
    '    <script type="module" src="./analytics.mjs"></script>\n'
    '    <script type="module" src="./snowball-affiliate.mjs"></script>'
)
BODY_FALLBACK_AUTH = (
    '    <script type="module" src="../analytics.mjs"></script>\n'
    '    <script type="module" src="../snowball-affiliate.mjs"></script>'
)


def inject_head(text: str, snippet: str) -> tuple[str, bool]:
    if CONFIG_MARK in text:
        return text, False
    needle = '<meta charset="UTF-8" />'
    if needle not in text:
        return text, False
    return text.replace(needle, needle + "\n" + snippet, 1), True


def inject_body(text: str, *, auth: bool) -> tuple[str, bool]:
    if MODULE_MARK in text:
        return text, False
    if auth:
        for needle, repl in (
            ('<script type="module" src="../video-analytics.mjs"></script>', BODY_AFTER_AUTH),
            ('<script type="module" src="../analytics.mjs"></script>', BODY_FALLBACK_AUTH),
        ):
            if needle in text:
                return text.replace(needle, repl, 1), True
    else:
        for needle, repl in (
            ('<script type="module" src="./video-analytics.mjs"></script>', BODY_AFTER_ROOT),
            ('<script type="module" src="./analytics.mjs"></script>', BODY_FALLBACK_ROOT),
        ):
            if needle in text:
                return text.replace(needle, repl, 1), True
    if "</body>" not in text.lower():
        return text, False
    mod = '    <script type="module" src="../snowball-affiliate.mjs"></script>\n' if auth else (
        '    <script type="module" src="./snowball-affiliate.mjs"></script>\n'
    )
    return re.sub(r"</body>", mod + "  </body>", text, count=1, flags=re.IGNORECASE), True


def main() -> None:
    head_n = body_n = 0
    paths = sorted(ROOT.glob("*.html"))
    paths += sorted((ROOT / "auth").glob("*.html"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        auth = path.parent.name == "auth"
        text, h = inject_head(text, HEAD_SNIPPET_AUTH if auth else HEAD_SNIPPET_ROOT)
        text, b = inject_body(text, auth=auth)
        if h or b:
            path.write_text(text, encoding="utf-8")
            if h:
                head_n += 1
            if b:
                body_n += 1
    print(f"head: {head_n}, body: {body_n}")


if __name__ == "__main__":
    main()
