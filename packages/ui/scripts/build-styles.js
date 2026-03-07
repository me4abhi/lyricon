/**
 * Compiles @lyricon/styles SCSS to CSS at build time.
 * Output is written to .tmp-tokens.css (consumed by concat-css.js after tsup).
 * Run from packages/ui (process.cwd() = packages/ui).
 */
import { compile } from "sass";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");

// Resolve styles entry: workspace link or node_modules
const stylesPkg = path.join(pkgRoot, "node_modules", "@lyricon", "styles");
const stylesEntry = path.join(stylesPkg, "src", "index.scss");
const stylesSrc = path.join(stylesPkg, "src");

if (!fs.existsSync(stylesEntry)) {
  console.error(
    `[build-styles] Styles entry not found: ${stylesEntry}. Ensure @lyricon/styles is installed (pnpm install).`
  );
  process.exit(1);
}

const outFile = path.join(pkgRoot, ".tmp-tokens.css");

try {
  const result = compile(stylesEntry, {
    loadPaths: [stylesSrc],
    style: "expanded",
  });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, result.css, "utf8");
  console.log("[build-styles] Wrote .tmp-tokens.css");
} catch (err) {
  console.error("[build-styles] Sass compile failed:", err.message);
  process.exit(1);
}
