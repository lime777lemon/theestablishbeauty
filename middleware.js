/**
 * Edge access control for admin / internal tools.
 * robots.txt alone does not protect pages — these routes require HTTP Basic Auth.
 *
 * Env (Vercel Production / Preview):
 * - ADMIN_BASIC_USER (optional, default "admin")
 * - ADMIN_BASIC_PASSWORD (required in production; if unset, returns 503)
 */

export const config = {
  matcher: [
    "/contact-inquiries-admin.html",
    "/sql-editor.html",
    "/supplier-dashboard.html",
    "/stripe-connect-sinatra/:path*",
  ],
};

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Establish Beauty Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function misconfigured() {
  return new Response(
    "Admin page protection is not configured (set ADMIN_BASIC_PASSWORD on Vercel).",
    {
      status: 503,
      headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export default function middleware(request) {
  const expectedUser = String(process.env.ADMIN_BASIC_USER || "admin").trim() || "admin";
  const expectedPass = String(process.env.ADMIN_BASIC_PASSWORD || "").trim();

  if (!expectedPass) {
    const host = request.headers.get("host") || "";
    if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
      return; // local preview without env
    }
    return misconfigured();
  }

  const header = request.headers.get("authorization") || "";
  const match = /^Basic\s+(.+)$/i.exec(header);
  if (!match) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(match[1].trim());
  } catch {
    return unauthorized();
  }

  const colon = decoded.indexOf(":");
  if (colon < 0) return unauthorized();
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);

  if (!timingSafeEqual(user, expectedUser) || !timingSafeEqual(pass, expectedPass)) {
    return unauthorized();
  }

  return; // continue to static asset / page
}
