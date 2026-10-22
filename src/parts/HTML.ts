import { AdObject } from "../types/AdTypes";

const HTML = (adObject: AdObject) => {
  const { size } = adObject;
  const [width, height] = size.split("x");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AdKit Creative</title>
  <link rel="stylesheet" href="./ad.css">
</head>
<body>
  <div id="ad" class="ad-container" data-size="${size}">
    <h1>Hello, AdKit!</h1>
    <p>Your ${size} creative is ready.</p>
    <button id="cta">Learn More</button>
  </div>

  <script src="./ad.js"></script>
</body>
</html>`;
};

export default HTML;
