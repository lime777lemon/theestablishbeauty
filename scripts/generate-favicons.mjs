#!/usr/bin/env node
/**
 * Generate favicons (white bg, black logo) from assets/favicon-source.png.
 * Run: npm run favicons
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const SOURCE = path.join(ASSETS, "favicon-source.png");
const LOGO_SQUARE = path.join(ASSETS, "favicon-logo.png");
const ROOT_ICO = path.join(ROOT, "favicon.ico");
const LOGO_WIDTH_FILL = 0.92;
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const SQUARE_ICON_FILL = 0.88;

const OUTPUTS = [
  [16, "favicon-16.png"],
  [32, "favicon-32.png"],
  [48, "favicon-48.png"],
  [180, "apple-touch-icon.png"],
];

function detectLogoMode(data, width, height, channels) {
  let cutout = 0;
  let opaqueBlack = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const j = (y * width + x) * channels;
      const a = data[j + 3];
      if (a === 0) cutout++;
      if (a > 200 && data[j] < 48 && data[j + 1] < 48 && data[j + 2] < 48) opaqueBlack++;
    }
  }
  if (opaqueBlack > 500 && opaqueBlack < cutout * 0.65) return "opaque-black";
  return "transparent-cutout";
}

function decodeAlphaSource(data, width, height, channels) {
  const mode = detectLogoMode(data, width, height, channels);
  const decoded = Buffer.alloc(width * height * channels);
  for (let i = 0; i < width * height; i++) {
    const j = i * channels;
    const r = data[j];
    const g = data[j + 1];
    const b = data[j + 2];
    const a = data[j + 3];
    const isLogo =
      mode === "opaque-black" ? a > 200 && r < 48 && g < 48 && b < 48 : a === 0;
    decoded[j] = 0;
    decoded[j + 1] = 0;
    decoded[j + 2] = 0;
    decoded[j + 3] = isLogo ? 255 : 0;
  }
  return { decoded, mode };
}

/** Build black-on-transparent trimmed mark from favicon-source.png. */
async function buildLogoMark() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const { decoded, mode } = decodeAlphaSource(data, width, height, channels);
  const trimmed = await sharp(decoded, { raw: { width, height, channels } })
    .trim({ threshold: 12 })
    .png()
    .toBuffer();
  const meta = await sharp(trimmed).metadata();
  await writeFile(LOGO_SQUARE, trimmed);
  console.log(`logo from favicon-source.png ${meta.width}x${meta.height} (${mode})`);
  return sharp(trimmed);
}

/** Thicken thin strokes before downscaling to favicon size. */
async function bolden(logoBuf, size) {
  if (size > 48) return logoBuf;
  const img = sharp(logoBuf);
  const meta = await img.metadata();
  const offsets =
    size <= 16
      ? [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]
      : [
          [0, 0],
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];
  const layers = [{ input: logoBuf, top: 0, left: 0 }];
  for (const [dx, dy] of offsets.slice(1)) {
    layers.push({ input: logoBuf, top: dy, left: dx });
  }
  return sharp({
    create: {
      width: meta.width + 1,
      height: meta.height + 1,
      channels: 4,
      background: WHITE,
    },
  })
    .composite(layers)
    .flatten({ background: WHITE })
    .png()
    .toBuffer();
}

async function renderIcon(logoMark, size) {
  const meta = await logoMark.metadata();
  const aspect = meta.width / meta.height;
  const isSquare = Math.abs(aspect - 1) < 0.05;
  const fill = isSquare ? SQUARE_ICON_FILL : LOGO_WIDTH_FILL;
  const logoW = Math.max(1, Math.round(size * fill));
  const logoH = isSquare ? logoW : Math.max(1, Math.round(logoW / aspect));

  let logoBuf = await logoMark
    .clone()
    .resize(logoW, logoH, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .flatten({ background: WHITE })
    .png()
    .toBuffer();

  logoBuf = await bolden(logoBuf, size);
  const placed = await sharp(logoBuf).metadata();
  const left = Math.round((size - placed.width) / 2);
  const top = Math.round((size - placed.height) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: WHITE,
    },
  })
    .composite([{ input: logoBuf, left, top }])
    .flatten({ background: WHITE })
    .png()
    .toBuffer();
}

async function main() {
  const logoMark = await buildLogoMark();
  const pngBySize = new Map();

  for (const [size, name] of OUTPUTS) {
    const png = await renderIcon(logoMark, size);
    pngBySize.set(size, png);
    await writeFile(path.join(ASSETS, name), png);
    console.log(`wrote ${name} (${size}px)`);
  }

  await writeFile(path.join(ASSETS, "favicon-preview.png"), await renderIcon(logoMark, 128));

  const ico = await toIco([pngBySize.get(16), pngBySize.get(32), pngBySize.get(48)]);
  await writeFile(ROOT_ICO, ico);
  await writeFile(path.join(ASSETS, "favicon.ico"), ico);

  const b64 = pngBySize.get(32).toString("base64");
  await writeFile(
    path.join(ASSETS, "favicon.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="The Establish Beauty">
  <image href="data:image/png;base64,${b64}" width="32" height="32"/>
</svg>
`,
  );
  console.log("wrote favicon.ico (16+32+48), favicon.svg, favicon-preview.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
