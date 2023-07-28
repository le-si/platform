import JSZip from "jszip";

import { FineTuning } from "~/FineTuning";

export namespace Input {
  const handleZipFile = async (zipFile: Blob) => {
    const zip = await JSZip.loadAsync(zipFile);

    for (const fileName in zip.files) {
      const file = zip.files[fileName];
      if (!file || file.dir) continue;

      if (file.name.match(/\.zip$/i)) {
        const nestedZipFile = await file.async("blob");
        await handleZipFile(nestedZipFile);
        continue;
      }

      if (!file.name.match(/\.(jpe?g|png)$/i)) continue;

      const base64 = await file.async("base64");
      const mimeType = file.name.endsWith(".png") ? "image/png" : "image/jpeg";

      const dataUrl = `data:${mimeType};base64,${base64}`;
      addResizedFile(dataUrl);
    }
  };

  const addResizedFile = (url: URLString) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = url;
    image.onload = async () => {
      if (!context) return cleanUp();

      const { size } = FineTuning.Upload.constraints();

      const clamp = (value: number) =>
        Math.max(size.min, Math.min(value, size.max));

      const clampedWidth = clamp(image.width);
      const clampedHeight = clamp(image.height);

      const isScalingUp =
        clampedWidth / image.width > 1 || clampedHeight / image.height > 1;

      const canvasScale = (isScalingUp ? Math.max : Math.min)(
        clampedWidth / image.width,
        clampedHeight / image.height
      );

      const canvasWidth = Math.round(clamp(image.width * canvasScale));
      const canvasHeight = Math.round(clamp(image.height * canvasScale));

      const scale = Math.max(
        canvasWidth / image.width,
        canvasHeight / image.height
      );

      const scaledImageWidth = image.width * scale;
      const scaledImageHeight = image.height * scale;

      const x = (canvasWidth - scaledImageWidth) / 2;
      const y = (canvasHeight - scaledImageHeight) / 2;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.drawImage(image, x, y, scaledImageWidth, scaledImageHeight);

      FineTuning.Uploads.addFromURL(canvas.toDataURL());
      cleanUp();
    };

    const cleanUp = () => {
      canvas.remove();
      image.remove();
    };
  };

  export const trigger = () => {
    const fileInput = document.createElement("input");
    document.body.appendChild(fileInput);

    fileInput.multiple = true;
    fileInput.type = "file";
    fileInput.accept = "image/*,.zip";

    fileInput.onchange = async () => {
      if (!fileInput.files) return;

      for (const file of fileInput.files) {
        if (file.type === "application/zip") {
          await handleZipFile(file);
          continue;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
          event.target &&
            typeof event.target.result === "string" &&
            addResizedFile(event.target.result);
        };
      }
    };

    fileInput.click();
    fileInput.remove();
  };
}
