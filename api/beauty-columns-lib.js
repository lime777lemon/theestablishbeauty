/**
 * Shared storage and generation for the daily beauty column.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const auto = require("../beauty-column-auto");

const LOCAL_FILE = path.join(__dirname, "..", "data", "beauty-columns.json");
const CATEGORIES = new Set(auto.categories || []);

function clampStr(value, max) {
  const text = String(value ?? "").replace(/\s+\n/g, "\n").trim();
  return text.length <= max ? text : text.slice(0, max);
}

function tokyoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function categoryForDate(dateStr) {
  const list = auto.categories || [];
  if (!list.length) return "skincare";
  const day = Date.parse(`${dateStr}T00:00:00+09:00`);
  const index = Math.floor(day / 86400000);
  return list[((index % list.length) + list.length) % list.length];
}

function normalizeSupabaseUrl(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "");
  }
}

function supabaseConfig() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) return null;
  return { url, key };
}

function readBearer(req) {
  const match = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || "").trim());
  return match ? match[1].trim() : "";
}

function timingSafeEqualStr(a, b) {
  const left = Buffer.from(String(a), "utf8");
  const right = Buffer.from(String(b), "utf8");
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function cronAuthorized(req) {
  const secret = String(process.env.CRON_SECRET || "").trim();
  if (secret) return timingSafeEqualStr(readBearer(req), secret);
  return !process.env.VERCEL;
}

function publicColumn(row) {
  return {
    id: row.id,
    publishedOn: row.published_on || row.publishedOn,
    categoryId: row.category_id || row.categoryId,
    titleJa: row.title_ja || row.titleJa,
    titleEn: row.title_en || row.titleEn,
    excerptJa: row.excerpt_ja || row.excerptJa,
    excerptEn: row.excerpt_en || row.excerptEn,
    bodyJa: row.body_ja || row.bodyJa,
    bodyEn: row.body_en || row.bodyEn,
  };
}

function readLocal() {
  try {
    const rows = JSON.parse(fs.readFileSync(LOCAL_FILE, "utf8"));
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeLocal(rows) {
  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(rows.slice(0, 120), null, 2));
}

async function listColumns() {
  const supabase = supabaseConfig();
  if (supabase) {
    const response = await fetch(
      `${supabase.url}/rest/v1/beauty_columns?select=*&order=published_on.desc&limit=30`,
      {
        headers: {
          apikey: supabase.key,
          Authorization: `Bearer ${supabase.key}`,
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      const detail = await response.text();
      if (response.status === 404 || /does not exist|PGRST205|42P01/i.test(detail)) return [];
      const error = new Error(detail.slice(0, 300) || "コラムの取得に失敗しました。");
      error.status = response.status;
      throw error;
    }
    const rows = await response.json();
    return (Array.isArray(rows) ? rows : []).map(publicColumn);
  }
  if (process.env.VERCEL) return [];
  return readLocal().map(publicColumn);
}

async function findByDate(dateStr) {
  const columns = await listColumns();
  return columns.find((column) => column.publishedOn === dateStr) || null;
}

async function insertColumn(column) {
  const supabase = supabaseConfig();
  if (supabase) {
    const response = await fetch(`${supabase.url}/rest/v1/beauty_columns`, {
      method: "POST",
      headers: {
        apikey: supabase.key,
        Authorization: `Bearer ${supabase.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        id: column.id,
        published_on: column.publishedOn,
        category_id: column.categoryId,
        title_ja: column.titleJa,
        title_en: column.titleEn,
        excerpt_ja: column.excerptJa,
        excerpt_en: column.excerptEn,
        body_ja: column.bodyJa,
        body_en: column.bodyEn,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      const error = new Error(detail.slice(0, 300) || "コラムの保存に失敗しました。");
      error.status = response.status;
      throw error;
    }
    const rows = await response.json();
    return publicColumn(Array.isArray(rows) ? rows[0] : column);
  }

  if (process.env.VERCEL) {
    const error = new Error(
      "毎日のコラムを残すには SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY、および beauty_columns テーブルが必要です。",
    );
    error.status = 503;
    throw error;
  }

  const rows = readLocal().filter((row) => (row.publishedOn || row.published_on) !== column.publishedOn);
  rows.unshift(column);
  writeLocal(rows);
  return column;
}

function aiAuth() {
  const gatewayKey = String(process.env.AI_GATEWAY_API_KEY || "").trim();
  const oidc = String(process.env.VERCEL_OIDC_TOKEN || "").trim();
  const directKey = String(process.env.BEAUTY_COLUMN_AI_API_KEY || "").trim();
  if (gatewayKey || oidc) {
    return {
      gateway: true,
      token: gatewayKey || oidc,
      baseUrl: "https://ai-gateway.vercel.sh/v1",
    };
  }
  if (directKey) {
    return {
      gateway: false,
      token: directKey,
      baseUrl: String(process.env.BEAUTY_COLUMN_AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, ""),
    };
  }
  return null;
}

function parseModelJson(text) {
  const raw = String(text || "").trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const source = fenced ? fenced[1] : raw;
  return JSON.parse(source);
}

function normalizeDraft(draft, categoryId) {
  const column = {
    id: crypto.randomUUID(),
    publishedOn: "",
    categoryId,
    titleJa: clampStr(draft.titleJa, 80),
    titleEn: clampStr(draft.titleEn, 120),
    excerptJa: clampStr(draft.excerptJa, 180),
    excerptEn: clampStr(draft.excerptEn, 220),
    bodyJa: clampStr(draft.bodyJa, 4000),
    bodyEn: clampStr(draft.bodyEn, 4000),
  };
  if (!CATEGORIES.has(column.categoryId)) {
    throw new Error("カテゴリが許可リストにありません。");
  }
  if (!column.titleJa || !column.excerptJa || !column.bodyJa || !column.titleEn || !column.bodyEn) {
    throw new Error("生成されたコラムの項目が不足しています。");
  }
  return column;
}

async function generateColumn(dateStr) {
  if (auto.enabled === false) {
    const error = new Error("自動コラムは beauty-column-auto.js で停止中です。");
    error.status = 409;
    throw error;
  }
  const categoryId = categoryForDate(dateStr);
  const auth = aiAuth();
  if (!auth) {
    const error = new Error(
      "AIのキーが未設定です。Vercel に AI_GATEWAY_API_KEY を入れるか、デプロイの VERCEL_OIDC_TOKEN を有効にしてください。",
    );
    error.status = 503;
    throw error;
  }

  const configuredModel = String(process.env.BEAUTY_COLUMN_MODEL || "openai/gpt-4o-mini").trim();
  const model = auth.gateway ? configuredModel : configuredModel.replace(/^openai\//, "");
  const response = await fetch(`${auth.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write one practical beauty column for a Japanese lifestyle site. Reply with JSON only, keys titleJa, titleEn, excerptJa, excerptEn, bodyJa, bodyEn. Everyday care only. No disease diagnosis, no treatment claims, no drug doses, no guaranteed results, no brand names, and no URLs. bodyJa is 500 to 800 Japanese characters in two or three paragraphs separated by a blank line. bodyEn is a faithful English version.",
        },
        {
          role: "user",
          content: `Date: ${dateStr}. Category id: ${categoryId}. Write today's column for that category only.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(detail.slice(0, 300) || "コラムの生成に失敗しました。");
    error.status = response.status >= 400 && response.status < 600 ? response.status : 502;
    throw error;
  }

  const payload = await response.json();
  const text = payload?.choices?.[0]?.message?.content || "";
  const draft = parseModelJson(text);
  const column = normalizeDraft(draft, categoryId);
  column.publishedOn = dateStr;
  return insertColumn(column);
}

module.exports = {
  tokyoDate,
  cronAuthorized,
  listColumns,
  findByDate,
  generateColumn,
};
