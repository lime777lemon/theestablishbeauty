/**
 * GET /api/instagram-login-check
 *
 * Admin-only check for the Instagram Login token in INSTAGRAM_ACCESS_TOKEN.
 * Reads the token on the server, calls graph.instagram.com /me, and reports
 * whether the account matches @theestablishbeauty. Does not post.
 *
 * Auth: HTTP Basic, same ADMIN_BASIC_USER / ADMIN_BASIC_PASSWORD as other admin tools.
 * Middleware also matches this path. The handler checks again so the route stays
 * closed if the edge matcher is skipped.
 */

const crypto = require("crypto");

const EXPECTED_USERNAME = "theestablishbeauty";
const EXPECTED_USER_ID = "17841459394450820";
const GRAPH_ME = "https://graph.instagram.com/v26.0/me";

function cleanEnv(value) {
  let out = String(value ?? "")
    .trim()
    .replace(/[\r\n\t]/g, "");
  if (
    (out.startsWith('"') && out.endsWith('"')) ||
    (out.startsWith("'") && out.endsWith("'"))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function surroundingStripped(value) {
  let out = String(value ?? "").trim();
  if (
    out.length >= 2 &&
    ((out.startsWith('"') && out.endsWith('"')) ||
      (out.startsWith("'") && out.endsWith("'")))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function tokenShape(raw) {
  const value = String(raw ?? "");
  const trimmed = value.trim();
  const stripped = surroundingStripped(value);
  const startsWithBearer =
    trimmed.startsWith("Bearer") || stripped.startsWith("Bearer");
  return {
    starts_with_bearer: startsWithBearer,
    has_internal_whitespace: /\s/.test(trimmed),
    has_literal_backslash_n_or_r: value.includes("\\n") || value.includes("\\r"),
    non_empty_after_strip: stripped.length > 0,
  };
}

function timingSafeEqualStr(a, b) {
  const left = Buffer.from(String(a), "utf8");
  const right = Buffer.from(String(b), "utf8");
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function readBasic(req) {
  const header = String(req.headers.authorization || req.headers.Authorization || "");
  const match = /^Basic\s+(\S+)/i.exec(header.trim());
  if (!match) return null;
  let decoded = "";
  try {
    decoded = Buffer.from(match[1], "base64").toString("utf8");
  } catch {
    return null;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return null;
  return { user: decoded.slice(0, colon), pass: decoded.slice(colon + 1) };
}

function redact(text, token) {
  let out = String(text ?? "");
  if (token && token.length > 8) out = out.split(token).join("[redacted]");
  out = out.replace(/IG[A-Za-z0-9_-]{20,}/g, "[redacted]");
  out = out.replace(/EAA[A-Za-z0-9]+/g, "[redacted]");
  out = out.replace(/access_token=[^&\s"]+/gi, "access_token=[redacted]");
  out = out.replace(/Bearer\s+\S+/gi, "Bearer [redacted]");
  out = out.replace(/Basic\s+\S+/gi, "Basic [redacted]");
  return out.slice(0, 240);
}

function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  return res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return send(res, 405, { ok: false, reason: "method_not_allowed" });
  }

  const expectedUser = cleanEnv(process.env.ADMIN_BASIC_USER) || "admin";
  const expectedPass = cleanEnv(process.env.ADMIN_BASIC_PASSWORD);
  if (!expectedPass) {
    return send(res, 503, { ok: false, reason: "admin_unconfigured" });
  }

  const creds = readBasic(req);
  if (
    !creds ||
    !timingSafeEqualStr(creds.user, expectedUser) ||
    !timingSafeEqualStr(creds.pass, expectedPass)
  ) {
    res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Establish Beauty Admin", charset="UTF-8"'
    );
    return send(res, 401, { ok: false, reason: "unauthorized" });
  }

  const token = cleanEnv(process.env.INSTAGRAM_ACCESS_TOKEN);
  const shape = tokenShape(process.env.INSTAGRAM_ACCESS_TOKEN);
  if (!token) {
    return send(res, 503, { ok: false, reason: "token_missing", token_shape: shape });
  }

  const url = new URL(GRAPH_ME);
  url.searchParams.set("fields", "user_id,username");
  url.searchParams.set("access_token", token);

  let status = 0;
  let text = "";
  try {
    const response = await fetch(url, { method: "GET" });
    status = response.status;
    text = await response.text();
  } catch {
    console.error("instagram-login-check: graph request failed");
    return send(res, 502, { ok: false, reason: "api_error", http_status: 0 });
  }

  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!json || json.error || status < 200 || status >= 300) {
    const code = json && json.error && json.error.code != null ? Number(json.error.code) : null;
    const message = redact(
      (json && json.error && json.error.message) || "",
      token
    );
    const expired =
      code === 463 ||
      /session has expired|\bexpired\b/i.test(message);
    console.error("instagram-login-check: graph error", status, code || "");
    return send(res, 200, {
      ok: false,
      reason: expired ? "token_expired" : "api_error",
      http_status: status,
      error_code: code,
      error_message: message || null,
      token_shape: shape,
    });
  }

  const username = json.username != null ? String(json.username) : "";
  const userId = json.user_id != null ? String(json.user_id) : "";
  const usernameMatch = username.toLowerCase() === EXPECTED_USERNAME;
  const userIdMatch = userId === EXPECTED_USER_ID;

  return send(res, 200, {
    ok: usernameMatch && userIdMatch,
    reason: usernameMatch && userIdMatch ? "match" : "mismatch",
    username_match: usernameMatch,
    user_id_match: userIdMatch,
    username: username || null,
    user_id: userId || null,
    token_shape: shape,
  });
};
