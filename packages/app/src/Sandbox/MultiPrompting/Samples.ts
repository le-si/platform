export const javascript = `import fs from "fs";

const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: "Bearer {apiKey}"
  },
  body: JSON.stringify({
    {OPTIONS}
  })
};

const response = await fetch(
  "https://api.stability.ai/v1/generation/{engineID}/text-to-image",
  options
)
  
if (!response.ok) {
  throw new Error(\`Non-200 response: \${await response.text()}\`)
}

const responseJSON = await response.json()

responseJSON.artifacts.forEach((image, index) => {
  fs.writeFileSync(
    \`./out/txt2img_\${image.seed}.png\`,
    Buffer.from(image.base64, 'base64')
  )
});
`;

export const python = `
import base64
import os
import requests

body = {
  {OPTIONS}
}

response = requests.post(
  "https://api.stability.ai/v1/generation/{engineID}/text-to-image",
  headers={
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer {apiKey}",
  },
  json=body,
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

for i, image in enumerate(data["artifacts"]):
    with open(f"./out/txt2img_{image["seed"]}.png", "wb") as f:
        f.write(base64.b64decode(image["base64"]))
`;
