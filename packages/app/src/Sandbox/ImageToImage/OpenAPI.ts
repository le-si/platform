import { OpenAPI } from "@stability/sdk";
import { StylePresets } from "~/Sandbox/StylePresets";
import { TextPrompts } from "~/Sandbox/TextPrompts";
import { toError } from "~/Utilities";

export async function request(
  apiKey: string,
  engineID: string,
  initImage: Blob,
  positivePrompt: string,
  negativePrompt?: string,
  style?: OpenAPI.ImageToImageRequestBody["style_preset"],
  cfgScale?: OpenAPI.ImageToImageRequestBody["cfg_scale"],
  seed?: OpenAPI.ImageToImageRequestBody["seed"],
  steps?: OpenAPI.ImageToImageRequestBody["steps"],
  initStrength?: OpenAPI.ImageToImageRequestBody["image_strength"]
): Promise<[string | undefined, Error | undefined]> {
  const prompts = TextPrompts.toArray(positivePrompt, negativePrompt);

  const body = {
    init_image_mode: "IMAGE_STRENGTH",
    image_strength: initStrength,
    "text_prompts[0][text]": prompts[0]?.text,
    "text_prompts[0][weight]": prompts[0]?.weight,
    "text_prompts[1][text]": prompts[1]?.text,
    "text_prompts[1][weight]": prompts[1]?.weight,
    ...StylePresets.toJSON(style),
    samples: 1,
    cfg_scale: cfgScale,
    seed,
    steps,
  };

  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (!value) continue;
    formData.append(key, value?.toString() ?? "");
  }

  formData.append("init_image", initImage);

  let response: Response;
  try {
    response = await fetch(
      `${
        import.meta.env.VITE_API_REST_URL
      }/v1/generation/${engineID}/image-to-image` satisfies OpenAPI.ImageToImageRequestPath,
      {
        method: "POST",
        headers: {
          Accept: "image/png",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );
  } catch (error: unknown) {
    return [undefined, toError(error)];
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
