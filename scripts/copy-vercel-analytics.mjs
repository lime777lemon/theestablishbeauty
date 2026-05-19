#!/usr/bin/env node
/** Copy @vercel/analytics browser bundle for static <script type="module"> usage. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "node_modules/@vercel/analytics/dist/index.mjs");
const destDir = path.join(root, "vendor/vercel-analytics");
const dest = path.join(destDir, "index.mjs");

if (!fs.existsSync(src)) {
  console.error("Run npm install first (@vercel/analytics missing).");
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied", dest);
