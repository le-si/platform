export const typescript = `
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'node:fs';

// NOTE: This example is using a NodeJS FormData library.
// Browsers should use their native FormData class.
// React Native apps should also use their native FormData class.
const formData = new FormData();
formData.append('image', fs.readFileSync('../init_image.png'));
formData.append('height', {height});

const response = await fetch(
  "https://api.stability.ai/v1/generation/{engineID}/image-to-image/upscale",
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
formData.append('image', fs.readFileSync('../init_image.png'));
formData.append('height', {height});

const response = await fetch(
  "https://api.stability.ai/v1/generation/{engineID}/image-to-image/upscale",
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
    "https://api.stability.ai/v1/generation/{engineID}/image-to-image/upscale",
    headers={
        "Accept": "application/json",
        "Authorization": f"Bearer {apiKey}"
    },
    files={
        "image": open("../init_image.png", "rb")
    },
    data={
        "height": {height},
    }
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

for i, image in enumerate(data["artifacts"]):
    with open(f"./out/v1_img2img_{i}.png", "wb") as f:
        f.write(base64.b64decode(image["base64"]))
`;
