const JavaScript = () => {
  return `
  (() => {
    const button = document.getElementById("cta");

    button.addEventListener("click", () => {
      if (window.clickTAG) {
        window.open(window.clickTAG, "_blank");
      }
    });
  })()
`;
};

export default JavaScript;
