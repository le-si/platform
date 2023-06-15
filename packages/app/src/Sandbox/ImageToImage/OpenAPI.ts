import { OpenAPI } from "@stability/sdk";

export async function request(
  apiKey: string,
  engineId: string,
  initImage: Blob,
  positivePrompt: string,
  negativePrompt?: string,
  style?: OpenAPI.ImageToImageRequestBody["style_preset"],
  cfgScale?: OpenAPI.ImageToImageRequestBody["cfg_scale"],
  seed?: OpenAPI.ImageToImageRequestBody["seed"],
  steps?: OpenAPI.ImageToImageRequestBody["steps"],
  initStrength?: OpenAPI.ImageToImageRequestBody["image_strength"]
): Promise<[string | undefined, Error | undefined]> {
  const prompts = [
    {
      text: positivePrompt,
      weight: 1,
    },
  ];

  if (negativePrompt) {
    prompts.push({
      text: negativePrompt,
      weight: -1,
    });
  }

  const body = {
    init_image_mode: "IMAGE_STRENGTH",
    "text_prompts[0][text]": prompts[0]?.text,
    "text_prompts[0][weight]": prompts[0]?.weight,
    "text_prompts[1][text]": prompts[1]?.text,
    "text_prompts[1][weight]": prompts[1]?.weight,
    style_preset: style,
    samples: 1,
    cfg_scale: cfgScale,
    seed,
    steps,
  };

  const formData = new FormData()
  for (const [key, value] of Object.entries(body)) {
    if (!value) continue;
    formData.append(key, value?.toString() ?? "")
  }

  formData.append("init_image", initImage);

  let response: Response;
  try {
    response = await fetch(
      `${
        import.meta.env.VITE_API_REST_URL
      }/v1/generation/${engineId}/image-to-image` satisfies OpenAPI.ImageToImageRequestPath,
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
