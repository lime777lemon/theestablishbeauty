/**
 * Social Snowball affiliate attribution for this headless storefront.
 * - Captures ?snowball=CODE and /CODE paths (redirects to /?snowball=CODE)
 * - Persists code for Shopify links (emr-tek.com)
 * - Loads referral.js after cookie consent (marketing)
 */
const COOKIE_CONSENT_KEY = "emrtek_demo_cookie_consent";
const STORAGE_CODE = "emrtek_snowball_code";
const STORAGE_EXPIRES = "emrtek_snowball_expires";
const CONSENT_EVENT = "emr-cookie-consent";

const cfg = () => window.__SNOWBALL_CONFIG__ || {};
const shop = () => String(cfg().shop || "").trim();

function getReferralShopUrl() {
  return String(cfg().referralShopUrl || "").trim();
}

function isEmrTekShopHost(hostname) {
  return hostname === "emr-tek.com" || hostname === "www.emr-tek.com";
}

function isCdnUrl(pathname) {
  return /\/cdn\//i.test(pathname);
}

/** Official store navigation (not CDN assets or blog articles). */
function shouldUseReferralLanding(href) {
  if (!getReferralShopUrl()) return false;
  try {
    const url = new URL(href, window.location.href);
    if (!isEmrTekShopHost(url.hostname) || isCdnUrl(url.pathname)) return false;
    return /^\/en-jp\/(collections|products|pages)(\/|$)/i.test(url.pathname);
  } catch {
    return false;
  }
}

const RESERVED_PATHS = new Set([
  "api",
  "assets",
  "auth",
  "vendor",
  "scripts",
  "stripe-connect-sinatra",
  "node_modules",
]);

function hasConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function attributionMs() {
  const days = Number(cfg().attributionDays) || 30;
  return days * 24 * 60 * 60 * 1000;
}

function persistCode(code) {
  const trimmed = String(code || "").trim();
  if (!trimmed) return;
  try {
    localStorage.setItem(STORAGE_CODE, trimmed);
    localStorage.setItem(STORAGE_EXPIRES, String(Date.now() + attributionMs()));
  } catch {
    /* private mode */
  }
}

function getSnowballCode() {
  try {
    const exp = Number(localStorage.getItem(STORAGE_EXPIRES) || 0);
    if (exp && Date.now() > exp) {
      localStorage.removeItem(STORAGE_CODE);
      localStorage.removeItem(STORAGE_EXPIRES);
      return "";
    }
    return localStorage.getItem(STORAGE_CODE) || "";
  } catch {
    return "";
  }
}

function captureFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("snowball");
  if (code) persistCode(code);
}

function captureFromPathRedirect() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!path || path.includes("/")) return;
  if (/\.[a-z0-9]{1,8}$/i.test(path)) return;
  if (RESERVED_PATHS.has(path.toLowerCase())) return;

  persistCode(path);
  const url = new URL(window.location.href);
  if (url.searchParams.get("snowball") === path && url.pathname === "/") return;

  url.pathname = "/";
  url.searchParams.set("snowball", path);
  window.location.replace(url.toString());
}

function appendSnowballToUrl(href) {
  const code = getSnowballCode();
  if (!code) return href;
  try {
    const url = new URL(href, window.location.href);
    if (!/\.myshopify\.com$/i.test(url.hostname) && !isEmrTekShopHost(url.hostname)) {
      return href;
    }
    if (!url.searchParams.has("snowball")) url.searchParams.set("snowball", code);
    return url.toString();
  } catch {
    return href;
  }
}

function resolveShopHref(href) {
  if (shouldUseReferralLanding(href)) return getReferralShopUrl();
  return appendSnowballToUrl(href);
}

function decorateShopLinks(root = document) {
  root.querySelectorAll('a[href*="emr-tek.com"]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    const next = resolveShopHref(href);
    if (next !== href) a.setAttribute("href", next);
  });

  root.querySelectorAll("[data-affiliate-shop]").forEach((el) => {
    const url = getReferralShopUrl();
    if (!url) return;
    if (el instanceof HTMLAnchorElement) {
      el.href = url;
      if (!el.target) {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    }
  });
}

const AFFILIATE_SECTION_CTA_KEY = "emr.affiliate.section_cta";

function currentSiteLang() {
  return document.documentElement.getAttribute("data-site-lang") === "en" ? "en" : "ja";
}

function affiliateSectionLabel(lang = currentSiteLang()) {
  if (window.siteI18n?.t) return window.siteI18n.t(lang, AFFILIATE_SECTION_CTA_KEY);
  return lang === "en" ? "Shop at the EMR-TEK official store" : "EMR-TEK 公式ストアで購入";
}

function refreshAffiliateSectionLabels(lang = currentSiteLang()) {
  document.querySelectorAll("[data-affiliate-section-cta] [data-i18n]").forEach((el) => {
    el.textContent = affiliateSectionLabel(lang);
  });
}

function injectAffiliateSectionLinks() {
  const url = getReferralShopUrl();
  if (!url) return;

  const main = document.getElementById("main");
  if (!main) return;

  const skipIds = new Set(["track"]);
  main.querySelectorAll(":scope > section").forEach((section) => {
    if (section.id && skipIds.has(section.id)) return;
    if (section.querySelector("[data-affiliate-section-cta]")) return;

    const wrap = document.createElement("p");
    wrap.className = "affiliateSectionCta";
    wrap.setAttribute("data-affiliate-section-cta", "");
    const a = document.createElement("a");
    a.className = "btn btn--ghost btn--sm";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("data-affiliate-shop", "");
    a.setAttribute("data-i18n", AFFILIATE_SECTION_CTA_KEY);
    a.textContent = affiliateSectionLabel();
    wrap.appendChild(a);

    const container = section.querySelector(":scope > .container") || section;
    container.appendChild(wrap);
  });
}

const PRODUCT_BTN_SELECTOR =
  'button[data-action="checkout"], button[data-view], button[data-view-id], button[data-checkout-submit-card], button[data-checkout-submit-order]';

function decorateProductButtons(root = document) {
  const url = getReferralShopUrl();
  if (!url) return;

  root.querySelectorAll(PRODUCT_BTN_SELECTOR).forEach((btn) => {
    btn.setAttribute("data-affiliate-product-btn", "");
  });

  root.querySelectorAll('a[href="./checkout.html"], a[href="checkout.html"]').forEach((a) => {
    if (!(a instanceof HTMLAnchorElement)) return;
    if (
      !a.closest(
        ".cartPage, .cart__summary, .product__actions, .productPage__buy, [data-cart-page], .modal, .cartPage__actions, [data-payment-card-page], [data-checkout-page]"
      )
    ) {
      return;
    }
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("data-affiliate-shop", "");
    a.setAttribute("data-affiliate-product-btn", "");
  });
}

function ensureProductAffiliateCta() {
  return;
}

let scriptLoaded = false;

function loadReferralScript() {
  const shopId = shop();
  if (!shopId || scriptLoaded || !hasConsent()) return;
  scriptLoaded = true;

  window.SocialSnowball = { shop: shopId };
  if (document.querySelector(`script[src*="api.socialsnowball.io/js/referral.js"]`)) return;

  const s = document.createElement("script");
  s.src = `https://api.socialsnowball.io/js/referral.js?shop=${encodeURIComponent(shopId)}`;
  s.async = true;
  document.head.appendChild(s);
}

function maybeAffiliateFooterLink() {
  const portal = String(cfg().affiliatePortalUrl || "").trim();
  if (!portal) return;

  document.querySelectorAll("[data-snowball-affiliate-footer]").forEach((slot) => {
    if (slot.querySelector("a[data-snowball-affiliate-link]")) return;
    const a = document.createElement("a");
    a.className = "link";
    a.href = portal;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("data-snowball-affiliate-link", "");
    a.setAttribute("data-i18n", "emr.footer.affiliate_program");
    a.textContent = document.documentElement.getAttribute("data-site-lang") === "en"
      ? "Affiliate program"
      : "アフィリエイトプログラム";
    slot.appendChild(a);
  });
}

function init() {
  const defaultCode = String(cfg().defaultSnowballCode || "").trim();
  if (defaultCode) persistCode(defaultCode);

  captureFromPathRedirect();
  captureFromQuery();
  decorateShopLinks();
  decorateProductButtons();
  injectAffiliateSectionLinks();
  ensureProductAffiliateCta();
  maybeAffiliateFooterLink();
  loadReferralScript();

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof Element) {
          decorateShopLinks(node);
          decorateProductButtons(node);
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}

window.__getSnowballCode = getSnowballCode;
window.__appendSnowballToUrl = appendSnowballToUrl;
window.__getReferralShopUrl = getReferralShopUrl;

document.addEventListener(CONSENT_EVENT, (e) => {
  if (e.detail?.status === "accepted") loadReferralScript();
});

document.addEventListener("site-lang-change", (e) => {
  refreshAffiliateSectionLabels(e.detail?.lang);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
