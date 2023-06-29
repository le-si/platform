# Inpainting + Masking

Our API also offers the ability to inpaint (the ability to modify a specific section of an image) via masking out a specific area of an image, and then generating new details based on a provided prompt.

In the example below, this is accomplished by providing the gRPC API with a grayscale mask image, where black pixels represent the areas that will be replaced by the prompt, and the white pixels represent areas that are to be untouched by the inpainting process, and gray pixels result in partial replacement.

## TypeScript Example {#typescript-example}

### 1. Copy over the generated client files... {#copy-generated-files}

Follow all the steps [here](/docs/getting-started/typescript-client) to setup the gRPC client and helper functions.

### Given the following ... {#init-image}

- `512x512` init image residing at `./init_image.png`:

![Init Image](/Inpainting-C2.png)

- `512x512` mask image residing at `./mask_image.png`:

![Mask Image](/Inpainting-C4.png)

### 2. Make the request... {#make-the-request}

```typescript
import fs from "fs";
import * as Generation from "./generation/generation_pb";
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from "./helpers";

const request = buildGenerationRequest("stable-diffusion-xl-beta-v2-2-2", {
  type: "image-to-image-masking",
  initImage: fs.readFileSync("./init_image.png"),
  maskImage: fs.readFileSync("./mask_image.png"),
  prompts: [
    {
      text: "rainbow galactic nebula, star-filled sky, spectral, psychedelic, masterpiece",
    },
  ],
  seed: 1823948,
  samples: 1,
  cfgScale: 8,
  steps: 30,
  sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
});

executeGenerationRequest(client, request, metadata)
  .then(onGenerationComplete)
  .catch((error) => {
    console.error("Failed to make image-to-image-masking request:", error);
  });
```

### Resulting image written to `image-<seed>.png`:

![Result](/Inpainting-C5.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
