# Image Upscaling

Image upscaling is an effective way to enlarge both local images and images generated via our gRPC API. Rather than generating an image at a larger size, you may be interested in scaling up the dimensions of an image that already suits your needs.

A key advantage of `stable-diffusion-x4-latent-upscaler`, although slower and more expensive than `esrgan-v1-x2plus`, is its ability to use the diffusion process in a similar manner to how our Stable Diffusion models work to increase the perceived level of detail while upscaling the input image.

**Note:** While the `stable-diffusion-x4-latent-upscaler` engine can be invoked via our existing TypeScript client, these additional optional parameters are not yet available:

- `prompt`
- `cfg_scale`
- `steps`
- `seed`

We are working to add support for these parameters to our TypeScript client as soon as possible.

## Pricing {#pricing}

| Upscaler                            | Resolution      | Credit Cost  |
| ----------------------------------- | --------------- | ------------ |
| esrgan-v1-x2plus                    | Any             | 0.2 ($0.002) |
| stable-diffusion-x4-latent-upscaler | 512 x 512       | 8 ($0.08)    |
| stable-diffusion-x4-latent-upscaler | Above 512 x 512 | 12 ($0.12)   |

## Limits {#limits-ts}

Input / output images can be any aspect ratio, however certain pixel counts must be obeyed depending on the engine in use.

| Model                               | Input Image Limit (pixels) | Equivalent Input Image (dimensions) | Output Image Limit (pixels) | Equivalent Output Image (dimensions) |
| ----------------------------------- | -------------------------- | ----------------------------------- | --------------------------- | ------------------------------------ |
| esrgan-v1-x2plus                    | 1048576                    | 1024 x 1024                         | 4194304                     | 2048 x 2048                          |
| stable-diffusion-x4-latent-upscaler | 393216                     | 512 x 768                           | 6291456                     | 2048 x 3072                          |

<img src="/imageupscalersbs.png" alt="image upscaler side-by-side comparison" style="max-height: 40rem"/>

## TypeScript Example {#typescript-example}

### 1. Copy over the generated client files... {#copy-generated-files}

Follow all the steps [here](/docs/getting-started/typescript-client) to setup the gRPC client and helper functions.

### Given the following init image {#init-image}

![InitImage](/img2upscale.png)

### 2. Make the request... {#make-the-request}

```typescript
import fs from "fs";
import * as Generation from "./generation/generation_pb";
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "./helpers";

const request = buildGenerationRequest("esrgan-v1-x2plus", {
  type: "upscaling",
  upscaler: Generation.Upscaler.UPSCALER_ESRGAN,
  initImage: fs.readFileSync("./init_image.png"),
});

executeGenerationRequest(client, request, metadata)
  .then(onGenerationComplete)
  .catch((error) => {
    console.error("Failed to upscale image:", error);
  });
```

### Resulting image:

![OutputImage](/imgupscaled.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
