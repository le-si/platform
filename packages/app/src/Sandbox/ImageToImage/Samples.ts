export const typescript = `
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'node:fs';

// NOTE: This example is using a NodeJS FormData library.
// Browsers should use their native FormData class.
// React Native apps should also use their native FormData class.
const formData = new FormData();
formData.append('init_image', fs.readFileSync('../init_image.png'));
formData.append('init_image_mode', 'IMAGE_STRENGTH');
formData.append('image_strength', {imageStrength});
formData.append('text_prompts[0][text]', "{positivePrompt}");
formData.append('text_prompts[0][weight]', 1);
formData.append('text_prompts[1][text]', "{negativePrompt}");
formData.append('text_prompts[1][weight]', -1);
formData.append('cfg_scale', {cfgScale});
formData.append('steps', {steps});

const response = await fetch(
  "https://api.stability.ai/v1/generation/{engineID}/image-to-image",
  {
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      Accept: 'application/json',
      Authorization: "Bearer {apiKey}",
    },
    body: formData,
  }
);

if (!response.ok) {
  throw new Error(\`Non-200 response: \${await response.text()}\`)
}

interface GenerationResponse {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}

const responseJSON = (await response.json()) as GenerationResponse;

responseJSON.artifacts.forEach((image, index) => {
  fs.writeFileSync(
    \`out/v1_img2img_\${index}.png\`,
    Buffer.from(image.base64, 'base64')
  )
});
`;

export const javascript = `
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'node:fs';

// NOTE: This example is using a NodeJS FormData library.
// Browsers should use their native FormData class.
// React Native apps should also use their native FormData class.
const formData = new FormData();
formData.append('init_image', fs.readFileSync('../init_image.png'));
formData.append('init_image_mode', 'IMAGE_STRENGTH');
formData.append('image_strength', {imageStrength});
formData.append('text_prompts[0][text]', "{positivePrompt}");
formData.append('text_prompts[0][weight]', 1);
formData.append('text_prompts[1][text]', "{negativePrompt}");
formData.append('text_prompts[1][weight]', -1);
formData.append('cfg_scale', {cfgScale});
formData.append('steps', {steps});

const response = await fetch(
  "https://api.stability.ai/v1/generation/{engineID}/image-to-image",
  {
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      Accept: 'application/json',
      Authorization: "Bearer {apiKey}",
    },
    body: formData,
  }
);

if (!response.ok) {
  throw new Error(\`Non-200 response: \${await response.text()}\`)
}

const responseJSON = await response.json();

responseJSON.artifacts.forEach((image, index) => {
  fs.writeFileSync(
    \`out/v1_img2img_\${index}.png\`,
    Buffer.from(image.base64, 'base64')
  )
});
`;

export const python = `
import base64
import os
import requests

response = requests.post(
    "https://api.stability.ai/v1/generation/{engineID}/image-to-image",
    headers={
        "Accept": "application/json",
        "Authorization": f"Bearer {apiKey}"
    },
    files={
        "init_image": open("../init_image.png", "rb")
    },
    data={
        "image_strength": {imageStrength},
        "init_image_mode": "IMAGE_STRENGTH",
        "text_prompts[0][text]": "{positivePrompt}",
        "text_prompts[0][weight]": 1,
        "text_prompts[1][text]": "{negativePrompt}",
        "text_prompts[1][weight]": -1,
        "style_preset": "{style}",
        "height": {height},
        "width": {width},
        "cfg_scale": {cfgScale},
        "seed": {seed},
        "steps": {steps},
    }
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

for i, image in enumerate(data["artifacts"]):
    with open(f"./out/v1_img2img_{i}.png", "wb") as f:
        f.write(base64.b64decode(image["base64"]))
`;
