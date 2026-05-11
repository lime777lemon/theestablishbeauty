# -*- coding: utf-8 -*-
"""Reorder Inferno PRO buy column; ASCII-only source except strings read from HTML."""
import re
from pathlib import Path

p = Path("/Users/ikedayuunoriko/redlight/product-inferno-pro.html")
t = p.read_text(encoding="utf-8")

stock_pat = re.compile(
    r"\n            <div class=\"stock\" aria-label=\"[^\"]+\">\n"
    r"              <span class=\"stock__dot\" aria-hidden=\"true\"></span>\n"
    r"              <span><strong>在��あり</strong>（すぐに発送）</span>\n"
    r"            </div>\n",
    re.MULTILINE,
)
m_stock = stock_pat.search(t)
if not m_stock:
    raise SystemExit("early stock block not found")
t = t[: m_stock.start()] + t[m_stock.end() :]

prose_m = re.search(
    r"( <div class=\"prose\">\n(?:.*\n)*?            </div>\n)",
    t,
)
if not prose_m:
    raise SystemExit("prose not found")
prose = prose_m.group(1)
t = t.replace(prose, "", 1)

price_close = re.search(
    r"(              <div class=\"save\">保存 ��81,359</div>\n            </div>\n\n)",
    t,
)
if not price_close:
    raise SystemExit("price close not found")
t = t.replace(price_close.group(1), price_close.group(1) + prose, 1)

t = t.replace(
    '            <div class="field" style="margin: 0">\n',
    '            <div class="field" style="margin: 0.75rem 0 0">\n',
    1,
)

actions_close = re.search(
    r"(            <div class=\"productPage__actions\">\n"
    r"              <button class=\"btn\" type=\"button\" data-add-id=\"inferno-pro-fullbody\">カートに追加</button>\n"
    r"              <button class=\"btn btn--ghost\" type=\"button\" data-action=\"open-cart\">カートを見る</button>\n"
    r"            </div>\n)\n",
    t,
)
if not actions_close:
    raise SystemExit("actions not found")
pct = (
    actions_close.group(1)
    + "\n"
    + '            <p class="micro subtle" style="margin-top: 0.75rem">\n'
    + "              1つ��入すると30%オフになります！！（カートで割引が適用されます）\n"
    + "            </p>\n"
)
t = t.replace(actions_close.group(0), pct + "\n", 1)

badges_close = re.search(
    r"(              <div class=\"badgeCard\">在��あり</div>\n            </div>\n)\n",
    t,
)
if not badges_close:
    raise SystemExit("badges not found")
extra = (
    badges_close.group(1)
    + "\n"
    + '            <div class="stock" aria-label="在��状��" style="margin-top: 0.75rem">\n'
    + '              <span class="stock__dot" aria-hidden="true"></span>\n'
    + "              <span><�あり</strong>（すぐに発送）</span>\n"
    + "            </div>\n"
    + "\n"
    + '            <p class="micro subtle" style="margin: 0.35rem 0 0">��繁に売り切れます</p>\n'
    + "\n"
    + '            <p class="micro subtle" style="margin: 0.75rem 0 0">\n'
    + "              このランプで使用するために電子プレミアムスタンドを��入する予定がある場合は、イン��ェルノと電子プレミアムスタンドを<strong>同じ注文</strong>で��入する必要があります（一��に製造する必要があるため）。後から電子プレミアムスタ�入すると、イン��ェルノランプと<strong>互換性がありません</strong>。\n"
    + "            </p>\n"
)
t = t.replace(badges_close.group(0), extra + "\n", 1)

details_tail = re.search(r"(            </details>\n)(            </div>\n </div>\n      </section>)", t)
if not details_tail:
    raise SystemExit("details tail not found")
manuals = (
    "\n"
    '            <div class="productPage__manuals prose micro" style="margin-top: 1rem" aria-label="マニュアル">\n'
    '              <p class="micro subtle" style="margin: 0 0 6px">マニュアル</p>\n'
    '              <p style="margin: 0 0 8px">\n'
    "                <a\n"
    '                  class="link"\n'
    '                  href="https://emr-tek.com/en-jp/products/inferno-pro-red-and-near-infrared-light"\n'
    '                  target="_blank"\n'
    '                  rel="noopener noreferrer"\n'
    "                  >フルユーザーマニュアルをダウン��ード</a\n"
    "                >\n"
    "              </p>\n"
    '              <p style="margin: 0">\n'
    "                <a\n"
    '                  class="link"\n'
    '                  href="https://emr-tek.com/en-jp/products/inferno-pro-red-and-near-infrared-light"\n'
    '                  target="_blank"\n'
    '                  rel="noopener noreferrer"\n'
    "                  >Inferno PRO - 赤および近赤外線ライト マニュアル�ード</a\n"
    "                >\n"
    "              </p>\n"
    "            </div>\n"
)
t = t.replace(
    details_tail.group(0),
    details_tail.group(1) + manuals + details_tail.group(2),
    1,
)

t = t.replace(
    "<li>LEDのみで5分から開始</li>",
    "<li>LEDのみで 5 分から開始</li>",
    1,
)
t = t.replace(
    "<li>時間の経過とともに、セッションあたり 20 分に増加します</li>",
    "<li>時間の経過とともにセッションあたり 20 分に増加します</li>",
    1,
)
t = t.replace(
    "<li>��に最大5回使用してください</li>",
   �に最大 5 回使用してください</li>",
    1,
)

t = t.replace(
    '<details class="productPage__detail" open>\n',
    '<details class="productPage__detail" open style="margin-top: 1rem">\n',
    1,
)

t = t.replace('src="./app.js?v=20260412"', 'src="./app.js?v=20260413"', 1)

p.write_text(t, encoding="utf-8")
print("reorder done")
