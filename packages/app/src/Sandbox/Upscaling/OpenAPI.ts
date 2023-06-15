import { OpenAPI } from "@stability/sdk";

export async function request(
  apiKey: string,
  engineId: string,
  initImage: Blob,
  height: number,
): Promise<[string | undefined, Error | undefined]> {

  const formData = new FormData();
  formData.append("height", height.toString());
  formData.append("image", initImage);

  let response: Response;
  try {
    response = await fetch(
      `${
        import.meta.env.VITE_API_REST_URL
      }/v1/generation/${engineId}/image-to-image/upscale` satisfies OpenAPI.UpscaleRequestPath,
      {
        method: "POST",
        headers: {
          Accept: "image/png",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );
  } catch (error: any) {
    return [undefined, error];
  }

  if (!response.ok) {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const json = await response.json();
      return [undefined, Error(JSON.stringify(json, null, 2))];
    } else {
      return [undefined, Error(await response.text())];
    }
  }

  const image = await response.blob();
  const url = URL.createObjectURL(image);

  return [url, undefined];
}
