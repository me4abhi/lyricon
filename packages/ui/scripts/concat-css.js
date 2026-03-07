/**
 * Concatenates tokens CSS + component CSS into dist/index.css.
 * Run after tsup. Reads .tmp-tokens.css and dist/index.css, writes dist/index.css, then removes .tmp-tokens.css.
 * Run from packages/ui (process.cwd() = packages/ui).
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");

const tmpTokens = path.join(pkgRoot, ".tmp-tokens.css");
const distIndex = path.join(pkgRoot, "dist", "index.css");

if (!fs.existsSync(tmpTokens)) {
  console.error("[concat-css] .tmp-tokens.css not found. Run build-styles.js first.");
  process.exit(1);
}

if (!fs.existsSync(distIndex)) {
  console.error("[concat-css] dist/index.css not found. Run tsup first.");
  process.exit(1);
}

const tokensCss = fs.readFileSync(tmpTokens, "utf8");
const componentCss = fs.readFileSync(distIndex, "utf8");
const combined = [tokensCss.trim(), componentCss.trim()].join("\n\n");

fs.writeFileSync(distIndex, combined, "utf8");
fs.unlinkSync(tmpTokens);

console.log("[concat-css] dist/index.css now includes tokens + components.");
