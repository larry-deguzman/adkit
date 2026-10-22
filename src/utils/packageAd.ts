import fs from "node:fs";
import path from "node:path";
import { transform } from "esbuild";

const SCRIPT_TAG =
  /<script\s+[^>]*?src=["'](\.{0,2}\/?[^"':]+\.js)["'][^>]*>\s*<\/script>/gi;
const STYLE_TAG =
  /<link\s+[^>]*?href=["'](\.{0,2}\/?[^"':]+\.css)["'][^>]*\/?>/gi;

async function minify(code: string, loader: "js" | "css") {
  const result = await transform(code, { loader, minify: true });
  return result.code.trim();
}

async function replaceAsync(
  input: string,
  regex: RegExp,
  replacer: (match: string, file: string) => Promise<string>,
) {
  const matches = [...input.matchAll(regex)];
  const replacements = await Promise.all(
    matches.map((m) => replacer(m[0], m[1])),
  );
  let i = 0;
  return input.replace(regex, () => replacements[i++]);
}

// Reads index.html from `dir`, inlines the minified local JS/CSS files it
// references, and writes the result to `<dir>/package/index.html`.
export async function packageAd(dir: string) {
  const htmlPath = path.join(dir, "index.html");
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`No index.html found in ${dir}`);
  }

  const read = (file: string) => {
    const filePath = path.resolve(dir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Referenced file not found: ${file}`);
    }
    return fs.readFileSync(filePath, "utf8");
  };

  let html = fs.readFileSync(htmlPath, "utf8");

  html = await replaceAsync(html, STYLE_TAG, async (_, file) => {
    const css = await minify(read(file), "css");
    return `<style>${css.replace(/<\/style/gi, "<\\/style")}</style>`;
  });
  html = await replaceAsync(html, SCRIPT_TAG, async (_, file) => {
    const js = await minify(read(file), "js");
    return `<script>${js.replace(/<\/script/gi, "<\\/script")}</script>`;
  });

  const outDir = path.join(dir, "public");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "index.html");
  fs.writeFileSync(outPath, html);
  return outPath;
}
