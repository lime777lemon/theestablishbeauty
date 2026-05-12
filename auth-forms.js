/**
 * Supabase-backed auth: POST /api/auth-sign-up, /api/auth-sign-in (Vercel serverless).
 * Set <body data-auth-mode="consumer-register|consumer-login|business-register|business-login">.
 */
(function () {
  var SESSION_KEY = "establish_sb_session_v1";

  function t(key) {
    return window.siteI18n ? window.siteI18n.t(window.siteI18n.getLang(), key) : "";
  }

  function persistSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {}
  }

  function errKey(code) {
    var m = {
      forbidden: "auth.api.error.forbidden",
      server_misconfigured: "auth.api.error.misconfigured",
      invalid_credentials: "auth.api.error.invalid_credentials",
      email_exists: "auth.api.error.email_exists",
      consent_required: "auth.api.error.consent_required",
      password_too_short: "auth.api.error.password_too_short",
      missing_display_name: "auth.api.error.missing_display_name",
      missing_business_fields: "auth.api.error.missing_business_fields",
      invalid_email: "auth.api.error.invalid_email",
      invalid_json: "auth.api.error.generic",
      invalid_flow: "auth.api.error.generic",
      sign_up_failed: "auth.api.error.generic",
      server_error: "auth.api.error.generic",
      bad_json: "auth.api.error.generic",
      registration_record_failed: "auth.api.error.registration_save",
    };
    return m[code] || "auth.api.error.generic";
  }

  /** Python http.server returns 501 for POST; other static hosts may 404 or return HTML. */
  function isLikelyMissingApiRoute(res) {
    var st = res.status;
    if (st === 501 || st === 405 || st === 404) return true;
    var code = res.data && res.data.error;
    if (!res.httpOk && code === "bad_json") return true;
    return false;
  }

  function noteForFailedAuth(res) {
    if (isLikelyMissingApiRoute(res)) return t("auth.api.error.no_api_host");
    var code = res.data && res.data.error;
    return t(errKey(code));
  }

  function postJson(path, body) {
    return fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    }).then(function (r) {
      return r.text().then(function (text) {
        var data;
        try {
          data = text ? JSON.parse(text) : {};
        } catch (e) {
          data = { ok: false, error: "bad_json" };
        }
        return { httpOk: r.ok, status: r.status, data: data };
      });
    });
  }

  function bindGoogle() {
    document.querySelectorAll("[data-auth-google]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var out = document.querySelector("[data-auth-oauth-note]");
        var mode = document.body.getAttribute("data-auth-mode") || "";
        var target = /^business-/.test(mode) ? "business" : "consumer";
        if (out) {
          out.hidden = false;
          out.textContent = t("auth.oauth.redirecting");
        }
        fetch("/api/auth-supabase-public", { credentials: "same-origin" })
          .then(function (r) {
            return r.json().then(function (data) {
              return { httpOk: r.ok, data: data };
            });
          })
          .then(function (res) {
            if (!res.httpOk || !res.data || !res.data.ok) {
              if (out) {
                var err = res.data && res.data.error;
                if (err === "server_misconfigured") out.textContent = t("auth.api.error.misconfigured");
                else if (err === "forbidden") out.textContent = t("auth.api.error.forbidden");
                else out.textContent = t("auth.oauth.start_failed");
              }
              return null;
            }
            return res.data;
          })
          .then(function (cfg) {
            if (!cfg) return;
            return import("https://esm.sh/@supabase/supabase-js@2.49.1").then(function (mod) {
              var redirectTo =
                window.location.origin +
                "/auth/oauth-callback.html?target=" +
                encodeURIComponent(target);
              var supabase = mod.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
                auth: {
                  persistSession: true,
                  storage: localStorage,
                  storageKey: "establish_sb_gotrue",
                  flowType: "pkce",
                  detectSessionInUrl: false,
                  autoRefreshToken: false,
                },
              });
              return supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: redirectTo, skipBrowserRedirect: false },
              });
            });
          })
          .catch(function () {
            if (out) out.textContent = t("auth.api.network");
          });
      });
    });
  }

  function bindRegister(flow) {
    var form = document.querySelector("[data-auth-form]");
    var note = document.querySelector("[data-auth-form-note]");
    if (!form || !note) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var p1 = form.querySelector('input[name="password"]');
      var p2 = form.querySelector('input[name="password_confirm"]');
      if (p1 && p2 && p1.value !== p2.value) {
        note.textContent = t("auth.api.password_mismatch");
        return;
      }
      var fd = new FormData(form);
      var sub = form.querySelector('button[type="submit"]');
      var body = { flow: flow, email: String(fd.get("email") || "").trim(), password: String(fd.get("password") || "") };
      var consentEl = form.querySelector('input[name="consent"]');
      body.consent = !!(consentEl && consentEl.checked);
      if (flow === "consumer") {
        body.display_name = String(fd.get("display_name") || "").trim();
      } else {
        body.company = String(fd.get("company") || "").trim();
        body.department = String(fd.get("department") || "").trim();
        body.phone = String(fd.get("phone") || "").trim();
        body.contact_name = String(fd.get("contact_name") || "").trim();
      }
      if (sub) sub.disabled = true;
      note.textContent = t("auth.api.sending");
      postJson("/api/auth-sign-up", body)
        .then(function (res) {
          if (sub) sub.disabled = false;
          if (res.httpOk && res.data && res.data.ok) {
            var msg;
            if (res.data.email_sent === true) msg = t("auth.api.register_ok_with_email");
            else if (res.data.email_sent === false) msg = t("auth.api.register_ok_no_mailer");
            else msg = t("auth.api.register_ok");
            note.textContent = msg;
            form.reset();
            return;
          }
          note.textContent = noteForFailedAuth(res);
        })
        .catch(function () {
          if (sub) sub.disabled = false;
          note.textContent = t("auth.api.network");
        });
    });
  }

  function bindLogin(mode) {
    var form = document.querySelector("[data-auth-form]");
    var note = document.querySelector("[data-auth-form-note]");
    if (!form || !note) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var sub = form.querySelector('button[type="submit"]');
      var body = {
        email: String(fd.get("email") || "").trim(),
        password: String(fd.get("password") || ""),
      };
      if (sub) sub.disabled = true;
      note.textContent = t("auth.api.sending");
      postJson("/api/auth-sign-in", body)
        .then(function (res) {
          if (sub) sub.disabled = false;
          if (res.httpOk && res.data && res.data.ok && res.data.session) {
            persistSession(res.data.session);
            note.textContent = t("auth.api.login_ok");
            var href = mode === "business-login" ? "./establish-beauty.html" : "./index.html";
            setTimeout(function () {
              window.location.href = href;
            }, 900);
            return;
          }
          note.textContent = noteForFailedAuth(res);
        })
        .catch(function () {
          if (sub) sub.disabled = false;
          note.textContent = t("auth.api.network");
        });
    });
  }

  function init() {
    bindGoogle();
    var mode = document.body.getAttribute("data-auth-mode") || "";
    if (mode === "consumer-register") bindRegister("consumer");
    else if (mode === "business-register") bindRegister("business");
    else if (mode === "consumer-login" || mode === "business-login") bindLogin(mode);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
