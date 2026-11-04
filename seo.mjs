/**
 * Injects canonical, Open Graph, Twitter Card, and JSON-LD from page title/description.
 */
const cfg = () => window.__SEO_CONFIG__ || {};

function siteUrl() {
  return String(cfg().siteUrl || "").replace(/\/+$/, "");
}

function currentLang() {
  const v = document.documentElement.getAttribute("data-site-lang");
  return v === "en" ? "en" : "ja";
}

function ogLocale(lang = currentLang()) {
  const map = cfg().locale || {};
  return map[lang] || (lang === "en" ? "en_US" : "ja_JP");
}

function pagePath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/index.html")) return path.slice(0, -"/index.html".length) || "/";
  return path;
}

function canonicalUrl() {
  const base = siteUrl();
  if (!base) return "";
  const path = pagePath();
  return path === "/" ? `${base}/` : `${base}${path}`;
}

function absoluteUrl(path) {
  const base = siteUrl();
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function getDescription() {
  const el = document.querySelector('meta[name="description"]');
  return el?.getAttribute("content")?.trim() || "";
}

function getProductRoot() {
  return document.querySelector("[data-product-static][data-product-id]");
}

function isProductPage() {
  return Boolean(getProductRoot());
}

function isPrivatePage() {
  const path = pagePath().toLowerCase();
  if (path.startsWith("/auth/") || path.startsWith("/auth-")) return true;
  if (path.startsWith("/stripe-connect-sinatra/")) return true;
  if (/^\/(cart|checkout|payment-card)\.html$/i.test(path)) return true;
  if (
    /^\/(contact-inquiries-admin|sql-editor|supplier-dashboard)\.html$/i.test(path)
  ) {
    return true;
  }
  // Generic query-param product shell; prefer static product-*.html for indexing.
  if (/^\/product\.html$/i.test(path)) return true;
  return false;
}

function getRobotsDirective() {
  const existing = document.querySelector('meta[name="robots"]')?.getAttribute("content")?.trim() || "";
  if (/noindex/i.test(existing)) return existing;
  if (isPrivatePage()) return "noindex, follow";
  return "index, follow";
}

function upsertMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function parseYenPrice(text) {
  if (!text) return null;
  const digits = String(text).replace(/[^\d]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

function productAvailability() {
  const stock = document.querySelector(".stock, [aria-label*='在庫'], [aria-label*='stock']");
  const text = (stock?.textContent || "").toLowerCase();
  if (/sold\s*out|売り切れ|在庫なし|out of stock/.test(text)) {
    return "https://schema.org/OutOfStock";
  }
  return "https://schema.org/InStock";
}

function productImageUrl() {
  const video = document.querySelector("video[poster], [data-gallery-video][poster]");
  const poster = video?.getAttribute("poster");
  if (poster) return absoluteUrl(poster);

  const img = document.querySelector(
    ".productPage__media img[src], .mediaMainSlider img[src], .productPage img[src]"
  );
  const src = img?.getAttribute("src");
  if (src) return absoluteUrl(src);

  return absoluteUrl(cfg().defaultOgImage || "/assets/site-logo.png");
}

function productName() {
  const h1 = document.querySelector("h1.h1, .hero h1, main h1");
  const text = h1?.textContent?.replace(/\s+/g, " ").trim();
  if (text) return text;
  return document.title.replace(/\s*[–—-]\s*EMR-TEK\s*$/i, "").trim() || document.title.trim();
}

function buildProductJsonLd({ title, description, url }) {
  const root = getProductRoot();
  if (!root) {
    document.getElementById("seo-jsonld-product")?.remove();
    return null;
  }

  const brandName = cfg().brandName || "EMR-TEK";
  const priceText = document.querySelector(".price__now")?.textContent?.trim() || "";
  const price = parseYenPrice(priceText);
  const image = productImageUrl();
  const name = productName() || title;

  /** @type {Record<string, unknown>} */
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || undefined,
    image: image || undefined,
    sku: root.getAttribute("data-product-id") || undefined,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    url,
  };

  if (price != null) {
    data.offers = {
      "@type": "Offer",
      url,
      priceCurrency: "JPY",
      price: String(price),
      availability: productAvailability(),
      itemCondition: "https://schema.org/NewCondition",
    };
  }

  upsertJsonLd("seo-jsonld-product", data);
  return { image, name };
}

function buildJsonLd({ title, description, url, lang }) {
  const site = siteUrl();
  const siteName = cfg().siteName || "The Establish Beauty";
  const brandName = cfg().brandName || "EMR-TEK";

  upsertJsonLd("seo-jsonld-org", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: site ? `${site}/` : undefined,
    logo: absoluteUrl("/assets/site-logo.png"),
    email: "info@theestablishbeauty.com",
  });

  if (pagePath() === "/") {
    upsertJsonLd("seo-jsonld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${brandName} — ${siteName}`,
      url: site ? `${site}/` : undefined,
      inLanguage: [ogLocale("ja"), ogLocale("en")],
      publisher: {
        "@type": "Organization",
        name: siteName,
      },
    });
  } else {
    const existing = document.getElementById("seo-jsonld-website");
    if (existing) existing.remove();
  }

  upsertJsonLd("seo-jsonld-page", {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description || undefined,
    url,
    inLanguage: ogLocale(lang),
    isPartOf: site
      ? {
          "@type": "WebSite",
          name: siteName,
          url: `${site}/`,
        }
      : undefined,
  });

  return buildProductJsonLd({ title, description, url });
}

export function refreshSeo() {
  const base = siteUrl();
  if (!base) return;

  const lang = currentLang();
  const title = document.title.trim();
  const description = getDescription();
  const url = canonicalUrl();
  const defaultImage = absoluteUrl(cfg().defaultOgImage || "/assets/site-logo.png");
  const imageWidth = Number(cfg().defaultOgImageWidth) || 1200;
  const imageHeight = Number(cfg().defaultOgImageHeight) || 630;
  const googleVerification = String(cfg().googleSiteVerification || "").trim();
  const productPage = isProductPage();

  upsertLink("canonical", url);

  upsertMeta("name", "robots", getRobotsDirective());
  if (googleVerification) {
    upsertMeta("name", "google-site-verification", googleVerification);
  }

  const productMeta = buildJsonLd({ title, description, url, lang });
  const image = (productPage && productMeta?.image) || defaultImage;

  upsertMeta("property", "og:type", productPage ? "product" : "website");
  upsertMeta("property", "og:site_name", cfg().siteName || "The Establish Beauty");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:width", String(imageWidth));
  upsertMeta("property", "og:image:height", String(imageHeight));
  upsertMeta(
    "property",
    "og:image:alt",
    productMeta?.name || `${cfg().brandName || "EMR-TEK"} — ${cfg().siteName || "The Establish Beauty"}`
  );
  upsertMeta("property", "og:locale", ogLocale(lang));
  upsertMeta("property", "og:locale:alternate", lang === "ja" ? ogLocale("en") : ogLocale("ja"));

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  const twitterSite = String(cfg().twitterSite || "").trim();
  if (twitterSite) upsertMeta("name", "twitter:site", twitterSite);
}

window.__refreshSeo = refreshSeo;

function init() {
  refreshSeo();
  document.addEventListener("site-lang-change", () => {
    queueMicrotask(refreshSeo);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
