// Rasterize the OG card SVG → PNG. Run after editing public/og-default.svg:
//   node scripts/build-og.mjs
// (Most social crawlers do not render SVG og:image, so a PNG is required.)
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const svg = readFileSync(root + "og-default.svg");

await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile(root + "og-default.png");

console.log("wrote public/og-default.png");
