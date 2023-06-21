export const typescript = `import { OpenAPI } from "@stability/sdk";

export const textToImage = async () => {
  const path: OpenAPI.TextToImageRequestPath =
    "https://api.stability.ai/v1/generation/{engineID}/text-to-image";

  const headers: OpenAPI.TextToImageRequestHeaders = {
    Accept: "image/png",
    Authorization: "Bearer {apiKey}"
  };

  const body: OpenAPI.TextToImageRequestBody = {
    width: {width},
    height: {height},
    seed: {seed},
    steps: {steps},
    cfg_scale: {cfgScale},
    style_preset: "{style}",
    text_prompts: [
      {
        text: "{positivePrompt}",
        weight: 1,
      },
      {
        text: "{negativePrompt}",
        weight: -1,
      }
    ]
  };

  return fetch(
    path,
    {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    }
  );
};
`;

export const javascript = `export const textToImage = async () => {
  const path =
    "https://api.stability.ai/v1/generation/{engineID}/text-to-image";

  const headers = {
    Accept: "image/png",
    Authorization: "Bearer {apiKey}"
  };

  const body = {
    width: {width},
    height: {height},
    seed: {seed},
    steps: {steps},
    cfg_scale: {cfgScale},
    style_preset: "{style}",
    text_prompts: [
      {
        text: "{positivePrompt}",
        weight: 1,
      },
      {
        text: "{negativePrompt}",
        weight: -1,
      }
    ]
  };

  return fetch(
    path,
    {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    }
  );
};
`;

export const python = `import requests

url = "https://api.stability.ai/v1/generation/{engineID}/text-to-image"

body = {
  "width": {width},
  "height": {height},
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfgScale},
  "style_preset": "{style}",
  "text_prompts": [
    {
      "text": "{positivePrompt}",
      "weight": 1,
    },
    {
      "text": "{negativePrompt}",
      "weight": -1,
    }
  ],
}

headers = {
  "Accept": "image/png",
  "Content-Type": "application/json",
  "Authorization": "Bearer {apiKey}",
}

response = requests.post(
  url,
  headers=headers,
  json=body,
)

image = response.content

with open("image.png", "wb") as file:
  file.write(image)
`;
