#!/usr/bin/env python3
"""Inject video-analytics.mjs after analytics.mjs on all site HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKER = "video-analytics.mjs"

SNIPPET_AFTER_ROOT = (
    '    <script type="module" src="./analytics.mjs"></script>\n'
    '    <script type="module" src="./video-analytics.mjs"></script>'
)
SNIPPET_AFTER_AUTH = (
    '    <script type="module" src="../analytics.mjs"></script>\n'
    '    <script type="module" src="../video-analytics.mjs"></script>'
)


def patch(text: str, *, auth: bool) -> tuple[str, bool]:
    if MARKER in text:
        return text, False
    needle = (
        '<script type="module" src="../analytics.mjs"></script>'
        if auth
        else '<script type="module" src="./analytics.mjs"></script>'
    )
    replacement = SNIPPET_AFTER_AUTH if auth else SNIPPET_AFTER_ROOT
    if needle not in text:
        return text, False
    return text.replace(needle, replacement, 1), True


def main() -> None:
    changed: list[str] = []
    paths = sorted(ROOT.glob("*.html"))
    paths += sorted((ROOT / "auth").glob("*.html"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        new_text, ok = patch(text, auth=path.parent.name == "auth")
        if ok:
            path.write_text(new_text, encoding="utf-8")
            changed.append(str(path.relative_to(ROOT)))
    print("Updated:", len(changed))
    for name in changed:
        print(" ", name)


if __name__ == "__main__":
    main()
