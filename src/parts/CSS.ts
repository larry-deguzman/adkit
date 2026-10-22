import { AdObject } from "../types/AdTypes";
const CSS = (adObject: AdObject) => {
  const { size } = adObject;
  const [width, height] = size.split("x");
  return `
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .ad-container {
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        background: #f1f5f9;
        color: #1e293b;
    }

    .ad-container h1 {
        font-size: 24px;
    }
    .ad-container button {
        padding: 10px 16px;
        border: 0;
        border-radius: 4px;
        background: #2563eb;
        color: white;
        cursor: pointer;
    }`;
};
export default CSS;
