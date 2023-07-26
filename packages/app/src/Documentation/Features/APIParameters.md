# gRPC API Parameters

When calling the gRPC API, `prompt` is the only required variable. Provided alone, this call will generate an image according to our default generation settings.

The gRPC response will contain a `finish_reason` specifying the outcome of your request in addition to the delivered asset. If the `finish_reason` is `filter`, this means our safety filter has been activated and the resulting image will be blurred. This is by design.

These calls can be assigned a variety of parameters, some of which have an effect on pricing, as detailed below.

### Prompt {#prompt}

Accepts singular as well as multiple prompts with weights. See the [Multi-prompting](/docs/features/multi-prompting) documentation for more information.

| Parameter | Default | Affects Pricing? |
| --------- | ------- | ---------------- |
| prompt    | none    | No               |

### Height {#height}

Measured in pixels. Pixel limit is `1048576`, so technically any dimension is allowable within that amount.

| Parameter | Default | Typical | Allowable                                | Affects Pricing? |
| --------- | ------- | ------- | ---------------------------------------- | ---------------- |
| height    | 512     | 512     | <a href="#about-dimensions">See Below<a> | Yes              |

### Width {#width}

Measured in pixels. Pixel limit is `1048576`, so technically any dimension is allowable within that amount.

| Parameter | Default | Typical | Allowable                                | Affects Pricing? |
| --------- | ------- | ------- | ---------------------------------------- | ---------------- |
| width     | 512     | 512     | <a href="#about-dimensions">See Below<a> | Yes              |

### About Dimensions {#about-dimensions}

A minimum of `262k` pixels and a maximum of `1.04m` pixels are recommended when generating images with `512px` models, and a minimum of `589k` pixels and a maximum of `1.04m` pixels for `768px` models. The true pixel limit is `1048576`.

To avoid the dreaded `6N IndexError` it is advised to use `64px` increments when choosing an aspect ratio. Popular ratio combinations for `512px` models include `1536 x 512` and `1536 x 384`, while `1536 x 640` and `1024 x 576` are recommended for `768px` models.

For `512px` models, the minimum useful sizes are `192-256` in one dimension. For `768px` models the minimum useful size is `384` in one dimension.

Generating images under the recommended dimensions may result in undesirable artifacts.

**Note: `stable-diffusion-xl-beta-v2-2-2` AKA `SDXL Beta v0.8` comes with some special considerations with regard to the dimensions it can generate images at:**

`stable-diffusion-xl-beta-v2-2-2` is a `512px` model and can generate images at a maximum of either `512 x 896` or `896 x 512`.

If either the width or the height (but not both) of an image generation request is greater than `512px`, the other side (width or height, respectively) cannot be beyond `512px` in dimension.

**Note: `stable-diffusion-xl-1024-v0-9` AKA `SDXL v0.9` and `stable-diffusion-xl-1024-v1-0` AKA `SDXL v1.0` come with some special considerations with regard to the dimensions they can generate images at:**

`stable-diffusion-xl-1024-v0-9` and `stable-diffusion-xl-1024-v1-0` are `1024px` models. However, they have also been trained to support multiple aspect ratios, a clear improvement over previous models that would often see repeated subjects / concepts in wide or tall aspect ratio generations.

`stable-diffusion-xl-1024-v0-9` and `stable-diffusion-xl-1024-v1-0` support generating images at the following dimensions:

- `1024 x 1024`

- `1152 x 896`

- `896 x 1152`

- `1216 x 832`

- `832 x 1216`

- `1344 x 768`

- `768 x 1344`

- `1536 x 640`

- `640 x 1536`

<br/>

### Steps {#steps}

Affects the number of diffusion steps performed on the requested generation.

| Parameter | Default | Typical | Allowable | Affects Pricing? |
| --------- | ------- | ------- | --------- | ---------------- |
| steps     | 30      | 30-50   | 10-150    | Yes              |

### Samples {#samples}

Number of images to generate. Allows for batch image generations.

| Parameter   | Default | Typical | Allowable | Affects Pricing? |
| ----------- | ------- | ------- | --------- | ---------------- |
| num_samples | 1       | 1-9     | 1-10      | Yes              |

### CFG Scale {#cfg_scale}

Dictates how closely the engine attempts to match a generation to the provided prompt. v2-x models respond well to lower CFG (IE: 4-8), where as v1-x models respond well to a higher range (IE: 7-14) and SDXL models respond well to a wider range (IE: 4-12).

| Parameter | Default | Typical | Allowable | Affects Pricing? |
| --------- | ------- | ------- | --------- | ---------------- |
| cfg_scale | 7.0     | 4-14    | 1-35      | No               |

### Engine {#engine}

Engine (model) to use. Available engines:

- stable-diffusion-v1
- stable-diffusion-v1-5
- stable-diffusion-512-v2-0
- stable-diffusion-768-v2-0
- stable-diffusion-512-v2-1
- stable-diffusion-768-v2-1
- (`SDXL`) stable-diffusion-xl-beta-v2-2-2
  - **Note:** This model has special pricing considerations. For additional information please check out the [Pricing](/pricing) page.
- (`SDXL`) stable-diffusion-xl-1024-v0-9
  - **Note:** This model has special pricing considerations. For additional information please check out the [Pricing](/pricing) page.
- (`SDXL`) stable-diffusion-xl-1024-v1-0
  - **Note:** This model has special pricing considerations. For additional information please check out the [Pricing](/pricing) page.
- stable-inpainting-v1-0
- stable-inpainting-512-v2-0
- esrgan-v1-x2plus
- stable-diffusion-x4-latent-upscaler

| Parameter | Default                       | Typical                       | Allowable                      | Affects Pricing?               |
| --------- | ----------------------------- | ----------------------------- | ------------------------------ | ------------------------------ |
| engine    | stable-diffusion-xl-1024-v0-9 | stable-diffusion-xl-1024-v0-9 | <a href="#engine">See Above<a> | <a href="#engine">See Above<a> |

### Image Upscaler {#image-upscaler}

Dictates the parameters sent to our image upscaling engine. Check out the examples on our [Image Upscaling](/docs/features/image-upscaling) documentation to learn how to execute an image upscaling call via our gRPC API.

| Parameter             | Default     | Typical     | Allowable                                                                                 | Affects Pricing? |
| --------------------- | ----------- | ----------- | ----------------------------------------------------------------------------------------- | ---------------- |
| stability_api.upscale | init_image= | init_image= | init_image=, width= **or** height= (but not both), seed=, steps=, cfg_scale=, and prompt= | Yes              |

### Sampler {#sampler}

Sampling engine to use. If no sampler is declared, an appropriate default sampler for the declared inference engine will be applied automatically.

Available samplers:

- ddim
- plms
- k_euler
- k_euler_ancestral
- k_heun
- k_dpm_2
- k_dpm_2_ancestral
- k_dpmpp_2s_ancestral
- k_dpmpp_2m
- k_dpmpp_sde

| Parameter | Default    | Typical    | Allowable      | Affects Pricing? |
| --------- | ---------- | ---------- | -------------- | ---------------- |
| sampler   | k_dpmpp_2m | k_dpmpp_2m | Check Comments | No               |

### Seed {#seed}

Seed for random latent noise generation. Deterministic if not being used in concert with CLIP Guidance. If not specified, or set to `0`, then a random value will be used.

| Parameter | Default    | Allowable      | Affects Pricing? |
| --------- | ---------- | -------------- | ---------------- |
| seed      | 0 (random) | 0 - 2147483647 | No               |

### Initial Image {#init_image}

Image used to initialize the diffusion process, in lieu of random noise.

| Parameter  | Default | Typical | Allowable | Affects Pricing? |
| ---------- | ------- | ------- | --------- | ---------------- |
| init_image | none    | png     | png       | No               |

### Mask Image {#mask_image}

Grayscale mask to exclude diffusion from some pixels. Must be the same dimensions as `init_image`.

| Parameter  | Default | Typical | Allowable | Affects Pricing? |
| ---------- | ------- | ------- | --------- | ---------------- |
| mask_image | none    | png     | png       | No               |

### Start Schedule {#start_schedule}

Skips a proportion of the start of the diffusion steps, allowing the `init_image` to influence the final generated image. Lower values will result in more influence from the `init_image`, while higher values will result in more influence from the diffusion steps. (e.g. a value of 0 would simply return you the `init_image`, where a value of 1 would return you a completely different image.)

| Parameter      | Default | Typical | Allowable | Affects Pricing? |
| -------------- | ------- | ------- | --------- | ---------------- |
| start_schedule | 0       | 0.6     | 0.0 - 1.0 | No               |

### End Schedule {#end_schedule}

Skips a proportion of the end of the diffusion steps, allowing the `init_image` to influence the final generated image. Lower values will result in more influence from the `init_image`, while higher values will result in more influence from the diffusion steps.

| Parameter    | Default | Typical | Allowable | Affects Pricing? |
| ------------ | ------- | ------- | --------- | ---------------- |
| end_schedule | 0       | 0.1     | 0.0 - 1.0 | No               |

### CLIP Guidance {#clip_guidance}

CLIP guidance preset, use with ancestral sampler for best results.

| Parameter       | Default | Typical                               | Allowable                       | Affects Pricing? |
| --------------- | ------- | ------------------------------------- | ------------------------------- | ---------------- |
| guidance_preset | none    | generation.GUIDANCE_PRESET_FAST_GREEN | \_NONE \_FAST_GREEN \_FAST_BLUE | No               |

### Prefix {#prefix}

SDK CLI switch for assigning artifact prefixes.

| Parameter | Default  | Affects Pricing? |
| --------- | -------- | ---------------- |
| prefix    | --prefix | No               |

### Store {#store}

SDK CLI switch indicating whether to write out artifacts.

| Parameter | Default    | Affects Pricing? |
| --------- | ---------- | ---------------- |
| no-store  | --no-store | No               |

### Show {#show}

SDK CLI switch for opening artifacts using PIL.

| Parameter | Default | Affects Pricing? |
| --------- | ------- | ---------------- |
| show      | --show  | No               |

**Note:** This is a living page and may not be representative of all of the parameters currently available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
