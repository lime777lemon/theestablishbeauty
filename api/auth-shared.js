/**
 * Shared helpers for /api/auth-sign-up and /api/auth-sign-in.
 * Origin gate: same as contact API (CONTACT_ALLOWED_ORIGINS).
 */

function readJsonBody(req) {
  const b = req.body;
  if (b === undefined || b === null) {
    return {};
  }
  if (Buffer.isBuffer(b)) {
    try {
      return JSON.parse(b.toString("utf8") || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "string") {
    try {
      return JSON.parse(b || "{}");
    } catch {
      return null;
    }
  }
  if (typeof b === "object") {
    return b;
  }
  return {};
}

function normalizeHostname(host) {
  return String(host || "")
    .replace(/^www\./i, "")
    .toLowerCase();
}

function originsMatch(a, b) {
  try {
    const ua = new URL(a.startsWith("http") ? a : `https://${a}`);
    const ub = new URL(b.startsWith("http") ? b : `https://${b}`);
    if (ua.protocol !== ub.protocol) return false;
    return normalizeHostname(ua.hostname) === normalizeHostname(ub.hostname);
  } catch {
    return a.replace(/\/$/, "") === b.replace(/\/$/, "");
  }
}

function clampStr(s, max) {
  const t = String(s ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max);
}

function normalizeSupabaseUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    return u.origin;
  } catch {
    return s.replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "");
  }
}

function isValidEmail(s) {
  const t = String(s ?? "").trim();
  if (t.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function originAllowed(req) {
  const raw = process.env.CONTACT_ALLOWED_ORIGINS;
  if (!raw || !String(raw).trim()) return true;
  const allowed = String(raw)
    .split(",")
    .map((x) => x.trim().replace(/\/$/, ""))
    .filter(Boolean);
  if (!allowed.length) return true;

  const origin = String(req.headers.origin || "").trim().replace(/\/$/, "");
  const referer = String(req.headers.referer || "").trim();
  const vercel = process.env.VERCEL_URL;

  for (const a of allowed) {
    if (origin && originsMatch(origin, a)) return true;
    if (referer) {
      try {
        const ro = new URL(referer).origin.replace(/\/$/, "");
        if (originsMatch(ro, a)) return true;
      } catch {
        if (referer === a || referer.startsWith(a + "/")) return true;
      }
    }
  }
  if (vercel) {
    const v = `https://${vercel}`.replace(/\/$/, "");
    if (origin && originsMatch(origin, v)) return true;
    if (referer) {
      try {
        const ro = new URL(referer).origin.replace(/\/$/, "");
        if (originsMatch(ro, v)) return true;
      } catch {
        if (referer === v || referer.startsWith(v + "/")) return true;
      }
    }
  }
  return false;
}

/** Reflect request Origin when allowlisted (browser fetch from another port). */
function applyCors(req, res) {
  const origin = String(req.headers.origin || "").trim();
  if (origin && originAllowed(req)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(req, res, status, obj) {
  applyCors(req, res);
  res.status(status).json(obj);
}

module.exports = {
  readJsonBody,
  normalizeSupabaseUrl,
  isValidEmail,
  clampStr,
  originAllowed,
  applyCors,
  sendJson,
};
