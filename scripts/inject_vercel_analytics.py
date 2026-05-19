#!/usr/bin/env python3
"""Inject Vercel Web Analytics module script before </body> on all site HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKER = 'src="./analytics.mjs"'
MARKER_AUTH = 'src="../analytics.mjs"'

SNIPPET_ROOT = '    <script type="module" src="./analytics.mjs"></script>\n'
SNIPPET_AUTH = '    <script type="module" src="../analytics.mjs"></script>\n'


def inject(text: str, snippet: str) -> tuple[str, bool]:
    if MARKER in text or MARKER_AUTH in text:
        return text, False
    if "</body>" not in text.lower():
        return text, False
    return re.sub(r"</body>", snippet + "  </body>", text, count=1, flags=re.IGNORECASE), True


def main() -> None:
    changed: list[str] = []
    paths = sorted(ROOT.glob("*.html"))
    paths += sorted((ROOT / "auth").glob("*.html"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        snippet = SNIPPET_AUTH if path.parent.name == "auth" else SNIPPET_ROOT
        new_text, ok = inject(text, snippet)
        if ok:
            path.write_text(new_text, encoding="utf-8")
            changed.append(str(path.relative_to(ROOT)))
    print("Updated:", len(changed))
    for name in changed:
        print(" ", name)


if __name__ == "__main__":
    main()
