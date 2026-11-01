/**
 * Renders columns published by /api/beauty-column-daily.
 */
let columns = [];

function siteLang() {
  return document.documentElement.getAttribute("data-site-lang") === "en" ? "en" : "ja";
}

function text(column, jaKey, enKey) {
  return siteLang() === "en" ? column[enKey] || column[jaKey] || "" : column[jaKey] || column[enKey] || "";
}

function categoryTitle(id) {
  const categories = window.__BEAUTY_AFFILIATE_CONFIG__?.categories || [];
  const category = categories.find((item) => item.id === id);
  if (!category) return "";
  return siteLang() === "en" ? category.titleEn || category.titleJa : category.titleJa || category.titleEn;
}

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00+09:00`);
  if (Number.isNaN(date.getTime())) return iso || "";
  return new Intl.DateTimeFormat(siteLang() === "en" ? "en-US" : "ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: siteLang() === "en" ? "long" : "long",
    day: "numeric",
  }).format(date);
}

function fillReader(column) {
  const reader = document.querySelector("[data-beauty-column-reader]");
  if (!reader || !column) return;
  reader.hidden = false;
  reader.innerHTML = "";

  const time = document.createElement("time");
  time.className = "blogCard__time";
  time.dateTime = column.publishedOn || "";
  time.textContent = formatDate(column.publishedOn);

  const title = document.createElement("h3");
  title.className = "beautyColumnReader__title";
  title.textContent = text(column, "titleJa", "titleEn");

  const body = document.createElement("div");
  body.className = "beautyColumnReader__body";
  for (const paragraph of text(column, "bodyJa", "bodyEn").split(/\n{2,}/)) {
    const line = paragraph.trim();
    if (!line) continue;
    const p = document.createElement("p");
    p.textContent = line;
    body.appendChild(p);
  }

  reader.append(time, title, body);

  const categoryId = column.categoryId || "";
  const name = categoryTitle(categoryId);
  if (categoryId && name) {
    const more = document.createElement("p");
    more.className = "blogCard__more";
    const link = document.createElement("a");
    link.className = "link";
    link.href = `#${categoryId}`;
    link.textContent = siteLang() === "en" ? `See ${name} products` : `${name}の商品を見る`;
    more.appendChild(link);
    reader.appendChild(more);
  }

  reader.scrollIntoView({ behavior: "smooth", block: "start" });
}

function render() {
  const root = document.querySelector("[data-beauty-auto-columns]");
  if (!root) return;
  root.innerHTML = "";
  root.hidden = columns.length === 0;

  for (const column of columns) {
    const article = document.createElement("article");
    article.className = "blogCard";

    const content = document.createElement("div");
    content.className = "blogCard__content";

    const meta = document.createElement("div");
    meta.className = "blogCard__meta";
    const time = document.createElement("time");
    time.className = "blogCard__time";
    time.dateTime = column.publishedOn || "";
    time.textContent = formatDate(column.publishedOn);
    meta.appendChild(time);

    const h3 = document.createElement("h3");
    h3.className = "blogCard__title";
    const titleLink = document.createElement("a");
    titleLink.href = `#column-${column.id}`;
    titleLink.textContent = text(column, "titleJa", "titleEn");
    titleLink.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState(null, "", `#column-${column.id}`);
      fillReader(column);
    });
    h3.appendChild(titleLink);

    const excerpt = document.createElement("p");
    excerpt.className = "blogCard__excerpt";
    excerpt.textContent = text(column, "excerptJa", "excerptEn");

    const more = document.createElement("p");
    more.className = "blogCard__more";
    const read = document.createElement("a");
    read.className = "link";
    read.href = `#column-${column.id}`;
    read.textContent = siteLang() === "en" ? "Read" : "続きを読む";
    read.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState(null, "", `#column-${column.id}`);
      fillReader(column);
    });
    more.appendChild(read);

    content.append(meta, h3, excerpt, more);
    article.appendChild(content);
    root.appendChild(article);
  }

  const hash = (location.hash || "").replace(/^#column-/, "");
  if (location.hash.startsWith("#column-")) {
    const selected = columns.find((column) => column.id === hash);
    if (selected) fillReader(selected);
  }
}

async function loadColumns() {
  try {
    const response = await fetch("/api/beauty-columns", { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const payload = await response.json();
    columns = Array.isArray(payload.columns) ? payload.columns : [];
  } catch {
    columns = [];
  }
  render();
}

document.addEventListener("site-lang-change", render);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadColumns, { once: true });
} else {
  loadColumns();
}
