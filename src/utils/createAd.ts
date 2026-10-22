import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AdObject } from "../types/AdTypes.js";
import iFrame from "../parts/iFrame.js";
import HTML from "../parts/HTML.js";
import JavaScript from "../parts/JavaScript.js";
import CSS from "../parts/CSS.js";

export function createAd(adObject: AdObject) {
  const { width, height } = adObject;
  const size = `${width}x${height}`;
  console.log(`Creating ad with size: ${size}`);
  const publicDir = path.join(
    os.homedir(),
    "Desktop",
    "Adkit",
    new Date().toISOString(),
  );

  fs.mkdirSync(publicDir, { recursive: true });

  //   generate the js files

  const css = CSS(adObject);
  const iframe = iFrame(adObject);
  const html = HTML(adObject);
  const js = JavaScript();

  fs.writeFileSync(path.join(publicDir, "index.html"), html);
  fs.writeFileSync(path.join(publicDir, "ad.js"), js);
  fs.writeFileSync(path.join(publicDir, "ad.css"), css);
  fs.writeFileSync(path.join(publicDir, "iframe.html"), iframe);

  console.log(`iFrame created at: ${path.join(publicDir, "iframe.html")}`);
}
