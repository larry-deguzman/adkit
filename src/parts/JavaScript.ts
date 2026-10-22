const JavaScript = () => {
  return `
  (() => {
    const clickTAG = window.clickTAG;
    const button = document.getElementById("cta");

    if (button) {
      button.addEventListener("click", () => {
        if (window.clickTAG) {
          window.open(window.clickTAG, "_blank");
        }
      });
    }
  })()
`;
};

export default JavaScript;
