/**
 * Video marketing events for Vercel Web Analytics (custom events).
 * Runs only after cookie consent === "accepted" (same key as app.js).
 */
import { track } from "./vendor/vercel-analytics/index.mjs";

const COOKIE_KEY = "emrtek_demo_cookie_consent";
const CONSENT_EVENT = "emr-cookie-consent";

/** @type {WeakSet<HTMLVideoElement>} */
const bound = new WeakSet();

/** @type {WeakMap<HTMLVideoElement, { milestones: Set<number>, play: boolean, engaged: boolean, complete: boolean, watched: number, lastTime: number }>} */
const stateByVideo = new WeakMap();

function hasConsent() {
  try {
    return localStorage.getItem(COOKIE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function pagePath() {
  const p = window.location.pathname || "/";
  return p.startsWith("/") ? p.slice(1) || "index.html" : p;
}

function productFromPath() {
  const m = (window.location.pathname || "").match(/product-([^.]+)\.html/i);
  return m ? m[1] : "";
}

function resolveProductId(video) {
  const explicit = video.getAttribute("data-analytics-product");
  if (explicit) return explicit;
  const card = video.closest(".product, .favcard, article.favcard");
  if (card) {
    const link = card.querySelector('a[href*="product-"]');
    const href = link?.getAttribute("href") || "";
    const m = href.match(/product-([^.]+)\.html/i);
    if (m) return m[1];
  }
  return productFromPath();
}

function resolvePlacement(video) {
  const custom = video.getAttribute("data-analytics-placement");
  if (custom) return custom;
  if (video.classList.contains("heroVideo__video")) return "hero";
  if (video.classList.contains("favcard__video")) return "favcard";
  if (video.closest(".portfolioGrid")) return "portfolio";
  if (video.hasAttribute("data-gallery-video") || video.classList.contains("productPage__video")) {
    return "product-gallery";
  }
  if (video.classList.contains("product__mediaVideo") || video.closest(".product__media--video")) {
    return "shop-grid";
  }
  return "inline";
}

function videoLabel(video) {
  return (
    video.getAttribute("data-analytics-label") ||
    video.getAttribute("aria-label") ||
    resolveProductId(video) ||
    "unknown"
  );
}

function baseProps(video) {
  const product = resolveProductId(video);
  const props = {
    page: pagePath(),
    placement: resolvePlacement(video),
    label: videoLabel(video),
  };
  if (product) props.product = product;
  return props;
}

function send(eventName, video, extra = {}) {
  if (!hasConsent()) return;
  try {
    track(eventName, { ...baseProps(video), ...extra });
  } catch {
    /* analytics script may be blocked */
  }
}

function getState(video) {
  let s = stateByVideo.get(video);
  if (!s) {
    s = {
      milestones: new Set(),
      play: false,
      engaged: false,
      complete: false,
      watched: 0,
      lastTime: 0,
    };
    stateByVideo.set(video, s);
  }
  return s;
}

function markEngaged(video, reason) {
  const s = getState(video);
  if (s.engaged) return;
  s.engaged = true;
  send("video_engaged", video, { reason });
}

function bindVideo(video) {
  if (!(video instanceof HTMLVideoElement) || bound.has(video)) return;
  bound.add(video);

  video.addEventListener("play", () => {
    if (!hasConsent()) return;
    const s = getState(video);
    if (s.play) return;
    s.play = true;
    send("video_play", video, { autoplay: Boolean(video.autoplay) });
  });

  video.addEventListener("timeupdate", () => {
    if (!hasConsent()) return;
    const s = getState(video);
    const t = video.currentTime;
    if (s.lastTime > 0 && t >= s.lastTime) s.watched += t - s.lastTime;
    s.lastTime = t;

    if (!s.engaged && s.watched >= 3) markEngaged(video, "watch_time");

    const duration = video.duration;
    if (!duration || !Number.isFinite(duration) || duration <= 0) return;
    const pct = (t / duration) * 100;
    for (const milestone of [25, 50, 75]) {
      if (pct >= milestone && !s.milestones.has(milestone)) {
        s.milestones.add(milestone);
        send("video_progress", video, { percent: milestone });
      }
    }
  });

  video.addEventListener("ended", () => {
    if (!hasConsent()) return;
    const s = getState(video);
    if (s.complete) return;
    s.complete = true;
    send("video_complete", video);
  });

  video.addEventListener("volumechange", () => {
    if (!video.muted) markEngaged(video, "unmute");
  });

  video.addEventListener("seeking", () => {
    markEngaged(video, "seek");
  });

  video.addEventListener("pointerdown", () => {
    if (video.controls) markEngaged(video, "controls");
  });
}

function scan(root = document) {
  if (!hasConsent()) return;
  root.querySelectorAll("video").forEach((v) => bindVideo(v));
}

function start() {
  if (!hasConsent()) return;
  scan(document);
  new MutationObserver((mutations) => {
    if (!hasConsent()) return;
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof HTMLVideoElement) bindVideo(node);
        else if (node instanceof Element) scan(node);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}

document.addEventListener(CONSENT_EVENT, (e) => {
  if (e.detail?.status === "accepted") start();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => start(), { once: true });
} else {
  start();
}
