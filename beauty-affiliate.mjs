/**
 * Beauty Column category catalog. Products are added in beauty-affiliate-config.js.
 */
const cfg = () => window.__BEAUTY_AFFILIATE_CONFIG__ || {};

function siteLang() {
  return document.documentElement.getAttribute("data-site-lang") === "en" ? "en" : "ja";
}

function text(item, jaKey, enKey) {
  if (!item) return "";
  return siteLang() === "en" ? item[enKey] || item[jaKey] || "" : item[jaKey] || item[enKey] || "";
}

function categories() {
  return Array.isArray(cfg().categories) ? cfg().categories : [];
}

function categoryById(id) {
  return categories().find((category) => category.id === id) || null;
}

function selectedId() {
  const hash = (location.hash || "").replace(/^#/, "");
  if (hash && categoryById(hash)) return hash;
  return "all";
}

function bannersFor(id) {
  const source = id === "all" ? categories() : [categoryById(id)].filter(Boolean);
  const banners = source.flatMap((category) => (Array.isArray(category.banners) ? category.banners : []));
  if (id !== "all") return banners;
  const seen = new Set();
  return banners.filter((banner) => {
    const key = String(banner.html || banner.id || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function listingCount(category) {
  return (category.products?.length || 0) + (category.banners?.length || 0);
}

function productsFor(id) {
  if (id === "all") {
    return categories().flatMap((category) =>
      (Array.isArray(category.products) ? category.products : []).map((product) => ({
        ...product,
        categoryId: category.id,
        categoryTitle: text(category, "titleJa", "titleEn"),
      })),
    );
  }
  const category = categoryById(id);
  if (!category) return [];
  const title = text(category, "titleJa", "titleEn");
  return (Array.isArray(category.products) ? category.products : []).map((product) => ({
    ...product,
    categoryId: category.id,
    categoryTitle: title,
  }));
}

function emptyMessage(id) {
  const en = siteLang() === "en";
  if (id === "all") {
    return en
      ? "Products will be added to each category."
      : "各カテゴリの商品はこれから追加します。";
  }
  const name = text(categoryById(id), "titleJa", "titleEn");
  return en
    ? `${name || "This category"} products will be added here.`
    : `${name || "このカテゴリ"}の商品はこれから追加します。`;
}

function renderCategories() {
  const root = document.querySelector("[data-beauty-categories]");
  if (!root) return;
  const current = selectedId();
  root.innerHTML = "";

  const items = [
    { id: "all", titleJa: "すべて", titleEn: "All" },
    ...categories(),
  ];

  for (const item of items) {
    const count =
      item.id === "all"
        ? categories().reduce((sum, category) => sum + (category.products?.length || 0), 0) + bannersFor("all").length
        : listingCount(item);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beautyCat" + (item.id === current ? " is-selected" : "");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", item.id === current ? "true" : "false");
    button.dataset.beautyCategory = item.id;
    const label = document.createElement("span");
    label.textContent = text(item, "titleJa", "titleEn") || item.id;
    const badge = document.createElement("span");
    badge.className = "beautyCat__count";
    badge.textContent = String(count);
    button.append(label, badge);
    button.addEventListener("click", () => {
      const next = item.id === "all" ? "" : `#${item.id}`;
      if (location.hash === next || (item.id === "all" && !location.hash)) {
        render();
        return;
      }
      history.replaceState(null, "", `${location.pathname}${location.search}${next}`);
      render();
    });
    root.appendChild(button);
  }

  const lead = document.querySelector("[data-beauty-category-lead]");
  if (lead) {
    const category = categoryById(current);
    lead.textContent = category ? text(category, "blurbJa", "blurbEn") : "";
    lead.hidden = !lead.textContent;
  }
}

function activateScripts(root) {
  for (const oldScript of root.querySelectorAll("script")) {
    const script = document.createElement("script");
    for (const attr of oldScript.attributes) {
      script.setAttribute(attr.name, attr.value);
    }
    script.text = oldScript.textContent || "";
    oldScript.replaceWith(script);
  }
}

function renderBanners() {
  const root = document.querySelector("[data-beauty-banners]");
  if (!root) return;
  const banners = bannersFor(selectedId());
  root.innerHTML = "";
  root.hidden = banners.length === 0;

  for (const banner of banners) {
    const html = String(banner.html || "").trim();
    if (!html) continue;
    const slot = document.createElement("div");
    slot.className = "beautyBannerSlot";
    slot.insertAdjacentHTML("beforeend", html);
    activateScripts(slot);
    root.appendChild(slot);
  }
}

function renderProducts() {
  const root = document.querySelector("[data-beauty-products]");
  const empty = document.querySelector("[data-beauty-products-empty]");
  if (!root) return;
  const current = selectedId();
  const products = productsFor(current);
  const lang = siteLang();
  root.innerHTML = "";

  for (const product of products) {
    const card = document.createElement("article");
    card.className = "beautyProduct";
    card.id = product.id ? `product-${product.id}` : "";

    if (product.image) {
      const media = document.createElement("div");
      media.className = "beautyProduct__media";
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = text(product, "titleJa", "titleEn");
      img.loading = "lazy";
      media.appendChild(img);
      card.appendChild(media);
    }

    const body = document.createElement("div");
    body.className = "beautyProduct__body";

    if (product.categoryTitle && current === "all") {
      const tag = document.createElement("p");
      tag.className = "beautyProduct__tag";
      tag.textContent = product.categoryTitle;
      body.appendChild(tag);
    }

    const h3 = document.createElement("h3");
    h3.className = "beautyProduct__title";
    h3.textContent = text(product, "titleJa", "titleEn") || product.id || "";
    body.appendChild(h3);

    const blurb = text(product, "blurbJa", "blurbEn");
    if (blurb) {
      const p = document.createElement("p");
      p.className = "beautyProduct__blurb";
      p.textContent = blurb;
      body.appendChild(p);
    }

    const price = text(product, "priceJa", "priceEn");
    if (price) {
      const p = document.createElement("p");
      p.className = "beautyProduct__price";
      p.textContent = price;
      body.appendChild(p);
    }

    const href = String(product.href || "").trim();
    const actions = document.createElement("p");
    actions.className = "beautyProduct__cta";
    if (href) {
      const a = document.createElement("a");
      a.className = "btn btn--sm";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer sponsored";
      a.textContent = lang === "en" ? "View product" : "商品を見る";
      actions.appendChild(a);
    }
    if (actions.childNodes.length) body.appendChild(actions);
    card.appendChild(body);
    root.appendChild(card);
  }

  const hasBanners = bannersFor(current).length > 0;
  root.hidden = products.length === 0;
  if (empty) {
    empty.hidden = products.length > 0 || hasBanners;
    empty.textContent = emptyMessage(current);
  }
}

function render(options = {}) {
  renderCategories();
  renderBanners();
  renderProducts();
  if (options.scroll && selectedId() !== "all") {
    document.getElementById("beauty-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("site-lang-change", () => render());
window.addEventListener("hashchange", () => render({ scroll: true }));

function boot() {
  render({ scroll: selectedId() !== "all" });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
