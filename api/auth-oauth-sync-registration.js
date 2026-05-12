/**
 * POST /api/auth-oauth-sync-registration
 * After Google (or other Supabase OAuth), upsert public.consumer_registrations /
 * business_registrations so Table Editor matches email sign-up.
 *
 * Headers: Authorization: Bearer <user access_token from OAuth session>
 * Body: { target: "consumer"|"business" }
 */

const { createClient } = require("@supabase/supabase-js");
const {
  readJsonBody,
  normalizeSupabaseUrl,
  isValidEmail,
  clampStr,
  originAllowed,
  applyCors,
  sendJson,
} = require("./auth-shared");
const { getSupabaseJsOptions } = require("./supabase-node-options");

function getSupabaseAdmin() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) return null;
  return createClient(url, key, getSupabaseJsOptions());
}

function bearerToken(req) {
  const raw = String(req.headers.authorization || "").trim();
  const m = /^Bearer\s+(.+)$/i.exec(raw);
  return m ? m[1].trim() : "";
}

function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyCors(req, res);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return sendJson(req, res, 405, { ok: false, error: "method_not_allowed" });
  }
  if (!originAllowed(req)) {
    return sendJson(req, res, 403, { ok: false, error: "forbidden" });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return sendJson(req, res, 503, { ok: false, error: "server_misconfigured" });
  }

  const token = bearerToken(req);
  if (!token) {
    return sendJson(req, res, 401, { ok: false, error: "missing_token" });
  }

  const body = readJsonBody(req);
  if (body === null) {
    return sendJson(req, res, 400, { ok: false, error: "invalid_json" });
  }

  const target = String(body.target || "").trim();
  if (target !== "consumer" && target !== "business") {
    return sendJson(req, res, 400, { ok: false, error: "invalid_target" });
  }

  admin.auth
    .getUser(token)
    .then(async ({ data, error }) => {
      if (error || !data || !data.user) {
        return sendJson(req, res, 401, {
          ok: false,
          error: "invalid_token",
          detail: error ? String(error.message || error) : undefined,
        });
      }
      const user = data.user;
      const email = String(user.email || "").trim().toLowerCase();
      if (!isValidEmail(email)) {
        return sendJson(req, res, 400, { ok: false, error: "missing_email" });
      }

      const meta = user.user_metadata || {};
      const uid = user.id;

      if (target === "consumer") {
        const display_name = clampStr(
          meta.display_name || meta.full_name || meta.name || email.split("@")[0] || "User",
          200
        );
        const row = { user_id: uid, email, display_name };
        const { error: upErr } = await admin
          .from("consumer_registrations")
          .upsert(row, { onConflict: "user_id" });
        if (upErr) {
          return sendJson(req, res, 500, {
            ok: false,
            error: "upsert_failed",
            detail: String(upErr.message || upErr),
          });
        }
        return sendJson(req, res, 200, { ok: true, flow: "consumer" });
      }

      const contact_name = clampStr(
        meta.contact_name || meta.full_name || meta.name || email.split("@")[0] || "User",
        200
      );
      const company = clampStr(
        meta.company || meta.organization_name || "（Googleで登録・要確認）",
        200
      );
      const phone = clampStr(meta.phone || meta.phone_number || "—", 80);
      const department = meta.department ? clampStr(meta.department, 200) : null;

      const row = {
        user_id: uid,
        email,
        company,
        department,
        phone,
        contact_name,
      };
      const { error: upErr } = await admin
        .from("business_registrations")
        .upsert(row, { onConflict: "user_id" });
      if (upErr) {
        return sendJson(req, res, 500, {
          ok: false,
          error: "upsert_failed",
          detail: String(upErr.message || upErr),
        });
      }
      return sendJson(req, res, 200, { ok: true, flow: "business" });
    })
    .catch((e) => {
      return sendJson(req, res, 500, {
        ok: false,
        error: "server_error",
        detail: String(e && e.message ? e.message : e),
      });
    });
}

module.exports = handler;
