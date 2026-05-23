#!/usr/bin/env node
/** Regenerate assets/site-logo.png (transparent bg, black logo) from assets/logo-source.png */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "assets", "logo-source.png");
const OUT = path.join(ROOT, "assets", "site-logo.png");

async function main() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const j = i * channels;
    const r = data[j];
    const g = data[j + 1];
    const b = data[j + 2];
    const a = data[j + 3];
    const isLogo = a > 200 && r < 48 && g < 48 && b < 48;
    rgba[i * 4] = 0;
    rgba[i * 4 + 1] = 0;
    rgba[i * 4 + 2] = 0;
    rgba[i * 4 + 3] = isLogo ? 255 : 0;
  }

  const png = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  await writeFile(OUT, png);
  const meta = await sharp(png).metadata();
  console.log(`wrote site-logo.png ${meta.width}x${meta.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
