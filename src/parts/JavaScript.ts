import type { AdObject } from "../types/AdTypes.js";

const JavaScript = (adObject: AdObject) => {
  return `
  (() => {
    const clickTAG = adObject.clickTAG;
    const button = document.getElementById("cta");

    if (button) {
      button.addEventListener("click", () => {
        if (clickTAG) {
          window.open(clickTAG, "_blank");
        }
      });
    }
  })()
`;
};

export default JavaScript;
