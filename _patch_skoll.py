# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path("/Users/ikedayuunoriko/redlight/product-skoll-glasses.html")
s = p.read_text(encoding="utf-8")

AN = "\u30a2\u30cc\u30d3\u30b9"
SK = "\u30b9\u30b1\u30eb"
SK_GL = SK + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd"

old_poster = "https://emr-tek.com/cdn/shop/files/preview_images/b78a57e532474c43976d9eeab734b703.thumbnail.0000000000_800x.jpg?v=1735928618"
new_poster = "https://emr-tek.com/cdn/shop/files/preview_images/a24dd1e1b8d942978d29f3265e906158.thumbnail.0000000000_800x.jpg?v=1735588985"
old_vid = "https://emr-tek.com/cdn/shop/videos/c/vp/b78a57e532474c43976d9eeab734b703/b78a57e532474c43976d9eeab734b703.HD-1080p-7.2Mbps-40480392.mp4?v=0"
new_vid = "https://emr-tek.com/cdn/shop/videos/c/vp/a24dd1e1b8d942978d29f3265e906158/a24dd1e1b8d942978d29f3265e906158.HD-1080p-7.2Mbps-40325074.mp4?v=0"

s = s.replace(old_poster, new_poster)
s = s.replace(old_vid, new_vid)
s = s.replace("anubis-media-stage", "skoll-media-stage")

s = re.sub(
    r"<title>.*?</title>",
    "<title>" + SK + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd \u2013 EMR-TEK</title>",
    s,
    count=1,
)

old_meta = (
    'content="' + AN
    + "\uff08\u30a2\u30eb\u30df\u30cb\u30a6\u30e0\u30d5\u30ec\u30fc\u30e0\uff09\u306e\u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u5bfe\u7b56\u30e1\u30ac\u30cd\u3002\u30c7\u30a4\u30bf\u30a4\u30e0\uff0f\u30ca\u30a4\u30c8\u30ec\u30f3\u30ba\u3001\u30e1\u30e9\u30ce\u30d7\u30b7\u30f3\u751f\u7269\u5b66\u306b\u57fa\u3065\u3044\u305f2\u30ec\u30f3\u30ba\u30b7\u30b9\u30c6\u30e0\u3001\u500d\u7387\u30fbPD\u9078\u629e\u306b\u5bfe\u5fdc\u3002EMR-TEK\u516c\u5f0f\u60c5\u5831\u3092\u65e5\u672c\u8a9e\u3067\u6574\u7406\u3057\u305f\u7d39\u4ecb\u30da\u30fc\u30b8\u3067\u3059\u3002\""
)
new_meta = (
    "content=\""
    + SK
    + "\uff08\u9162\u9178\u30d5\u30ec\u30fc\u30e0\u30fb\u30b9\u30b3\u30fc\u30eb\u7cfb\uff09\u306e\u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u5bfe\u7b56\u30e1\u30ac\u30cd\u3002\u30af\u30ea\u30a2\u30ec\u30f3\u30ba\u3001SINGLE VISION\u51e6\u65b9\u3001PD\u9078\u629e\u3001\u30e1\u30e9\u30ce\u30d7\u30b7\u30f3\u57fa\u306e2\u30ec\u30f3\u30ba\u30b7\u30b9\u30c6\u30e0\u3002EMR-TEK\u516c\u5f0f\u60c5\u5831\u3092\u65e5\u672c\u8a9e\u3067\u6574\u7406\u3057\u305f\u7d39\u4ecb\u30da\u30fc\u30b8\u3067\u3059\u3002\""
)
if old_meta not in s:
    raise SystemExit("meta not found")
s = s.replace(old_meta, new_meta, 1)

s = s.replace('<span aria-current="page">' + AN + "</span>", '<span aria-current="page">' + SK + "</span>", 1)

s = s.replace(
    "<h1 class=\"h1\">" + AN + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd</h1>",
    "<h1 class=\"h1\">" + SK + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd</h1>",
    1,
)

s = s.replace("aria-label=\"" + AN + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd\"", "aria-label=\"" + SK_GL + "\"")
s = s.replace("alt=\"" + AN + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\u30d6\u30ed\u30c3\u30ad\u30f3\u30b0\u30e1\u30ac\u30cd\"", "alt=\"" + SK_GL + "\"")

s = s.replace(
    """            <div class="tags" aria-label="\u7279\u5fb4">
              <span class="tag">\u773c\u93e1</span>
              <span class="tag">\u30c7\u30a4\u30bf\u30a4\u30e0\u773c\u93e1</span>
              <span class="tag">\u30d6\u30eb\u30fc\u30e9\u30a4\u30c8</span>
            </div>""",
    """            <div class="tags" aria-label="\u7279\u5fb4">
              <span class="tag">\u773c\u93e1</span>
              <span class="tag">\u30af\u30ea\u30a2\u30ec\u30f3\u30ba</span>
              <span class="tag">\u30d6\u30eb\u30fc\u30e9\u30a4\u30c8</span>
            </div>""",
    1,
)

old_price = """            <div class="price price--lg" aria-label="\u4fa1\u683c">
              <div>
                <div class="micro subtle">\u8ca9\u58f2\u4fa1\u683c</div>
                <div class="price__now">\xa516,270</div>
              </div>
              <div>
                <div class="micro subtle">\u901a\u5e38\u4fa1\u683c</div>
                <div class="price__was">\xa521,152</div>
              </div>
              <div class="save">\u4fdd\u5b58 \xa54,882</div>
            </div>"""

new_price = """            <div class="price price--lg" aria-label="\u4fa1\u683c">
              <div>
                <div class="micro subtle">\u8ca9\u58f2\u4fa1\u683c</div>
                <div class="price__now">\xa532,542</div>
              </div>
            </div>"""

if old_price not in s:
    raise SystemExit("price block not found")
s = s.replace(old_price, new_price, 1)

old_opts = """              <label class="field" style="margin: 0">
                <span class="micro subtle">\u30b9\u30bf\u30a4\u30eb</span>
                <select id="anubis-style" name="style" autocomplete="off">
                  <option value="aluminum" selected>\u30a2\u30eb\u30df\u30cb\u30a6\u30e0\u30d5\u30ec\u30fc\u30e0</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u8272</span>
                <select id="anubis-lens-color" name="lensColor" autocomplete="off">
                  <option value="yellow" selected>\u30a4\u30a8\u30ed\u30fc\uff08\u30c7\u30a4\u30bf\u30a4\u30e0\uff09</option>
                  <option value="red">\u8d64\u30ec\u30f3\u30ba\uff08\u30ca\u30a4\u30c8\uff09</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u500d\u7387\u4ed5\u69d8</span>
                <select id="anubis-magnification" name="magnification" autocomplete="off">
                  <option value="plain" selected>\u306a\u3057\uff08\u30d7\u30ec\u30fc\u30f3\u30ec\u30f3\u30ba\uff09</option>
                  <option value="125">+1.25\uff08\u30ea\u30fc\u30c7\u30a3\u30f3\u30b0\uff09</option>
                  <option value="200">+2.00\uff08\u30ea\u30fc\u30c7\u30a3\u30f3\u30b0\uff09</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u77b3\u5b54\u8ddd\u96e2</span>
                <select id="anubis-pd" name="pd">
                  <option value="" selected>\u9078\u629e\u3055\u308c\u3066\u3044\u307e\u305b\u3093</option>
                  <option value="54">54mm</option>
                  <option value="56">56mm</option>
                  <option value="58">58mm</option>
                  <option value="60">60mm</option>
                  <option value="62">62mm</option>
                  <option value="64">64mm</option>
                </select>
              </label>"""

new_opts = """              <label class="field" style="margin: 0">
                <span class="micro subtle">\u30b9\u30bf\u30a4\u30eb</span>
                <select id="skoll-style" name="style" autocomplete="off">
                  <option value="acetate" selected>\u9162\u9178\u30d5\u30ec\u30fc\u30e0\uff08\u30b9\u30b3\u30fc\u30eb\uff09</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u30ec\u30f3\u30ba\u30ab\u30e9\u30fc</span>
                <select id="skoll-lens-color" name="lensColor" autocomplete="off">
                  <option value="clear" selected>\u30af\u30ea\u30a2</option>
                  <option value="yellow">\u30a4\u30a8\u30ed\u30fc\uff08\u30c7\u30a4\u30bf\u30a4\u30e0\uff09</option>
                  <option value="red">\u8d64\u30ec\u30f3\u30ba\uff08\u30ca\u30a4\u30c8\uff09</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u62e1\u5927\u3068\u4ed5\u69d8</span>
                <select id="skoll-magnification" name="magnification" autocomplete="off">
                  <option value="single-vision" selected>SINGLE VISION\uff08\u51e6\u65b9\u8ddd\u96e2\u307e\u305f\u306f\u30ab\u30b9\u30bf\u30e0\u8001\u773c\u93e1\uff09</option>
                  <option value="">\u9078\u629e\u3055\u308c\u3066\u3044\u307e\u305b\u3093</option>
                </select>
              </label>

              <label class="field" style="margin: 0">
                <span class="micro subtle">\u77b3\u5b54\u8ddd\u96e2</span>
                <select id="skoll-pd" name="pd">
                  <option value="" selected>\u9078\u629e</option>
                  <option value="54">54mm</option>
                  <option value="56">56mm</option>
                  <option value="58">58mm</option>
                  <option value="60">60mm</option>
                  <option value="62">62mm</option>
                  <option value="64">64mm</option>
                </select>
              </label>"""

if old_opts not in s:
    raise SystemExit("opts not found")
s = s.replace(old_opts, new_opts, 1)

s = s.replace('data-add-id="anubis-glasses"', 'data-add-id="skoll-glasses"', 1)

s = s.replace("EMR-TEK \u306b\u3088\u308b ANUBIS", "EMR-TEK\u306b\u3088\u308b" + SK, 1)

s = s.replace("aria-label=\"" + AN + " \u30d5\u30ec\u30fc\u30e0\u4ed5\u69d8\u8868\"", "aria-label=\"" + SK + " \u30d5\u30ec\u30fc\u30e0\u4ed5\u69d8\u8868\"", 1)

s = s.replace("https://emr-tek.com/en-jp/products/anubis", "https://emr-tek.com/en-jp/products/skoll", 1)

s = s.replace("placeholder=\"\u4f8b\uff1a" + AN + " / \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\"", "placeholder=\"\u4f8b\uff1a" + SK + " \u30d6\u30eb\u30fc\u30e9\u30a4\u30c8\"", 1)

s = s.replace(
    "<strong>\u663c\u9593\u306e\u30e1\u30ac\u30cd</strong>: \u30a8\u30cd\u30eb\u30ae\u30fc\u3068\u899a\u9192\u306e\u305f\u3081\u306b\u81ea\u7136\u306a\u9752\u8272\u5149\u3092\u8a31\u53ef\u3057\u306a\u304c\u3089\u3001\u5c4b\u5185\u3067\u904e\u526a\u306a\u9752\u8272\u5149\u3092\u30d6\u30ed\u30c3\u30af\u3059\u308b\u3053\u3068\u3092\u5f37\u8abf\u3057\u307e\u3059\uff08\u4e00\u65e5\u4e2d\u753b\u9762\u4e0a\u306b\u3042\u308b\u5834\u5408\u306f\u663c\u9593\u306e\u30e1\u30ac\u30cd\u304c\u4f7f\u7528\u3055\u308c\u307e\u3059\uff09\u3001400\u2013450nm\u3092\u30d6\u30ed\u30c3\u30af\u3057\u3001\u4e00\u822c\u7684\u306a\u9752\u8272\u306e90%\u3001\u76ee\u306e\u4e0b\u306e\u30af\u30de\u3092\u6e1b\u3089\u3057\u307e\u3059\u3002",
    "<strong>\u663c\u9593\u306e\u30e1\u30ac\u30cd</strong>\uff1a\u30a8\u30cd\u30eb\u30ae\u30fc\u3068\u899a\u9192\u306e\u305f\u3081\u306b\u81ea\u7136\u306a\u9752\u8272\u5149\u3092\u8a31\u53ef\u3057\u306a\u304c\u3089\u3001\u5c4b\u5185\u3067\u904e\u526a\u306a\u9752\u8272\u5149\u3092\u30d6\u30ed\u30c3\u30af\u3059\u308b\u3053\u3068\u3092\u5f37\u8abf\u3057\u307e\u3059\uff08\u4e00\u65e5\u4e2d\u753b\u9762\u4e0a\u306b\u3042\u308b\u5834\u5408\u306f\u663c\u9593\u306e\u30e1\u30ac\u30cd\u304c\u4f7f\u7528\u3055\u308c\u307e\u3059\uff09\u3001400-450nm\u3092\u30d6\u30ed\u30c3\u30af\u3057\u3001\u4e00\u822c\u7684\u306a\u9752\u8272\u306e90%\u3001\u76ee\u306e\u4e0b\u306e\u30af\u30de\u3092\u6e1b\u3089\u3057\u307e\u3059\u3002",
    1,
)
s = s.replace(
    "<strong>\u591c\u9593</strong>: \u30e1\u30ac\u30cd\u306e\u8d64\u3044\u30ec\u30f3\u30ba\u3092\u52b9\u679c\u7684\u306b\u30e1\u30e9\u30c8\u30cb\u30f3\u4fdd\u5b58\u3057\u3001\u9752\u3044\u5468\u6ce2\u6570\uff08400\u2013570nm\uff09\u3092\u5b8c\u5168\u306b\u30d6\u30ed\u30c3\u30af\u3059\u308b\u305f\u3081\u306b\u4fc3\u9032\u3057\u307e\u3059\u3002",
    "<strong>\u591c\u9593</strong>\uff1a\u30e1\u30ac\u30cd\u306e\u8d64\u3044\u30ec\u30f3\u30ba\u3092\u52b9\u679c\u7684\u306b\u30e1\u30e9\u30c8\u30cb\u30f3\u4fdd\u5b58\u3057\u3001\u9752\u3044\u5468\u6ce2\u6570 (400-570nm\uff09\u3092\u5b8c\u5168\u306b\u30d6\u30ed\u30c3\u30af\u3059\u308b\u305f\u3081\u306b\u4fc3\u9032\u3057\u307e\u3059\u3002",
    1,
)

s = re.sub(r'\./app\.js\?v=\d+"', './app.js?v=20260519"', s, count=1)

p.write_text(s, encoding="utf-8")
print("html ok")
