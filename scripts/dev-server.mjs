/**
 * ローカル開発: 静的ファイル + /api/*（Vercel Functions と同じ api/*.js を直接実行）
 * Python の http.server では POST /api が 501 になるため、npm run dev はこのサーバーを使う。
 *
 * 環境変数: リポジトリ直下の .env.local を未設定キーのみ上書き読込（Supabase など）。
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function loadEnvLocal() {
  const p = path.join(ROOT, ".env.local");
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  for (let line of text.split("\n")) {
    let t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (/^export\s+/i.test(t)) t = t.replace(/^export\s+/i, "").trim();
    const eq = t.indexOf("=");
    if (eq <= 0) continue;
    const key = t.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    if (process.env[key] !== undefined && String(process.env[key]).length > 0) continue;
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

function createVercelLikeRes(nodeRes) {
  let statusCode = 200;
  return {
    status(c) {
      statusCode = c;
      return this;
    },
    json(obj) {
      nodeRes.statusCode = statusCode;
      if (!nodeRes.getHeader("Content-Type")) {
        nodeRes.setHeader("Content-Type", "application/json; charset=utf-8");
      }
      nodeRes.end(JSON.stringify(obj));
    },
    end(chunk) {
      nodeRes.statusCode = statusCode;
      nodeRes.end(chunk);
    },
    setHeader(a, b) {
      nodeRes.setHeader(a, b);
      return this;
    },
    getHeader(a) {
      return nodeRes.getHeader(a);
    },
  };
}

async function readRequestBody(req, maxBytes) {
  const chunks = [];
  let len = 0;
  for await (const ch of req) {
    len += ch.length;
    if (len > maxBytes) throw new Error("request_entity_too_large");
    chunks.push(ch);
  }
  return Buffer.concat(chunks);
}

function buildSyntheticReq(req, url, bodyBuf) {
  const ct = String(req.headers["content-type"] || "");
  let body = undefined;
  if (bodyBuf && bodyBuf.length) {
    if (ct.includes("application/json")) {
      try {
        body = JSON.parse(bodyBuf.toString("utf8"));
      } catch {
        body = null;
      }
    } else {
      body = bodyBuf;
    }
  }
  return {
    method: req.method,
    url: url.pathname + url.search,
    headers: req.headers,
    body,
  };
}

async function runApiHandler(slug, syntheticReq, nodeRes) {
  if (!/^[\w-]+$/.test(slug)) {
    nodeRes.statusCode = 404;
    nodeRes.setHeader("Content-Type", "application/json; charset=utf-8");
    nodeRes.end(JSON.stringify({ error: "invalid_api_path" }));
    return;
  }
  const filePath = path.join(ROOT, "api", `${slug}.js`);
  if (!fs.existsSync(filePath)) {
    nodeRes.statusCode = 404;
    nodeRes.setHeader("Content-Type", "application/json; charset=utf-8");
    nodeRes.end(JSON.stringify({ error: "api_not_found", slug }));
    return;
  }
  const st = fs.statSync(filePath);
  const href = pathToFileURL(filePath).href + `?t=${st.mtimeMs}`;
  const mod = await import(href);
  const handler = mod.default;
  if (typeof handler !== "function") {
    nodeRes.statusCode = 500;
    nodeRes.setHeader("Content-Type", "application/json; charset=utf-8");
    nodeRes.end(JSON.stringify({ error: "handler_not_a_function", slug }));
    return;
  }
  const mockRes = createVercelLikeRes(nodeRes);
  const ret = handler(syntheticReq, mockRes);
  if (ret && typeof ret.then === "function") await ret;
}

function safeResolveStatic(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  let rel = decoded.replace(/^\/+/, "");
  if (!rel || rel.endsWith("/")) rel = path.join(rel, "index.html");
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep) && abs !== ROOT) return null;
  return abs;
}

function serveStatic(absPath, nodeRes) {
  fs.stat(absPath, (err, st) => {
    if (err || !st.isFile()) {
      nodeRes.statusCode = 404;
      nodeRes.end("Not found");
      return;
    }
    const ext = path.extname(absPath).toLowerCase();
    nodeRes.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
    fs.createReadStream(absPath).pipe(nodeRes);
  });
}

loadEnvLocal();

const PORT = parseInt(String(process.env.PORT || "5173"), 10);
const MAX_BODY = 2 * 1024 * 1024;

const server = http.createServer(async (req, nodeRes) => {
  try {
    const host = req.headers.host || `127.0.0.1:${PORT}`;
    const url = new URL(req.url || "/", `http://${host}`);

    if (url.pathname.startsWith("/api/")) {
      const slug = url.pathname.slice(5).split("/").filter(Boolean)[0] || "";
      let bodyBuf = Buffer.alloc(0);
      if (req.method !== "GET" && req.method !== "HEAD") {
        try {
          bodyBuf = await readRequestBody(req, MAX_BODY);
        } catch (e) {
          nodeRes.statusCode = 413;
          nodeRes.end("Payload too large");
          return;
        }
      }
      const syntheticReq = buildSyntheticReq(req, url, bodyBuf);
      await runApiHandler(slug, syntheticReq, nodeRes);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      nodeRes.statusCode = 405;
      nodeRes.end("Method not allowed");
      return;
    }

    let abs = safeResolveStatic(url.pathname === "/" ? "/index.html" : url.pathname);
    if (abs && !fs.existsSync(abs)) {
      const tryHtml = abs + ".html";
      if (fs.existsSync(tryHtml)) abs = tryHtml;
    }
    if (!abs || !fs.existsSync(abs)) {
      nodeRes.statusCode = 404;
      nodeRes.end("Not found");
      return;
    }
    serveStatic(abs, nodeRes);
  } catch (e) {
    console.error(e);
    if (!nodeRes.headersSent) {
      nodeRes.statusCode = 500;
      nodeRes.setHeader("Content-Type", "text/plain; charset=utf-8");
      nodeRes.end("Internal error");
    }
  }
});

server.listen(PORT, () => {
  console.log(
    `[dev-server] http://localhost:${PORT}/  (static + /api/*, .env.local loaded if present)`
  );
});
