import fs from "node:fs";
import path from "node:path";
import { AdObject } from "../types/AdTypes";
import iFrame from "../parts/iFrame";
import HTML from "../parts/HTML";
import JavaScript from "../parts/JavaScript";
import CSS from "../parts/CSS";

export function createAd(adObject: AdObject) {
  const { width, height } = adObject;
  const size = `${width}x${height}`;
  console.log(`Creating ad with size: ${size}`);
  const publicDir = path.resolve(__dirname, "../../public");

  fs.rmSync(publicDir, { recursive: true, force: true });
  fs.mkdirSync(publicDir, { recursive: true });

  //   generate the js files

  const css = CSS(adObject);
  const iframe = iFrame(adObject);
  const html = HTML(adObject);
  const js = JavaScript(adObject);

  fs.writeFileSync(path.join(publicDir, "index.html"), html);
  fs.writeFileSync(path.join(publicDir, "ad.js"), js);
  fs.writeFileSync(path.join(publicDir, "ad.css"), css);
  fs.writeFileSync(path.join(publicDir, "iframe.html"), iframe);

  console.log(`iFrame created at: ${path.join(publicDir, "iframe.html")}`);
}
