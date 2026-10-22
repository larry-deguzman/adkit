import { AdObject } from "../types/AdTypes";

const iFrame = (adObject: AdObject) => {
  const { width, height } = adObject;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AdKit iFrame</title>
  </head>
  <body>
    <div
      style="
        margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <iframe
        src="./index.html"
        frameborder="0"
        width="${width}px"
        height="${height}px"
        scrolling="no"
      ></iframe>
      <div>
        <p style="color: black">
          This is an AdKit iFrame container. The ad is ${width}x${height}.
        </p>
      </div>
    </div>
  </body>
</html>`;
};
export default iFrame;
