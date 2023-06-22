# 💰 Credits + Billing

---

Paid credits are required to use both [DreamStudio](https://beta.dreamstudio.ai) and the API.

All new users get `200` free credits upon creating an account.

## What is a Credit? {#what-is-a-credit}

`1` credit is intended to equal the cost of generating `1` image using the default settings on [DreamStudio](https://beta.dreamstudio.ai)...

![`1` credit is intended to equal the cost of generating `1` image using the default settings on [DreamStudio](https://beta.dreamstudio.ai)...](media/images/billing/DreamStudioDefaultSettings.png "`1` credit is intended to equal the cost of generating `1` image using the default settings on [DreamStudio](https://beta.dreamstudio.ai)...")

Your `200` initial free credits represent anywhere from `1,000` to `10` images depending on the settings used.

## Buying Credits {#buying-credits}

Once you've depleted your credits, you can purchase more through your [DreamStudio](https://dreamstudio.pages.dev/membership?tab=home) account.

Credits are most easily purchased in `$10` increments, however, you can make higher volume purchases through the `API Partners` section of [DreamStudio](https://beta.dreamstudio.ai/membership?tab=home)...

![Credits are most easily purchased in `$10` increments, however, you can make higher volume purchases through the `API Partners` section of [DreamStudio](https://beta.dreamstudio.ai/membership?tab=home)...](media/images/billing/DreamStudioPricing.png "Credits are most easily purchased in `$10` increments, however, you can make higher volume purchases through the `API Partners` section of [DreamStudio](https://beta.dreamstudio.ai/membership?tab=home)...")

## ⚙️ Settings and Credit Usage {#settings-and-credit-usage}

Using default settings, `1` credit is used per image generation.

Here are various step counts and pixel dimensions along with their credit usage...

| Steps | 512 × 512 | 512 × 768 | 512 × 1024 | 768 × 768 | 768 × 1024 | 1024 × 1024 |
| ----- | --------- | --------- | ---------- | --------- | ---------- | ----------- |
| 10    | 0.2       | 0.5       | 0.8        | 0.9       | 1.3        | 1.9         |
| 25    | 0.5       | 1.2       | 1.9        | 2.3       | 3.3        | 4.7         |
| 50    | 1.0       | 2.4       | 3.8        | 4.6       | 6.6        | 9.4         |
| 75    | 1.5       | 3.6       | 5.7        | 6.9       | 9.9        | 14.1        |
| 100   | 2.0       | 4.8       | 7.6        | 9.2       | 13.2       | 18.8        |
| 150   | 3.0       | 7.2       | 11.4       | 13.8      | 19.8       | 28.2        |

_Note:_ Cost increases faster with higher step counts and larger pixel dimensions.

```typescript
import { OpenAPI } from "@stability/sdk";

export const textToImage = async () => {
  const path: OpenAPI.TextToImageRequestPath =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image";

  const headers: OpenAPI.TextToImageRequestHeaders = {
    Accept: "image/png",
    Authorization: "Bearer YOUR API KEY"
  };

  console.log('Hello, world!');

  const body: OpenAPI.TextToImageRequestBody = {
    width: 512,
    height: 512,
    seed: 0,
    steps: 50,
    cfg_scale: 7,
    style_preset: "enhance",
    text_prompts: [
      {
        text: "",
        weight: 1,
      },
      {
        text: "",
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
```
