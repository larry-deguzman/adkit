import type { AdObject } from "../types/AdTypes.js";

const HTML = (adObject: AdObject) => {
  const { width, height, clickTAG, backgroundColor, textColor, borderColor } =
    adObject;
  const size = `${width}x${height}`;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AdKit Creative</title>
      <link rel="stylesheet" href="./ad.css">
    </head>
    <body style="margin: 0;">
      <div id="ad" class="ad-container" data-size="${size}" style="width: ${width}px; height: ${height}px; overflow: hidden; background: ${backgroundColor}; color: ${textColor};">
        <div class="ad-content" style="padding: 20px; position: relative;">
          <!-- AdKit Creative -->
          <h1 style="font: 24px Arial, sans-serif; margin: 0;">Hello, AdKit!</h1>
          <p>Your ${size} creative is ready.</p>
          <button id="cta" style="
            left: calc(${width}px - 120px);
            top: calc(${height}px - 50px);
            position: absolute;
            padding: 10px 16px;
            border: 0;
            border-radius: 4px;
            background: #2563eb;
            color: white;
            cursor: pointer;">Learn More</button>
          <!-- End AdKit Creative -->
          <!-- Border -->
          <div style="position: absolute; z-index: 1000; top: 0; left: 0;">
            <div style="background-color: ${borderColor}; width: 1px; height: ${height}px;"></div>
            <div style="background-color: ${borderColor}; width: ${width}px; height: 1px; top: 0; position: absolute;"></div>
            <div style="background-color: ${borderColor}; width: 1px; height: ${height}px; left: calc(${width}px - 1px); position: absolute; top: 0;"></div>
            <div style="background-color: ${borderColor}; width: ${width}px; height: 1px; bottom: 0px; position: absolute; left: 0;"></div>
          </div>
          <!-- End Border -->
        </div>
      </div>
      <script src="./ad.js"></script>
    </body>
  </html>
`;
};

export default HTML;
