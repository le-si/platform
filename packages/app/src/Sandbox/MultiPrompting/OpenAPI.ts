import { OpenAPI } from "@stability/sdk";

export async function request(
  apiKey: string,
  engineId: string,
  prompts: OpenAPI.TextToImageRequestBody["text_prompts"],
  style?: OpenAPI.TextToImageRequestBody["style_preset"],
  cfgScale?: OpenAPI.TextToImageRequestBody["cfg_scale"],
  steps?: OpenAPI.TextToImageRequestBody["steps"]
): Promise<[string | undefined, Error | undefined]> {
  const body = JSON.stringify({
    text_prompts: prompts,
    style_preset: style,
    samples: 1,
    cfg_scale: cfgScale,
    steps,
  } satisfies OpenAPI.TextToImageRequestBody);

  let response: Response;
  try {
    response = await fetch(
      `${
        import.meta.env.VITE_API_REST_URL
      }/v1/generation/${engineId}/text-to-image` satisfies OpenAPI.TextToImageRequestPath,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "image/png",
          Authorization: `Bearer ${apiKey}`,
        },

        body,
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
