# Image-to-Image

Initial images (aka: 'init' images) are a powerful tool for generating or modifying new images based on a starting point. Also known as Image-to-Image, we'll show you how to use the gRPC API to generate an image, and then further modify that image as our initial image with a prompt.

## TypeScript Example {#typescript-example}

### 1. Copy over the generated client files... {#copy-generated-files}

Follow all the steps [here](/docs/getting-started/typescript-client) to setup the gRPC client and helper functions.

### Given the following ... {#init-image}

`512x512` init image residing at `./init_image.png`:

![Init Image](/TSgRPCImageToImageInit.png)

### 2. Make the request... {#make-the-request}

```ts
import fs from "fs";
import * as Generation from "./generation/generation_pb";
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "./helpers";

// DreamStudio uses an Image Strength slider to control the influence of the initial image on the final result.
// This "Image Strength" is a value from 0-1, where values close to 1 yield images very similar to the init_image
// and values close to 0 yield imges wildly different than the init_image. This is just another way to calculate
// stepScheduleStart, which is done via the following formula: stepScheduleStart = 1 - imageStrength.  This means
// an image strength of 40% would result in a stepScheduleStart of 0.6.
const imageStrength = 0.4;
const request = buildGenerationRequest("stable-diffusion-xl-1024-v0-9", {
  type: "image-to-image",
  prompts: [
    {
      text: "crayon drawing of rocket ship launching from forest",
    },
  ],
  stepScheduleStart: 1 - imageStrength,
  initImage: fs.readFileSync("./init_image.png"),
  seed: 121245125,
  samples: 1,
  cfgScale: 8,
  steps: 50,
  sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
});

executeGenerationRequest(client, request, metadata)
  .then(onGenerationComplete)
  .catch((error) => {
    console.error("Failed to make image-to-image request:", error);
  });
```

### Resulting image written to `image-<seed>.png`:

![Resulting Image](/TSgRPCImageToImageResult.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
