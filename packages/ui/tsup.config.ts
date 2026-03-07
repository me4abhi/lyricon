import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    atoms: "src/atoms.ts",
    molecules: "src/molecules.ts",
    organisms: "src/organisms.ts",
  },
  format: ["esm"],
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
  // React and peer deps must not be bundled so consumers get a single instance
  external: ["react", "react-dom", "@lyricon/styles"],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".css": "css",
    };
  },
  // Emit CSS so consumers can import it
  outExtension() {
    return { js: ".js" };
  },
});
