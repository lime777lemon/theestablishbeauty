# -*- coding: utf-8 -*-
from pathlib import Path

p = Path("/Users/ikedayuunoriko/redlight/product-inferno-pro.html")
lines = p.read_text(encoding="utf-8").splitlines(keepends=True)

# Line numbers are 1-based as seen in editor; convert to 0-based index
def idx(n):
    return n - 1

# Remove stock block lines 221-224 (blank225)
del lines[idx(221) : idx(226)]

# Prose is now at ~241-258 (shifted by 5). Find by content.
prose_i = None
for i, L in enumerate(lines):
    if L.strip() == '<div class="prose">' and i + 1 < len(lines) and "EMR-TEKのInferno PRO" in lines[i + 1]:
        prose_i = i
        break
if prose_i is None:
    raise SystemExit("prose start not found")

depth = 0
prose_end = None
for j in range(prose_i, len(lines)):
    if '<div class="prose">' in lines[j]:
        depth = 1
        continue
    if lines[j].strip().startswith("<div"):
        depth += 1
    if lines[j].strip() == "</div>":
        depth -= 1
        if depth == 0:
            prose_end = j
            break
if prose_end is None:
    raise SystemExit("prose end not found")

prose_block = lines[prose_i : prose_end + 1]
del lines[prose_i : prose_end + 1]

# Insert prose after price outer close (search save line)
save_i = None
for i, L in enumerate(lines):
    if "保存" in L and "81,359" in L:
        save_i = i
        break
if save_i is None:
    raise SystemExit("save")
outer_close = save_i + 2
if lines[outer_close].strip() != "</div>":
    raise SystemExit("outer")
insert_at = outer_close + 1
lines[insert_at:insert_at] = ["\n"] + prose_block + ["\n"]

for i, L in enumerate(lines):
    if L == '            <div class="field" style="margin: 0">\n':
        lines[i] = '            <div class="field" style="margin: 0.75rem 0 0">\n'
        break

for i, L in enumerate(lines):
    if i > 0 and L.strip() == "</div>" and "productPage__actions" in lines[i - 3]:
        lines[i + 1 : i + 1] = [
            "\n",
            '            <p class="micro subtle" style="margin-top: 0.75rem">\n',
            "              1つ入すると30%オフになります！！（カートで割引が適用されます）\n",
            "            </p>\n",
        ]
        break
else:
    raise SystemExit("actions")

for i, L in enumerate(lines):
    if L.strip() == "</div>" and i >= 1 and "badgeCard" in lines[i - 1]あり" in lines[i - 1]:
        extra = [
            "\n",
            '            <div class="stock" aria-label" style="margin-top: 0.75rem">\n',
            '              <span class="stock__dot" aria-hidden="true"></span>\n',
            "              <span><あり</strong>（すぐに発送）</span>\n",
            "            </div>\n",
            "\n",
            '            <p class="micro subtle" style="margin: 0.35rem 0繁に売り切れます</p>\n',
            "\n",
            '            <p class="micro subtle" style="margin: 0.75rem 0 0">\n',
            "              このランプで使用するために電子プレミアムスタンド入する予定がある場合は、イン��ェルノと電子プレミアムスタンドを<strong>同じ注文</strong入する必要がありますに製造する必要があるため）。後から電子プレミアムスタンドだけを��入すると、イン��ェルノランプと<strong>互換性がありません</strong>。\n",
            "            </p>\n",
            "\n",
        ]
        lines[i + 1 : i + 1] = extra
        break
else:
    raise SystemExit("badges")

# Manuals: last </details> before buy panel closes
idx = None
for i in range(len(lines) - 1):
    if "</details>" in lines[i] and lines[i + 1].strip() == "</div>":
        idx = i
if idx is None:
    raise SystemExit("tail")
manuals = [
    "\n",
    '            <div class="productPage__manuals prose micro" style="margin-top: 1rem" aria-label="マニュアル">\n',
    '              <p class="micro subtle" style="margin: 0 0 6px">マニュアル</p>\n',
    '              <p style="margin: 0 0 8px">\n',
    "                <a class=\"link\" href=\"https://emr-tek.com/en-jp/products/inferno-pro-red-and-near-infrared-light\" target=\"_blank\" rel=\"noopener noreferrer\">フルユーザーマニュアルをダウン��ード</a>\n",
    "              </p>\n",
    '              <p style="margin: 0">\n',
    "                <a class=\"link\" href=\"https://emr-tek.com/en-jp/products/inferno-pro-red-and-near-infrared-light\" target=\"_blank\" rel=\"noopener noreferrer\">Inferno PRO - 赤および近赤外線ライト マニュアルをダウン��ード</a>\n",
    "              </p>\n",
    "            </div>\n",
]
lines[idx + 1 : idx + 1] = manuals

text = "".join(lines)
text = text.replace(
    "<li>LEDのみで5分から開始</li>",
    "<li>LEDのみで 5 分から開始</li>",
    1,
)
text = text.replace(
    "<li>時間の経過とともに、セッションあたり 20 分に増加します</li>",
    "<li>時間の経過とともにセッションあたり 20 分に増加します</li>",
    1,
)
text = text.replace(
   に最大5回使用してください</li>",
   �に最大 5 回使用してください</li>",
    1,
)
text = text.replace(
    '<details class="productPage__detail" open>\n',
    '<details class="productPage__detail" open style="margin-top: 1rem">\n',
    1,
)
text = text.replace('src="./app.js?v=20260412"', 'src="./app.js?v=20260413"', 1)

p.write_text(text, encoding="utf-8")
print("layout merged")
