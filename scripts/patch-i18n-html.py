#!/usr/bin/env python3
"""One-time patch: add i18n assets and data-i18n to EMR-layout HTML files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

BOOT = """    <script>
      (function () {
        try {
          var k = "establish_site_lang";
          var v = localStorage.getItem(k) || "ja";
          if (v !== "ja" && v !== "en") v = "ja";
          document.documentElement.setAttribute("data-site-lang", v);
          document.documentElement.setAttribute("lang", v === "en" ? "en" : "ja");
        } catch (e) {}
      })();
    </script>
"""

SKIP_FILES = {"establish-beauty.html", "index.html"}


def patch(path: Path) -> bool:
    if path.name in SKIP_FILES:
        return False
    t = path.read_text(encoding="utf-8")
    original = t
    if "establish_site_lang" in t[:3000]:
        return False
    if './styles.css' not in t or "<html" not in t:
        return False

    changed = False
    if "<meta charset=\"UTF-8\" />" in t and BOOT.strip() not in t:
        t = t.replace("<meta charset=\"UTF-8\" />", "<meta charset=\"UTF-8\" />\n" + BOOT, 1)
        changed = True

    if "./i18n.css" not in t:
        t = t.replace(
            '<link rel="stylesheet" href="./styles.css" />',
            '<link rel="stylesheet" href="./styles.css" />\n    <link rel="stylesheet" href="./i18n.css" />',
            1,
        )
        changed = True

    if "i18n.js" not in t:
        t = t.replace("</body>", '    <script src="./i18n.js" defer></script>\n  </body>', 1)
        changed = True

    old_right = '<div class="topbar__right" aria-label="言語と通貨">'
    new_right = (
        '<div class="topbar__right" aria-label="言語と通貨" '
        'data-i18n-attr="aria-label:emr.topbar.langcurrency" '
        'style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;justify-content:flex-end">\n'
        '          <div class="lang-switch" role="group" data-i18n-attr="aria-label:lang.label">\n'
        '            <button type="button" class="pill pill--lang" data-lang-switch="ja">日本語</button>\n'
        '            <button type="button" class="pill pill--lang" data-lang-switch="en">English</button>\n'
        "          </div>\n"
    )
    if old_right in t and "lang-switch" not in t[: t.find(old_right) + 200]:
        t = t.replace(old_right, new_right, 1)
        changed = True

    reps = [
        (
            '<button class="pill" type="button" data-action="open-language">',
            '<button class="pill" type="button" data-action="open-language" data-i18n="emr.pill.lang">',
        ),
        (
            '<button class="pill" type="button" data-action="open-currency">',
            '<button class="pill" type="button" data-action="open-currency" data-i18n="emr.pill.currency">',
        ),
    ]
    for a, b in reps:
        if b not in t and a in t:
            t = t.replace(a, b, 1)
            changed = True

    if 'href="./establish-beauty.html"' in t and 'data-i18n="emr.topbar.teb"' not in t:
        t = t.replace(
            '<a class="link micro" href="./establish-beauty.html"',
            '<a class="link micro" href="./establish-beauty.html" data-i18n="emr.topbar.teb"',
            1,
        )
        changed = True

    if "<span class=\"badge\">出荷2〜5営業日" in t and 'data-i18n="emr.topbar.badge"' not in t:
        t = t.replace(
            "<span class=\"badge\">",
            '<span class="badge" data-i18n="emr.topbar.badge">',
            1,
        )
        changed = True

    if 'class="skip-link"' in t and 'data-i18n="emr.skip"' not in t:
        t = t.replace('<a class="skip-link" href="#main">', '<a class="skip-link" href="#main" data-i18n="emr.skip">', 1)
        changed = True

    if 'class="brand__link"' in t and "data-i18n-attr=\"aria-label:emr.brand.aria\"" not in t:
        t = t.replace(
            '<a class="brand__link" href="./emr-tek.html" aria-label="EMR-TEK ホーム">',
            '<a class="brand__link" href="./emr-tek.html" data-i18n-attr="aria-label:emr.brand.aria" aria-label="EMR-TEK ホーム">',
            1,
        )
        changed = True

    if '<nav class="nav" aria-label="メイン">' in t:
        t = t.replace(
            '<nav class="nav" aria-label="メイン">',
            '<nav class="nav" data-i18n-attr="aria-label:emr.nav.main" aria-label="メイン">',
            1,
        )
        changed = True

    nav_reps = [
        ('href="./establish-beauty.html">TEB ホーム</a>', 'href="./establish-beauty.html" data-i18n="emr.nav.teb">TEB ホーム</a>'),
        ('href="./collection-all.html">ショップ</a>', 'href="./collection-all.html" data-i18n="emr.nav.shop">ショップ</a>'),
        ('href="./science.html">科学を学ぶ</a>', 'href="./science.html" data-i18n="emr.nav.science">科学を学ぶ</a>'),
        ('href="./blog.html">ブログ</a>', 'href="./blog.html" data-i18n="emr.nav.blog">ブログ</a>'),
        ('href="./faq.html">FAQ</a>', 'href="./faq.html" data-i18n="emr.nav.faq">FAQ</a>'),
        ('href="./contact.html">お問い合わせ</a>', 'href="./contact.html" data-i18n="emr.nav.contact">お問い合わせ</a>'),
    ]
    for a, b in nav_reps:
        if a in t and b not in t:
            t = t.replace(a, b, 1)
            changed = True

    if 'href="./emr-tek.html#track"' in t:
        t = t.replace(
            'href="./emr-tek.html#track">注文追跡</a>',
            'href="./emr-tek.html#track" data-i18n="emr.nav.track">注文追跡</a>',
            1,
        )
        changed = True
    elif '#track">注文追跡</a>' in t:
        t = t.replace(
            '#track">注文追跡</a>',
            '#track" data-i18n="emr.nav.track">注文追跡</a>',
            1,
        )
        changed = True

    t = t.replace(
        'data-action="open-search" aria-label="検索"',
        'data-action="open-search" data-i18n-attr="aria-label:emr.aria.search" aria-label="検索"',
        1,
    )
    t = t.replace(
        'data-action="open-cart" aria-label="カート"',
        'data-action="open-cart" data-i18n-attr="aria-label:emr.aria.cart" aria-label="カート"',
        1,
    )
    t = t.replace(
        'aria-label="カート内商品数" data-cart-count',
        'data-i18n-attr="aria-label:emr.aria.cartcount" aria-label="カート内商品数" data-cart-count',
        1,
    )

    modal_cart = '<dialog class="modal" data-cart-modal aria-label="カート">'
    if modal_cart in t:
        t = t.replace(
            modal_cart,
            '<dialog class="modal" data-cart-modal data-i18n-attr="aria-label:emr.modal.cart" aria-label="カート">',
            1,
        )
        changed = True

    t = t.replace(
        '<div class="h3">カート</div>',
        '<div class="h3" data-i18n="emr.modal.cart">カート</div>',
        1,
    )
    t = t.replace(
        'aria-label="閉じる">\n            <svg',
        'data-i18n-attr="aria-label:emr.modal.close" aria-label="閉じる">\n            <svg',
        2,
    )

    t = t.replace(
        '<p class="subtle" data-cart-empty>カートは空です。</p>',
        '<p class="subtle" data-cart-empty data-i18n="emr.cart.empty">カートは空です。</p>',
        1,
    )
    t = t.replace(
        '<span>小計</span>',
        '<span data-i18n="emr.cart.subtotal">小計</span>',
        1,
    )
    t = t.replace(
        'data-action="checkout">購入手続きへ</button>',
        'data-action="checkout" data-i18n="emr.cart.checkout">購入手続きへ</button>',
        1,
    )
    t = t.replace(
        'data-action="clear-cart">カートを空にする</button>',
        'data-action="clear-cart" data-i18n="emr.cart.clear">カートを空にする</button>',
        1,
    )

    t = t.replace(
        '<dialog class="modal" data-search-modal aria-label="検索">',
        '<dialog class="modal" data-search-modal data-i18n-attr="aria-label:emr.modal.search" aria-label="検索">',
        1,
    )
    t = t.replace(
        '<div class="h3">検索</div>',
        '<div class="h3" data-i18n="emr.modal.search">検索</div>',
        1,
    )
    t = t.replace(
        "<span>キーワード</span>",
        '<span data-i18n="emr.search.keyword">キーワード</span>',
        1,
    )
    t = t.replace(
        'placeholder="例：Firewave / マスク / 近赤外"',
        'data-i18n-attr="placeholder:emr.search.placeholder" placeholder="例：Firewave / マスク / 近赤外"',
        1,
    )
    t = t.replace(
        '<div class="micro subtle">この検索は一覧（全商品）に反映されます。</div>',
        '<div class="micro subtle" data-i18n="emr.search.hint">この検索は一覧（全商品）に反映されます。</div>',
        1,
    )
    t = t.replace(
        'data-action="search-apply">適用</button>',
        'data-action="search-apply" data-i18n="emr.search.apply">適用</button>',
        1,
    )

    t = t.replace(
        'role="dialog" aria-label="Cookieの利用"',
        'role="dialog" data-i18n-attr="aria-label:emr.cookie.dialog" aria-label="Cookieの利用"',
        1,
    )
    t = t.replace(
        '<div class="cookie__title">Cookieを使用しています</div>',
        '<div class="cookie__title" data-i18n="emr.cookie.title">Cookieを使用しています</div>',
        1,
    )
    t = t.replace(
        '<div class="micro subtle">\n            体験向上と分析のためにCookieを利用します。設定はいつでも変更できます。\n          </div>',
        '<div class="micro subtle" data-i18n="emr.cookie.body">\n            体験向上と分析のためにCookieを利用します。設定はいつでも変更できます。\n          </div>',
        1,
    )
    t = t.replace(
        '<div class="micro subtle">体験向上と分析のためにCookieを利用します。設定はいつでも変更できます。</div>',
        '<div class="micro subtle" data-i18n="emr.cookie.body">体験向上と分析のためにCookieを利用します。設定はいつでも変更できます。</div>',
        1,
    )
    t = t.replace(
        '<button class="btn btn--sm btn--ghost" type="button" data-action="cookie-decline">\n            拒否',
        '<button class="btn btn--sm btn--ghost" type="button" data-action="cookie-decline" data-i18n="emr.cookie.decline">\n            拒否',
        1,
    )
    t = t.replace(
        '<button class="btn btn--sm btn--ghost" type="button" data-action="cookie-decline">拒否</button>',
        '<button class="btn btn--sm btn--ghost" type="button" data-action="cookie-decline" data-i18n="emr.cookie.decline">拒否</button>',
        1,
    )
    t = t.replace(
        '<button class="btn btn--sm" type="button" data-action="cookie-accept">同意</button>',
        '<button class="btn btn--sm" type="button" data-action="cookie-accept" data-i18n="emr.cookie.accept">同意</button>',
        1,
    )

    foot_reps = [
        ('<div class="footer__title">ショップ</div>', '<div class="footer__title" data-i18n="emr.footer.shop">ショップ</div>'),
        ('<div class="footer__title">学ぶ</div>', '<div class="footer__title" data-i18n="emr.footer.learn">学ぶ</div>'),
        (
            '<div class="footer__title">ニュースレター</div>',
            '<div class="footer__title" data-i18n="emr.footer.newsletter">ニュースレター</div>',
        ),
    ]
    for a, b in foot_reps:
        if a in t and b not in t:
            t = t.replace(a, b, 1)
            changed = True

    if 'data-i18n="emr.footer.newsletter.hint"' not in t:
        t = t.replace(
            '<p class="micro subtle">新商品・キャンペーン情報をお届けします。</p>',
            '<p class="micro subtle" data-i18n="emr.footer.newsletter.hint">新商品・キャンペーン情報をお届けします。</p>',
            1,
        )

    if 'data-i18n-attr="placeholder:emr.footer.email.placeholder"' not in t:
        t = t.replace(
            'placeholder="メールアドレス"',
            'data-i18n-attr="placeholder:emr.footer.email.placeholder" placeholder="メールアドレス"',
            1,
        )

    t = t.replace(
        '<button class="btn btn--sm" type="submit">登録</button>',
        '<button class="btn btn--sm" type="submit" data-i18n="emr.footer.subscribe">登録</button>',
        1,
    )

    if "The Establish Beauty（メインページ）" in t:
        t = t.replace(
            '<a class="link" href="./establish-beauty.html">The Establish Beauty（メインページ）</a>',
            '<a class="link" href="./establish-beauty.html" data-i18n="emr.footer.teb_main">The Establish Beauty（メインページ）</a>',
            1,
        )

    t = t.replace(
        '<a class="link" href="#">EMR-TEKについて</a>',
        '<a class="link" href="#" data-i18n="emr.footer.about">EMR-TEKについて</a>',
        1,
    )
    t = t.replace(
        '<a class="link" href="./science.html">科学を学ぶ</a>',
        '<a class="link" href="./science.html" data-i18n="emr.nav.science">科学を学ぶ</a>',
        1,
    )
    t = t.replace(
        '<a class="link" href="./blog.html">ブログ</a>',
        '<a class="link" href="./blog.html" data-i18n="emr.nav.blog">ブログ</a>',
        1,
    )
    t = t.replace(
        '<a class="link" href="./faq.html">よくある質問</a>',
        '<a class="link" href="./faq.html" data-i18n="emr.footer.faq">よくある質問</a>',
        1,
    )
    t = t.replace(
        '<a class="link" href="./contact.html">お問い合わせ</a>',
        '<a class="link" href="./contact.html" data-i18n="emr.nav.contact">お問い合わせ</a>',
        1,
    )

    if t != original:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def main():
    n = 0
    for p in sorted(ROOT.glob("*.html")):
        if patch(p):
            print(p.name)
            n += 1
    print("patched", n, "files")


if __name__ == "__main__":
    main()
