#!/usr/bin/env python3
"""Add data-i18n to EMR-TEK footer disclaimer blocks site-wide."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PATCHED = """          <div class="micro subtle"><p data-i18n="emr.footer.disclaimer1" data-i18n-html><strong>重要な注意事項</strong>:
              赤色および赤外線治療装置、青色遮光メガネ、その他の製品に関してこのサイトで提供されるすべての情報は、
              病気の診断、治療、治癒、予防を目的としたものではありません。当社の製品は医療機器と誤解されるべきではなく、
              治療上の主張も行いません。これらの製品は、2015 年 1 月 20 日に発表された
              “General Wellness: Policy on Low Risk Devices”草案に従って、FDA の認可を必要としない低リスクの
              一般的なウェルネス/フィットネス アイテムです。当社の製品は個人使用のみを目的としており、
              商業用途を目的としたものではありません。
            </p>
            <p data-i18n="emr.footer.disclaimer2">
              ※ これらの記述は食品医薬品局によって評価されていません。この製品は、病気の診断、治療、治癒、予防を目的としたものではありません。
            </p>
          </div>"""

DISCLAIMER_BLOCK = re.compile(
    r'<div class="micro subtle">.*?</div>\s*(?=<div class="micro subtle">Toronto)',
    re.DOTALL,
)


def patch_html(html: str) -> tuple[str, bool]:
    changed = False
    if "emr.index.footer.disclaimer1" in html or "emr.index.footer.disclaimer2" in html:
        html = html.replace("emr.index.footer.disclaimer1", "emr.footer.disclaimer1")
        html = html.replace("emr.index.footer.disclaimer2", "emr.footer.disclaimer2")
        changed = True

    if 'data-i18n="emr.footer.disclaimer1"' in html:
        return html, changed

    if "重要な注意事項" not in html or 'class="footer__brand">EMR-TEK' not in html:
        return html, changed

    m = DISCLAIMER_BLOCK.search(html)
    if not m:
        return html, changed

    new_html = html[: m.start()] + PATCHED + "\n          " + html[m.end() :]
    return new_html, True


def main() -> None:
    changed_files = []
    for path in sorted(ROOT.glob("*.html")):
        text = path.read_text(encoding="utf-8")
        new_text, did = patch_html(text)
        if did and new_text != text:
            path.write_text(new_text, encoding="utf-8")
            changed_files.append(path.name)
    print("patched:", len(changed_files), "files")
    if changed_files:
        print(", ".join(changed_files[:20]), ("..." if len(changed_files) > 20 else ""))


if __name__ == "__main__":
    main()
