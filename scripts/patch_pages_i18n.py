#!/usr/bin/env python3
"""Patch collection-all, science, blog, and faq HTML for i18n (one-time)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))

from generate_pages_i18n import MESSAGES  # noqa: E402
from i18n_shop_patch import apply_shop_section  # noqa: E402

J = MESSAGES["ja"]


def R(html: str, old: str, new: str) -> str:
    if old not in html:
        raise ValueError(f"patch miss ({len(old)} chars):\n{old[:240]}")
    return html.replace(old, new, 1)


def inject_scripts(html: str) -> str:
    if "i18n-pages-messages.js" in html:
        return html
    target = '<script src="./i18n.js" defer></script>'
    if target not in html:
        raise ValueError("i18n.js script tag not found")
    insert = (
        '<script src="./i18n-index-messages.js"></script>\n'
        '    <script src="./i18n-pages-messages.js"></script>\n'
        "      "
    )
    return html.replace(target, insert + target, 1)


def patch_doc_head(html: str, title_key: str, title_text: str, desc_key: str) -> str:
    html = R(
        html,
        f"<title>{title_text}</title>",
        f'<title data-i18n-title="{title_key}">{title_text}</title>',
    )
    html = re.sub(
        r'(<meta\s+name="description"\s+)content="([^"]+)"',
        rf'\1data-i18n-desc="{desc_key}" content="\2"',
        html,
        count=1,
    )
    return html


def apply_learn_trust_sections(html: str) -> str:
    html = R(
        html,
        '<h2 id="learn-heading-all" class="h2">赤色光セラピーのメリットを学ぶ</h2>',
        '<h2 id="learn-heading-all" class="h2" data-i18n="emr.index.learn.title">赤色光セラピーのメリットを学ぶ</h2>',
    )
    html = R(
        html,
        '<a class="btn btn--ghost" href="./blog.html" aria-label="すべての記事">すべての記事</a>',
        '<a class="btn btn--ghost" href="./blog.html" data-i18n-attr="aria-label:emr.index.learn.allPostsAria" aria-label="すべての記事" data-i18n="emr.index.learn.allPosts">すべての記事</a>',
    )
    learn_posts = [
        (
            "肌に本当に必要なものは？— プラスチックの“重さ”を見直す",
            "emr.index.learn.post1.title",
            "従来のLEDマスクは密着型。快適性と使い勝手のトレードオフをどう考えるか…",
            "emr.index.learn.post1.desc",
        ),
        (
            "人は紫外線を見られる？見えない光の謎",
            "emr.index.learn.post2.title",
            "可視光の外側にある紫外線。見えない波長が私たちに与える影響を探ります。",
            "emr.index.learn.post2.desc",
        ),
        (
            '赤色光を“肺”に使うには：ステップ別ガイド',
            "emr.index.learn.post3.title",
            "赤色光・近赤外の活用は広がっています。安全に楽しむための基本手順を紹介。",
            "emr.index.learn.post3.desc",
        ),
    ]
    for title, tk, desc, dk in learn_posts:
        html = html.replace(
            f'<h3 class="post__title">\n                    {title}\n                  </h3>',
            f'<h3 class="post__title" data-i18n="{tk}">\n                    {title}\n                  </h3>',
            1,
        )
        html = html.replace(
            f'<p class="post__desc">\n                    {desc}\n                  </p>',
            f'<p class="post__desc" data-i18n="{dk}">\n                    {desc}\n                  </p>',
            1,
        )
    html = html.replace(
        'aria-label="続きを読む"',
        'data-i18n-attr="aria-label:emr.index.learn.readMoreAria" aria-label="続きを読む"',
    )
    html = html.replace('>続きを読む</a', ' data-i18n="emr.index.learn.readMore">続きを読む</a')
    html = R(
        html,
        '<section class="collectionAll__trust" aria-label="サービスと安心">',
        '<section class="collectionAll__trust" data-i18n-attr="aria-label:emr.index.trust.aria" aria-label="サービスと安心">',
    )
    trust = [
        ("カスタマーサポート", "emr.index.trust.support.title", "ご不明点はいつでもお問い合わせください。チームがサポートします。", "emr.index.trust.support.body"),
        ("送料について", "emr.index.trust.shipping.title", "一定金額以上のご注文で送料無料になる場合があります（地域・キャンペーンにより異なります）。", "emr.index.trust.shipping.body"),
        ("お友だち紹介", "emr.index.trust.referral.title", "紹介プログラムにより双方に割引がある場合があります（公式の案内に準拠）。", "emr.index.trust.referral.body"),
        ("安全なお支払い", "emr.index.trust.payment.title", "決済情報は暗号化され安全に処理されます。", "emr.index.trust.payment.body"),
    ]
    trust = [
        ("カスタマーサポート", "emr.index.trust.support.title", "ご不明点はいつでもお問い合わせください。チームがサポートします。", "emr.index.trust.support.body"),
        ("送料について", "emr.index.trust.shipping.title", "一定金額以上のご注文で送料無料になる場合があります（地域・キャンペーンにより異なります）。", "emr.index.trust.shipping.body"),
        ("お友だち紹介", "emr.index.trust.referral.title", "紹介プログラムにより双方に割引がある場合があります（公式の案内に準拠）。", "emr.index.trust.referral.body"),
        ("安全なお支払い", "emr.index.trust.payment.title", "決済情報は暗号化され安全に処理されます。", "emr.index.trust.payment.body"),
    ]
    for tt, tk, body, bk in trust:
        html = html.replace(
            f'<div class="collectionAll__trustTitle">{tt}</div>',
            f'<div class="collectionAll__trustTitle" data-i18n="{tk}">{tt}</div>',
            1,
        )
    for tt, tk, body, bk in trust:
        multiline = f'<p class="micro subtle">\n                    {body}\n                  </p>'
        if multiline in html:
            html = html.replace(
                multiline,
                f'<p class="micro subtle" data-i18n="{bk}">\n                    {body}\n                  </p>',
                1,
            )
        else:
            html = html.replace(
                f'<p class="micro subtle">{body}</p>',
                f'<p class="micro subtle" data-i18n="{bk}">{body}</p>',
                1,
            )
    html = R(
        html,
        '<p class="micro subtle collectionAll__cert">認証の例: FCC / RoHS / CE（製品により異なります）</p>',
        '<p class="micro subtle collectionAll__cert" data-i18n="emr.index.trust.cert">認証の例: FCC / RoHS / CE（製品により異なります）</p>',
    )
    return html

def patch_collection_all(html: str) -> str:
    html = patch_doc_head(
        html,
        "emr.collection.doc.title",
        J["emr.collection.doc.title"],
        "emr.collection.doc.desc",
    )
    html = R(
        html,
        '<a href="./index.html">コレクション</a>',
        f'<a href="./index.html" data-i18n="emr.collection.breadcrumb.parent">{J["emr.collection.breadcrumb.parent"]}</a>',
    )
    html = R(
        html,
        '<span aria-current="page">全商品</span>',
        f'<span aria-current="page" data-i18n="emr.collection.breadcrumb.current">{J["emr.collection.breadcrumb.current"]}</span>',
    )
    html = R(
        html,
        '<h1 class="h1">全商品</h1>',
        f'<h1 class="h1" data-i18n="emr.collection.hero.h1">{J["emr.collection.hero.h1"]}</h1>',
    )
    html = R(
        html,
        """              <p class="subtle">
                公式ストアの「All Products」と同様、一覧のほかカテゴリ別のおすすめや学習記事までこのページにまとめています。フィルター・並べ替え・キーワード検索に対応します。
              </p>""",
        f"""              <p class="subtle" data-i18n="emr.collection.hero.sub">
                {J["emr.collection.hero.sub"]}
              </p>""",
    )
    html = apply_shop_section(html)
    html = apply_learn_trust_sections(html)
    html = R(
        html,
        """            <p>
              <strong>重要な注意事項</strong>:
              赤色および赤外線治療装置、青色遮光メガネ、その他の製品に関してこのサイトで提供されるすべての情報は、
              病気の診断、治療、治癒、予防を目的としたものではありません。
            </p>""",
        """            <p data-i18n="emr.collection.footer.disclaimer" data-i18n-html>
              <strong>重要な注意事項</strong>:
              赤色および赤外線治療装置、青色遮光メガネ、その他の製品に関してこのサイトで提供されるすべての情報は、
              病気の診断、治療、治癒、予防を目的としたものではありません。
            </p>""",
    )
    html = R(
        html,
        '<li><a class="link" href="./collection-all.html">全商品</a></li>',
        f'<li><a class="link" href="./collection-all.html" data-i18n="emr.index.footer.allProducts">{J["emr.collection.breadcrumb.current"]}</a></li>',
    )
    return html



def T(html: str, key: str, old: str, new: str) -> str:
    t = J[key]
    return R(html, old.format(t=t, k=key), new.format(t=t, k=key))


def patch_science(html: str) -> str:
    html = patch_doc_head(
        html,
        "emr.science.doc.title",
        J["emr.science.doc.title"],
        "emr.science.doc.desc",
    )
    html = T(
        html,
        "emr.common.breadcrumb.home",
        '<a href="./index.html">{t}</a>',
        '<a href="./index.html" data-i18n="{k}">{t}</a>',
    )
    html = T(
        html,
        "emr.science.breadcrumb.current",
        '<span aria-current="page">{t}</span>',
        '<span aria-current="page" data-i18n="{k}">{t}</span>',
    )
    html = T(
        html,
        "emr.science.hero.kicker",
        '<p class="scienceHero__kicker">{t}</p>',
        '<p class="scienceHero__kicker" data-i18n="{k}">{t}</p>',
    )
    html = T(
        html,
        "emr.science.hero.h1",
        '<h1 class="scienceHero__title">{t}</h1>',
        '<h1 class="scienceHero__title" data-i18n="{k}">{t}</h1>',
    )
    html = T(
        html,
        "emr.science.hero.lead",
        '<p class="subtle scienceHero__lead">\n                {t}\n              </p>',
        '<p class="subtle scienceHero__lead" data-i18n="{k}">\n                {t}\n              </p>',
    )
    html = R(
        html,
        '<div class="kpis" aria-label="要点">',
        '<div class="kpis" data-i18n-attr="aria-label:emr.science.kpi.aria" aria-label="要点">',
    )
    for key, cls in [
        ("emr.science.kpi.mechanism.label", "kpi__label"),
        ("emr.science.kpi.mechanism.value", "kpi__value"),
        ("emr.science.kpi.factors.label", "kpi__label"),
        ("emr.science.kpi.factors.value", "kpi__value"),
        ("emr.science.kpi.dose.label", "kpi__label"),
        ("emr.science.kpi.dose.value", "kpi__value"),
    ]:
        html = T(html, key, f'<div class="{cls}">{{t}}</div>', f'<div class="{cls}" data-i18n="{{k}}">{{t}}</div>')
    html = T(html, "emr.science.mechanisms.h2", '<h2 class="h2">{t}</h2>', '<h2 class="h2" data-i18n="{k}">{t}</h2>')
    html = R(
        html,
        """          <p>
            赤色光とNIR（近赤外）光はミトコンドリアのシトクロムcオキシダーゼ（複合体IV）に吸収され、
            <strong>ATP産生が増加</strong>します。細胞エネルギーは多くの生理機能の下流を駆動します。
            これは理論ではなく、PubMedで公開された6,000件以上の研究で再現されています。
          </p>""",
        f"""          <p data-i18n="emr.science.mechanisms.p1" data-i18n-html>
            {J["emr.science.mechanisms.p1"]}
          </p>""",
    )
    html = R(
        html,
        """          <p>
            2つ目の同時メカニズムとして、光は酵素から一酸化窒素を光解離し、酵素を解放して
            <strong>局所的な血管拡張剤</strong>として機能します。結果として治療された組織への血流が増加します。
            1つのセッションで2つの効果が重なります。
          </p>""",
        f"""          <p data-i18n="emr.science.mechanisms.p2" data-i18n-html>
            {J["emr.science.mechanisms.p2"]}
          </p>""",
    )
    html = T(
        html,
        "emr.science.callout.title",
        '<div class="callout__title">{t}</div>',
        '<div class="callout__title" data-i18n="{k}">{t}</div>',
    )
    html = T(
        html,
        "emr.science.callout.body",
        '<div class="callout__body">\n              {t}\n            </div>',
        '<div class="callout__body" data-i18n="{k}">\n              {t}\n            </div>',
    )
    html = T(
        html,
        "emr.science.wavelength.h2",
        '<h2 class="h2">{t}</h2>',
        '<h2 class="h2" data-i18n="{k}">{t}</h2>',
    )
    html = R(
        html,
        """          <p>
            シトクロムcオキシダーゼの吸収ピークは <strong>約630nm / 約670nm / 約830nm</strong> です。
            これは多くのパネルが採用する汎用的な660nm/850nmとは異なります。
          </p>""",
        f"""          <p data-i18n="emr.science.wavelength.p1" data-i18n-html>
            {J["emr.science.wavelength.p1"]}
          </p>""",
    )
    html = R(
        html,
        """          <p>
            組織に送達される放射照度（mW/cm²）は、ワット数ではなく<strong>線量</strong>を決定します。
            EMR-TEKのCOB（Chip-on-Board）テクノロジーは、標準SMDパネルの約200mW/cm²に対して、
            <strong>パネル面で1,400mW/cm²</strong>を実現します。この差が、現実的な距離での治療投与を可能にします。
          </p>""",
        f"""          <p data-i18n="emr.science.wavelength.p2" data-i18n-html>
            {J["emr.science.wavelength.p2"]}
          </p>""",
    )
    html = T(html, "emr.science.biphasic.h2", '<h2 class="h2">{t}</h2>', '<h2 class="h2" data-i18n="{k}">{t}</h2>')
    html = R(
        html,
        """          <p>
            光バイオモジュレーションは二相用量反応に従います。少なすぎると反応なし、適切な量で狙う効果、
            多すぎると同じ経路が阻害される可能性があります。放射照度、距離、セッション時間、一貫性はすべて重要です。
          </p>""",
        f"""          <p data-i18n="emr.science.biphasic.p1">
            {J["emr.science.biphasic.p1"]}
          </p>""",
    )
    html = R(
        html,
        """          <p>
            EMR-TEKデバイスは、高精度の波長、COB放射照度、サードパーティ検証済み出力を中心に構築されています。
            テクノロジーの差が、実際の結果と高価なプラセボを区別します。
          </p>""",
        f"""          <p data-i18n="emr.science.biphasic.p2">
            {J["emr.science.biphasic.p2"]}
          </p>""",
    )
    html = T(
        html,
        "emr.science.benefits.h2",
        '<h2 class="h2">{t}</h2>',
        '<h2 class="h2" data-i18n="{k}">{t}</h2>',
    )
    html = T(
        html,
        "emr.science.benefits.lead",
        '<p class="subtle micro">{t}</p>',
        '<p class="subtle micro" data-i18n="{k}">{t}</p>',
    )
    split_blocks = [
        (
            "emr.science.split.skin",
            "自宅でFirewaveを使っている女性",
            "皮膚とコラーゲン",
            ["li1", "li2", "li3"],
        ),
        (
            "emr.science.split.circulation",
            "",
            "循環と血流",
            ["li1", "li2", "li3"],
        ),
        (
            "emr.science.split.technology",
            "Firewaveをオンにして使用するゴージャスな女性",
            "実際に重要なテクノロジー",
            ["li1", "li2", "li3"],
        ),
        (
            "emr.science.split.sleep",
            "ベッドでインフェルノを使っている人",
            "睡眠と概日生物学",
            ["li1", "li2", "li3"],
        ),
    ]
    for prefix, alt, _h3, li_keys in split_blocks:
        if alt:
            html = html.replace(
                f'alt="{alt}"',
                f'data-i18n-attr="alt:{prefix}.imgAlt" alt="{alt}"',
                1,
            )
        key_h3 = f"{prefix}.h3"
        html = T(
            html,
            key_h3,
            '<h3 class="h3" style="margin-top: 12px">{t}</h3>',
            '<h3 class="h3" style="margin-top: 12px" data-i18n="{k}">{t}</h3>',
        )
        for lk in li_keys:
            key = f"{prefix}.{lk}"
            text = J[key]
            html = html.replace(
                f"<li>{text}</li>",
                f'<li data-i18n="{key}">{text}</li>',
                1,
            )
    html = T(
        html,
        "emr.science.cta.faq",
        '<a class="btn btn--ghost" href="./faq.html">{t}</a>',
        '<a class="btn btn--ghost" href="./faq.html" data-i18n="{k}">{t}</a>',
    )
    html = T(
        html,
        "emr.science.cta.contact",
        '<a class="btn" href="./contact.html">{t}</a>',
        '<a class="btn" href="./contact.html" data-i18n="{k}">{t}</a>',
    )
    return html


def patch_blog(html: str) -> str:
    html = patch_doc_head(
        html,
        "emr.blog.doc.title",
        J["emr.blog.doc.title"],
        "emr.blog.doc.desc",
    )
    html = T(
        html,
        "emr.common.breadcrumb.home",
        '<a href="./index.html">{t}</a>',
        '<a href="./index.html" data-i18n="{k}">{t}</a>',
    )
    html = T(
        html,
        "emr.blog.breadcrumb.current",
        '<span aria-current="page">{t}</span>',
        '<span aria-current="page" data-i18n="{k}">{t}</span>',
    )
    html = T(html, "emr.blog.hero.h1", '<h1 class="h1">{t}</h1>', '<h1 class="h1" data-i18n="{k}">{t}</h1>')
    html = T(
        html,
        "emr.blog.hero.sub",
        """              <p class="subtle">
                {t}
              </p>""",
        """              <p class="subtle" data-i18n="{k}">
                {t}
              </p>""",
    )
    html = T(
        html,
        "emr.blog.srOnly",
        '<h2 id="blog-heading" class="sr-only">{t}</h2>',
        '<h2 id="blog-heading" class="sr-only" data-i18n="{k}">{t}</h2>',
    )
    parts = html.split('<article class="blogCard">')
    if len(parts) != 7:
        raise ValueError(f"expected 6 blog cards, got {len(parts) - 1}")
    rebuilt = [parts[0]]
    for i, block in enumerate(parts[1:], start=1):
        title_key = f"emr.blog.post{i}.title"
        excerpt_key = f"emr.blog.post{i}.excerpt"
        block = block.replace(
            '<h3 class="blogCard__title">\n                  <a\n',
            f'<h3 class="blogCard__title">\n                  <a\n                    data-i18n="{title_key}"\n',
            1,
        )
        ex_m = re.search(r'<p class="blogCard__excerpt">\s*([\s\S]*?)\s*</p>', block)
        if not ex_m:
            raise ValueError(f"blog card {i}: excerpt missing")
        excerpt = ex_m.group(1).strip()
        block = block.replace(
            f'<p class="blogCard__excerpt">\n                  {excerpt}\n                </p>',
            f'<p class="blogCard__excerpt" data-i18n="{excerpt_key}">\n                  {excerpt}\n                </p>',
            1,
        )
        block = block.replace(
            ">続きを読む</a",
            ' data-i18n="emr.index.learn.readMore">続きを読む</a',
        )
        rebuilt.append(block)
    return '<article class="blogCard">'.join(rebuilt)


def patch_faq(html: str) -> str:
    html = patch_doc_head(
        html,
        "emr.faq.doc.title",
        J["emr.faq.doc.title"],
        "emr.faq.doc.desc",
    )
    html = T(
        html,
        "emr.common.breadcrumb.home",
        '<a href="./index.html">{t}</a>',
        '<a href="./index.html" data-i18n="{k}">{t}</a>',
    )
    html = T(
        html,
        "emr.faq.breadcrumb.current",
        '<span aria-current="page">{t}</span>',
        '<span aria-current="page" data-i18n="{k}">{t}</span>',
    )
    html = T(html, "emr.faq.hero.h1", '<h1 class="h1">{t}</h1>', '<h1 class="h1" data-i18n="{k}">{t}</h1>')
    html = T(
        html,
        "emr.faq.hero.sub",
        '<p class="subtle">{t}</p>',
        '<p class="subtle" data-i18n="{k}">{t}</p>',
    )
    for key in [
        "emr.faq.section.products.h2",
        "emr.faq.section.orders.h2",
        "emr.faq.section.shipping.h2",
        "emr.faq.section.other.h2",
    ]:
        html = T(html, key, '<h2 class="h2">{t}</h2>', '<h2 class="h2" data-i18n="{k}">{t}</h2>')
    for key in [
        "emr.faq.section.products.hint",
        "emr.faq.section.orders.hint",
        "emr.faq.section.shipping.hint",
        "emr.faq.section.other.hint",
    ]:
        html = T(html, key, '<p class="subtle micro">{t}</p>', '<p class="subtle micro" data-i18n="{k}">{t}</p>')
    for key in [
        "emr.faq.products.q1",
        "emr.faq.products.q2",
        "emr.faq.products.q3",
        "emr.faq.products.q4",
        "emr.faq.products.q5",
        "emr.faq.orders.q1",
        "emr.faq.orders.q2",
        "emr.faq.shipping.q1",
        "emr.faq.shipping.q2",
        "emr.faq.shipping.q3",
        "emr.faq.other.q1",
        "emr.faq.other.q2",
        "emr.faq.other.q3",
    ]:
        html = T(
            html,
            key,
            '<summary class="faq__q">{t}</summary>',
            '<summary class="faq__q" data-i18n="{k}">{t}</summary>',
        )
    html_answers = [
        ("emr.faq.products.a1", True, """                <p>
                  <strong>6〜12インチ</strong> の距離をお勧めします。感度と使用目標に応じて、ランプから最適な露出を実現します。
                </p>"""),
        ("emr.faq.products.a2", True, """                <p>
                  典型的なセッションは <strong>5〜15分</strong>（治療領域ごと）です。短いセッションから始めて、必要に応じて徐々に増やします。
                </p>"""),
        ("emr.faq.products.a3", True, """                <p>
                  はい。すべての電子機器と同様に、当社の照明は低周波電磁場（EMF）を放出します。ただし、必ずしもその場にさらされる必要はありません。
                  <strong>約5インチ（約13cm）以上</strong>の距離では、デバイスから実用的にEMFは検出されません。
                </p>"""),
        ("emr.faq.products.a4.p1", False, """                <p>
                  白熱灯を含むほぼすべての照明は、AC電源によって点滅します。LEDは、低品質のコンポーネントで設計されている場合、特に問題になりやすいです。
                </p>"""),
        ("emr.faq.products.a4.p2", False, """                <p>
                  当社のライトは高品質のパワードライバーを使用しており、ちらつきはほとんどありません。スローモーションビデオでも検出できないほど、ちらつきを排除しました。ちらつきと、ごくわずかなちらつきが起きうる「ちらつき効果」については、ブログ記事もあわせてご覧ください。
                </p>"""),
        ("emr.faq.products.a5", True, """                <p>
                  ゴーグルが付属しており、デバイスを使用するときは<strong>着用してください</strong>。
                </p>"""),
        ("emr.faq.orders.a1", True, """                <p>
                  <a class="link" href="./contact.html">お問い合わせページ</a>からお問い合わせください。喜んでお手伝いさせていただきます。
                </p>"""),
        ("emr.faq.orders.a2", False, """                <p>
                  デジタル版は当社のWebサイトの各製品ページの「マニュアル」セクションで入手でき、配送には説明書が2枚含まれています。
                </p>"""),
        ("emr.faq.shipping.a1.p1", False, """                <p>
                  はい。当社のすべての照明には電圧変換器が統合されているため、国によって異なる電圧差は問題になりません。お住まいの国に合わせた正しい電源をお届けします。
                </p>"""),
        ("emr.faq.shipping.a1.p2", True, """                <p>
                  間違った電源ケーブルを受け取った場合は、
                  <a class="link" href="mailto:info@theestablishbeauty.com">info@theestablishbeauty.com</a>
                  までご連絡ください。ご注文番号をお知らせいただければ、正しいものをお送りします。
                </p>"""),
        ("emr.faq.shipping.a2.p1", True, """                <p>
                  配送先によって異なります。当施設で処理されたご注文は、お届けまで目安として <strong>5〜7営業日</strong> かかることがあります。海外配送は <strong>7〜16日</strong> 程度かかる場合があります。配送の詳細・追跡は、確認メールに記載されます。
                </p>"""),
        ("emr.faq.shipping.a2.p2", True, """                <p class="subtle micro">
                  通関・関税・追跡で不明な点は
                  <a class="link" href="mailto:info@theestablishbeauty.com">info@theestablishbeauty.com</a>
                  までお問い合わせください。
                </p>"""),
        ("emr.faq.shipping.a3", False, """                <p>
                  当社は主要な運送業者および地元の配送パートナーを利用しています。チェックアウト時に配送方法を選択するよう求められます。
                </p>"""),
        ("emr.faq.other.a1", True, """                <p>
                  はい。当社の製品にはすべて <strong>1年間のメーカー保証</strong> が付属します。問題が発生した場合は
                  <a class="link" href="mailto:info@theestablishbeauty.com">info@theestablishbeauty.com</a> までメールでお問い合わせください。
                </p>"""),
        ("emr.faq.other.a2", False, """                <p>
                  たまにプロモーションを行っています。ニュースレターに登録するか、ソーシャルメディアでフォローして最新情報を入手してください。
                </p>"""),
        ("emr.faq.other.a3", True, """                <p>
                  返品の資格を得るには、ランプが <strong>未使用</strong> で、元の状態・梱包のまま、配達から <strong>30日以内</strong> に返送される必要があります。中古品は返品できません。
                </p>"""),
    ]
    for key, use_html, old in html_answers:
        attr = " data-i18n-html" if use_html else ""
        html = R(html, old, old.replace("<p", f'<p data-i18n="{key}"{attr}', 1))
    return html


def patch_i18n_js() -> None:
    path = ROOT / "i18n.js"
    text = path.read_text(encoding="utf-8")
    if "__PAGES_I18N__" in text:
        print("i18n.js already merges __PAGES_I18N__")
        return
    needle = """  if (typeof window !== "undefined" && window.__INDEX_I18N__) {
    Object.assign(MESSAGES.ja, window.__INDEX_I18N__.ja || {});
    Object.assign(MESSAGES.en, window.__INDEX_I18N__.en || {});
  }
"""
    block = """  if (typeof window !== "undefined" && window.__PAGES_I18N__) {
    Object.assign(MESSAGES.ja, window.__PAGES_I18N__.ja || {});
    Object.assign(MESSAGES.en, window.__PAGES_I18N__.en || {});
  }
"""
    if needle not in text:
        raise ValueError("INDEX merge block not found in i18n.js")
    path.write_text(text.replace(needle, needle + "\n" + block), encoding="utf-8")
    print("patched i18n.js")


PAGES = [
    ("collection-all.html", 'data-i18n="emr.collection.hero.h1"', patch_collection_all),
    ("science.html", 'data-i18n="emr.science.hero.h1"', patch_science),
    ("blog.html", 'data-i18n="emr.blog.hero.h1"', patch_blog),
    ("faq.html", 'data-i18n="emr.faq.hero.h1"', patch_faq),
]


def main() -> None:
    for fname, marker, patcher in PAGES:
        path = ROOT / fname
        html = path.read_text(encoding="utf-8")
        if marker in html:
            print(f"skip {fname} (already patched)")
            continue
        html = inject_scripts(html)
        html = patcher(html)
        path.write_text(html, encoding="utf-8")
        print(f"patched {fname}")
    patch_i18n_js()


if __name__ == "__main__":
    main()
