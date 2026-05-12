/**
 * POST /api/auth-sign-up — create user via Supabase Admin API (no email confirmation by default).
 * Body: { flow: "consumer"|"business", email, password, display_name?, company?, department?, phone?, contact_name?, consent? }
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

function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyCors(req, res);
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

  const body = readJsonBody(req);
  if (body === null) {
    return sendJson(req, res, 400, { ok: false, error: "invalid_json" });
  }

  const flow = String(body.flow || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (flow !== "consumer" && flow !== "business") {
    return sendJson(req, res, 400, { ok: false, error: "invalid_flow" });
  }
  if (!isValidEmail(email)) {
    return sendJson(req, res, 400, { ok: false, error: "invalid_email" });
  }
  if (flow === "consumer" && password.length < 8) {
    return sendJson(req, res, 400, { ok: false, error: "password_too_short" });
  }
  if (flow === "business" && password.length < 10) {
    return sendJson(req, res, 400, { ok: false, error: "password_too_short" });
  }

  const display_name = clampStr(body.display_name, 200);
  const company = clampStr(body.company, 200);
  const department = clampStr(body.department, 200);
  const phone = clampStr(body.phone, 80);
  const contact_name = clampStr(body.contact_name, 200);

  if (flow === "consumer") {
    if (!display_name) {
      return sendJson(req, res, 400, { ok: false, error: "missing_display_name" });
    }
    if (body.consent !== true) {
      return sendJson(req, res, 400, { ok: false, error: "consent_required" });
    }
  } else {
    if (!company || !phone || !contact_name) {
      return sendJson(req, res, 400, { ok: false, error: "missing_business_fields" });
    }
    if (body.consent !== true) {
      return sendJson(req, res, 400, { ok: false, error: "consent_required" });
    }
  }

  const emailConfirm =
    String(process.env.SUPABASE_AUTH_EMAIL_AUTO_CONFIRM || "")
      .trim()
      .toLowerCase() === "true" ||
    String(process.env.SUPABASE_AUTH_EMAIL_AUTO_CONFIRM || "").trim() === "1";

  const user_metadata =
    flow === "consumer"
      ? {
          account_type: "consumer",
          display_name,
        }
      : {
          account_type: "business",
          company,
          department: department || undefined,
          phone,
          contact_name,
        };

  const app_metadata = {
    account_type: flow === "consumer" ? "consumer" : "business",
  };

  admin.auth.admin
    .createUser({
      email,
      password,
      email_confirm: emailConfirm,
      user_metadata,
      app_metadata,
    })
    .then(async ({ data, error }) => {
      if (error) {
        const msg = String(error.message || "");
        const code = String(error.code || "");
        if (
          code === "email_exists" ||
          /already\s*registered|already\s*been\s*registered|duplicate/i.test(msg)
        ) {
          return sendJson(req, res, 409, { ok: false, error: "email_exists" });
        }
        return sendJson(req, res, 400, {
          ok: false,
          error: "sign_up_failed",
          detail: msg || code || undefined,
        });
      }
      const user = data.user;
      if (!user || !user.id) {
        return sendJson(req, res, 500, { ok: false, error: "server_error" });
      }

      const uid = user.id;
      const table =
        flow === "consumer" ? "consumer_registrations" : "business_registrations";
      const row =
        flow === "consumer"
          ? { user_id: uid, email, display_name }
          : {
              user_id: uid,
              email,
              company,
              department: department || null,
              phone,
              contact_name,
            };

      const { error: insertError } = await admin.from(table).insert(row);
      if (insertError) {
        try {
          await admin.auth.admin.deleteUser(uid);
        } catch {
          /* best-effort rollback */
        }
        return sendJson(req, res, 500, {
          ok: false,
          error: "registration_record_failed",
          detail: String(insertError.message || insertError),
        });
      }

      return sendJson(req, res, 201, {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
        },
      });
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
