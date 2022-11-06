import html2canvas from "html2canvas";

export const saveImage = (name, element) => {
  html2canvas(element).then((canvas) => {
    const base64Image = canvas.toDataURL("image/png");
    var anchor = document.createElement("a");
    anchor.setAttribute("href", base64Image);
    anchor.setAttribute("download", name);
    anchor.click();
    anchor.remove();
  });
};
