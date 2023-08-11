export const javascript = `import fs from "fs";

export const textToImage = async () => {
  const path =
    "https://api.stability.ai/v1/generation/{engineID}/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer {apiKey}"
  };

  const body = {
    {OPTIONS}
  };

  const response = fetch(
    path,
    {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  
  if (!response.ok) {
    throw new Error(\`Non-200 response: \${await response.text()}\`)
  }
  
  const responseJSON = await response.json();
  
  responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
      \`./out/txt2img_\${image.seed}.png\`,
      Buffer.from(image.base64, 'base64')
    )
  })
};
`;

export const python = `
import base64
import requests
import os

url = "https://api.stability.ai/v1/generation/{engineID}/text-to-image"

body = {
  {OPTIONS}
}

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer {apiKey}",
}

response = requests.post(
  url,
  headers=headers,
  json=body,
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

# make sure the out directory exists
if not os.path.exists("./out"):
    os.makedirs("./out")

for i, image in enumerate(data["artifacts"]):
    with open(f'./out/txt2img_{image["seed"]}.png', "wb") as f:
        f.write(base64.b64decode(image["base64"]))
`;
