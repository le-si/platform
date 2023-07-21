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

      const dimension = Math.max(image.width, image.height);

      canvas.width = dimension;
      canvas.height = dimension;

      context.drawImage(
        image,
        (canvas.width - image.width) / 2,
        (canvas.height - image.height) / 2
      );

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
