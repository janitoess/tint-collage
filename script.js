const upload = document.getElementById("upload");
const gallery = document.getElementById("gallery");

let baseImage = new Image();

const tintImages = [
  "tints/royalblue.PNG
];

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  baseImage = new Image();

  baseImage.onload = () => {
    console.log("Image loaded"); // debug
  };

  baseImage.src = URL.createObjectURL(file);
});

function generateCollage() {
  gallery.innerHTML = "";

  tintImages.forEach((tintSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const tint = new Image();

    tint.src = tintSrc;

    tint.onload = () => {
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      ctx.drawImage(baseImage, 0, 0);

      ctx.globalAlpha = 0.6;
      ctx.drawImage(tint, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      const div = document.createElement("div");
      div.className = "preview";
      div.appendChild(canvas);

      div.onclick = () => downloadCanvas(canvas);

      gallery.appendChild(div);
    };
  });
}

function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = "tint.png";
  link.href = canvas.toDataURL();
  link.click();
}
