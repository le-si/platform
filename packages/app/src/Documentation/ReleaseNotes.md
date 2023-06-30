# SDXL v0.9 Release {#sdxl-v0-9-release}

<i>June 27th, 2023</i>

## Overview

We're excited to announce the release of **Stable Diffusion XL v0.9**, the newest model in the SDXL series! Building on the successful release of the Stable Diffusion XL beta, **SDXL v0.9** brings marked improvements in image quality and composition detail. Please be sure to check out [our blog post](https://stability.ai/blog/sdxl-09-stable-diffusion) for more comprehensive details on the **SDXL v0.9** release.

## What's New

**SDXL v0.9**, trained at a base resolution of `1024 x 1024`, produces massively improved image and composition detail over its predecessor.

**Prompt:**`A wolf in Yosemite National Park, chilly nature documentary film photography`

**Negative Prompt:**`3d render, smooth, plastic, blurry, grainy, low-resolution, anime, deep-fried, oversaturated`

**Left Model:** `stable-diffusion-xl-beta-v2-2-2` AKA `SDXL v0.8` **Right Model:** `stable-diffusion-xl-1024-v0-9` AKA `SDXL v0.9`

![](/Stability+AI+SDXL.9+wolf.png)

**SDXL v0.9** has also been trained to handle multiple aspect ratios, a clear improvement over previous models that would often see repeated subjects / concepts in wide or tall aspect ratio generations.

**Prompt:**`A wolf in Yosemite National Park, chilly nature documentary film photography`

**Negative Prompt:**`3d render, smooth, plastic, blurry, grainy, low-resolution, anime, deep-fried, oversaturated`

**Dimensions:** `1344x768`

**Model:** `stable-diffusion-xl-1024-v0-9` AKA `SDXL v0.9`

![](/SDXL-v0-9-wide-wolf.png)

### API

- Introduced support for the `stable-diffusion-xl-1024-v0-9` model engine to the API (gRPC SDK + REST), which brings with it new pricing considerations. Please check the [SDXL v0.9 Pricing Table](/docs/getting-started/credits-and-billing#sdxl-pricing-tables) for additional information.
- `stable-diffusion-xl-1024-v0-9` is now the default engine for the API. If you wish to use a different engine, you must specify it in your request.
- `stable-diffusion-xl-1024-v0-9` supports a variety of aspect ratios. Please check the [API Parameters](/docs/features/api-parameters#about-dimensions) page for additional information.

<br/>
<hr/>

# Stable Animation SDK Release {#stable-animation-sdk-release}

<i>May 11th, 2023</i>

## Overview

We are excited to announce the release of the [**Stable Animation SDK**](/docs/features/animation), a powerful tool designed to empower artists and developers by leveraging Stable Diffusion to creating stunning animations!

Explore the possibilities by generating animations using various inputs: text prompts (without images), source images, or source videos. Animate with all of our Stable Diffusion models, including Stable Diffusion XL, at your fingertips.

Check out the three ways to create animations:

1. **Text to Animation**: Input a text prompt and adjust various parameters to generate an animation.
2. **Text Input + Initial Image Input**: Provide an initial image as the starting point for the animation, combined with a text prompt to generate the final output animation.
3. **Input video + Text input**: Use an initial video as the basis for the animation, fine-tuning parameters to create the final output animation guided by a text prompt.

## What's New

### API

- Added support for the Stable Animation SDK to the API (gRPC SDK only). Check out the [docs](/docs/features/animation) to learn more.

## Breaking Changes

We've introduced a minor breaking change with this release. The utility function `image_to_prompt` has been moved from `stability_sdk.client` to `stability_sdk.utils`, and its parameters have been updated:

- Old: `image_to_prompt(im, init: bool = False, mask: bool = False)`
- New: `image_to_prompt(image: Image.Image, type: generation.ArtifactType=generation.ARTIFACT_IMAGE)`

This function helps package init images as artifacts in the gRPC Prompt message.

<br/>
<hr/>

# Style Presets / Client ID Support {#style-presets}

<i>Apr. 17th 2023</i>

## Overview

We're excited to announce that we've released support for style presets to our API!

Style presets are a way to apply pre-defined styles to your images. These are the same style presets available in [DreamStudio](https://dreamstudio.ai/). Style presets are currently only available in our REST API, with support in Stability for Blender and gRPC coming soon.

We're excited to see what you create with them in your own integrations!

_`Dog in a forest`, generated with the `digital-art` style preset using SDXL._<br/>
![](/dog_digital_art.png "Dog in a forest")

_`Dog in a forest`, generated with the `cinematic` style preset using SDXL._<br/>
![](/dog_enhance.png "Dog in a forest")

If you're using our REST API, you can now use style presets by passing the `style_preset` parameter to the `text-to-image`, `image-to-image` and `image-to-image/masking` endpoints. Check out the [REST API docs](/rest-api#tag/v1generation/operation/textToImage) for more information.

## What's New

### API

- Added support for style presets via the REST API. Check out the [docs](/rest-api#tag/v1generation/operation/textToImage) to learn more.
- Added support for the `Extras` field in REST. This field allows you to pass additional information to the generation service for certain beta features.
- Added support for passing a `Stability-Client-ID` header to the REST API. This allows Stability to track usage of the API on a per-client basis, and is used in some internal tools. This is not required for normal usage of the API.

<br/>
<hr/>

# SDXL Release {#sdxl-release}

<i>Apr. 14th 2023</i>

## Overview

We're excited to announce that we've released support for SDXL to our API! Please be sure to check out [our blog post](https://stability.ai/blog/stable-diffusion-xl-beta-available-for-api-customers-and-dreamstudio-users) on SDXL's release for more information.

## What's New

### API

- Added support for the `stable-diffusion-xl-beta-v2-2-2` model engine to the API (gRPC SDK + REST). This engine comes with special pricing considerations, please visit the [API Parameters](/docs/features/api-parameters#engine) page to learn more.

Here's a short summary of some of SDXL's capabilities, taken as an excerpt from [our blog post](https://stability.ai/blog/stable-diffusion-xl-beta-available-for-api-customers-and-dreamstudio-users) on SDXL's release:

- Next-level photorealism capabilities.

- Enhanced image composition and face generation.

- Rich visuals and jaw-dropping aesthetics.

- Use of shorter prompts to create descriptive imagery.

- Greater capability to produce legible text.

#### Note: `stable-diffusion-xl-beta-v2-2-2` comes with some special considerations with regard to the dimensions it can generate images at:

- `stable-diffusion-xl-beta-v2-2-2` can generate images at a maximum of either `512x896` or `896x512`. As usual, dimensions must be divisible by `64px` when considering the size of an image generation request.

- If either the width or the height (but not both) of an image generation request is greater than `512px`, the other side (width or height, respectively) cannot be beyond `512px` in dimension.

An example of some stunning results generated by SDXL:

![](/SDXLExample1.png)

<br/>
<hr/>

# Image Upscaling API and Integrations Release {#image-upscaling-release}

<i>Mar. 21st 2023</i>

## Overview

We are excited to announce that support for image upscaling has been added to our API! The Image Upscaler is a tool that allows you to upscale images and animation frames using our ESRGAN-based upscaler. It is currently available in our Stability for Blender and Stability for Photoshop plugins, as well as our gRPC and REST APIs. This update also brings a number of other fixes and improvements in each integration.

Check out the docs to learn how to use the Upscaler in [Photoshop](/docs/integrations/photoshop/upscaler), [Blender](/docs/integrations/photoshop/upscaler), and via our [API](/docs/features/image-upscaling?tab=python).

If you are using our gRPC SDK, you can now use the Upscaler by calling the `Upscale` method on the `Stability` service. Check out the [gRPC docs](/docs/features/image-upscaling) for more information. REST support for the upscaler is also available [here](/rest-api#tag/v1generation/operation/upscaleImage).

## What's New

### API

- Added support for image upscaling via the API. Check out the [docs](/docs/features/image-upscaling?tab=python) to learn more.

### Photoshop

- Added the Stability Upscaler - this is a new feature that lets you upscale your layers and documents in Photoshop using the Stability SDK. Click on the 'Upscaler' tab to try it out.
- Fixed some issues related to inpainting with DALL-E 2.
- Updated the Stability SDK version to latest.
- Updated the plugin icon to reflect its status as a Stability product.
- Fixed a number of layout bugs related to scrolling and loading new diffusion results.

### Blender

- Added the Stability Upscaler - this is a new feature that lets you upscale your render results and textures in Photoshop using the Stability SDK. Click on the 'Upscaler' feature at the top of the addon panel to try it out.
- Added more extensive error handling for REST API request failures.
- Added a timeout to avoid hangs when the underlying generation service times out.
- Fixed a number of bugs reported by users.

<br/>
<hr/>

# REST API v1 {#rest-api-v1}

<i>Mar. 21st 2023</i>

## Overview

We are excited to announce the REST API v1 is officially live! The documentation has been integrated directly into this site and can be viewed [here](/rest-api).

If you encounter any issues or have any feedback for us please stop by the [#official-rest-api](https://discord.com/channels/1002292111942635562/1042896447311454361) channel in our [community Discord](https://discord.gg/stablediffusion) and/or open a [GitHub issue](https://github.com/Stability-AI/REST-API/issues).

If you're using `/v1alpha` or `/v1beta` please take a look at the [Deprecations](#rest-api-v1-deprecations) section below.

## What's New

#### Upscaling is now available! {#rest-api-v1-upscaling}

It is now possible to upscale images using the REST API. Check out the [upscaling docs](/rest-api#tag/v1generation/operation/upscaleImage) for more information.

#### Improved error handling

We've added more error handling, improved error messages, and all errors should now include an `id` field for troubleshooting.
If you encounter an issue please drop a message in the [#official-rest-api](https://discord.com/channels/1002292111942635562/1042896447311454361)
channel in our [community Discord](https://discord.gg/stablediffusion) and include the `id` field from the response.

## Breaking Changes {#rest-api-v1-breaking-changes}

#### Removed `height` and `width` from `image-to-image` and `image-to-image/masking` endpoints

These endpoints have always used the dimensions of the provided `init_image` to determine the dimensions of the resulting image, so accepting `height` and `width` was confusing and unnecessary.

#### Passing explicit `null` values is no longer permitted

Previously, it was possible to pass explicit `null` values for optional arguments. This is no longer permitted. If you want to use the default value for an optional argument, simply omit it from the request.

## Deprecations {#rest-api-v1-deprecations}

- `v1beta` is now deprecated and is scheduled for removal on **May 1st, 2023**
- `v1alpha` was already deprecated and is now scheduled for removal on **May 1st, 2023**

## What's Next {#rest-api-v1-next}

What's coming up next for the REST API:

- Add `image-to-depth` endpoint to `v1`
- Add `depth-to-image` endpoint to `v1`

<br/>
<hr/>

# REST API v1beta Release Candidate {#v1beta-rc}

<i>Feb. 2nd 2023</i>

## Overview

We are excited to announce the v1beta release candidate for the REST API is officially live! Check out the new and improved documentation [here](https://api.stability.ai/docs).

For this release we've taken your feedback into consideration and have implemented some changes based on suggestions shared with us via the [#api](https://discord.com/channels/1002292111942635562/1042896447311454361) channel in our [community Discord](https://discord.gg/stablediffusion) and [GitHub issues](https://github.com/Stability-AI/REST-API/issues).

The majority of the changes relate to standardizing input parameters and tweaks to input validation, but this release is a big step towards our goal of making the API as straightforward and easy to use as possible.

We are looking for feedback from the community to help us improve the API before we release the final version, so please stop by the [#api](https://discord.com/channels/1002292111942635562/1042896447311454361) channel in our [community Discord](https://discord.gg/stablediffusion) and/or open a [GitHub issue](https://github.com/Stability-AI/REST-API/issues).

## What's New

#### Height and Width Validation <sup>(`v1alpha`,`v1beta`)</sup> {#v1beta-height-and-width-validation}

Height and width validation now allows for a wider range of resolutions, spawned by [this issue on GitHub](https://github.com/Stability-AI/REST-API/issues/3).

- The minimum value for either height or width has been lowered to `128`
- Instead of imposing a maximum value, we now require that the product of `height` and `width` fall within a certain range based on the type of engine being using:
  - For 768 engines:
    - `589,824 ≤ (height * width) ≤ 1,048,576`
  - All other engines:
    - `262,144 ≤ (height * width) ≤ 1,048,576`

Here's an example of a `192x3072` image of a cyberpunk cityscape, generated with `v1beta`:
![](/192_3072_cyberpunk_cityscape.png "epic battleground, beautiful synthwave city painting, digital illustration, extreme detail, digital art, 4k, ultra hd, beautiful city at night, long exposure city at night photography, full-color, urban street photography, nightlife, synthwave, cityscape, hd photography, digital art, 4k")

<details style="margin-top: -32px; margin-bottom: 28px">
  <summary style="cursor:pointer">Click to Show Prompt</summary>
  <h5 style="margin-top: 8px">
    epic battleground, beautiful synthwave city painting, digital illustration, extreme detail, digital art, 4k, ultra hd, beautiful city at night, long exposure city at night photography, full-color, urban street photography, nightlife, synthwave, cityscape, hd photography, digital art, 4k
  </h5>
</details>

#### Better Error Handling <sup>(`v1alpha`,`v1beta`)</sup> {#v1beta-better-error-handling}

- Making a request to a 768 engine with less than `768x768` pixels will now result in an error instead of generating a distorted image.
- Some invalid requests that were possible before are now impossible
  - e.g. making a request with a text prompt of `""` (empty string) will now result in an error
- Most errors should be clearer now and contain less noise
- Errors now include an `id` field we can use to help debug issues you run into. If you run into an error, note the `id` and let us know in the [Stable Diffusion Discord](https://discord.com/channels/1002292111942635562/1042896447311454361) so we can help you out!

#### New Image-to-Image Parameter <sup>(`v1beta`)</sup> {#v1beta-new-image-to-image-parameter}

We now offer a single parameter `image_strength` you can use in place of `step_schedule_start` and `step_schedule_end` for image-to-image generations
that mimics the behavior of the Image Strength slider in DreamStudio. You can continue to pass in `step_schedule_start` and `step_schedule_end` if you prefer as long as `init_image_mode` is set to `STEP_SCHEDULE`.

For more information, check out the `image_strength` and `init_image_mode` parameters of the [image-to-image](https://api.stability.ai/docs#tag/v1betageneration/operation/imageToImage) endpoint.

#### Better Image-to-Image Defaults <sup>(`v1beta`)</sup> {#v1beta-better-image-to-image-defaults}

- For image-to-image generations we now default to `image_strength` over `step_schedule_start` and `step_schedule_end`
- The default value for `image_strength` is `0.35`
- The default value for `step_schedule_start` is `0.65`

## Breaking Changes {#v1beta-breaking-changes}

The only intentional breaking change to `v1alpha` was the addition of more input validation checks. These changes shouldn't affect most users, and those who are affected
likely weren't getting the results they expected anyway. If any other breaking changes were introduced, they were unintentional so please notify us via the
[#api](https://discord.com/channels/1002292111942635562/1042896447311454361) channel in our [community Discord](https://discord.gg/stablediffusion) or by opening a [GitHub issue](https://github.com/Stability-AI/REST-API/issues).

## Deprecations

With this release candidate, we are deprecating the `v1alpha` API.

The `v1alpha` API will continue to be available for the time being, but will be removed in a future release.

## What's Next {#v1beta-next-steps}

- Move on to `v1` as fast as possible
- Move the REST API documentation into this site (currently hosted [here](https://api.stability.ai/docs))
- Add support for Upscaling
- Add support for Depth-to-Image

<br/>
<hr/>

# REST API v1alpha Release Candidate {#v1alpha-rc}

<i>Dec. 14th 2022</i>

## Overview

We have been hard at work on the REST API for the past few weeks and are excited to announce that the v1 release candidate is officially live!

We are looking for feedback from the community to help us improve the API before we release the final version, so please stop by the API channel in the [Stable Diffusion Discord](https://discord.com/channels/1002292111942635562/1042896447311454361) and let us know what you think!

## What's New

- `/image-to-image/masking` endpoint with two options for specifying the mask:
  1. `mask_image` where lighter or darker pixels influence the diffusion process.
  2. `init_image` where transparent pixels influence the diffusion process.
- Improved HTTP error codes:
  - `400`s for bad requests.
  - `401`s for unauthorized requests.
  - `403`s for insufficient privileges.
  - `404`s for things like trying to use an engine that doesn't exist.
  - Relegated `500`s back to internal server errors (where they belong!)
- Improved error messages for all endpoints:
  - Magic decoder ring no longer required.
- Fixed small bug causing `null` values to show up in the response when `Accept` header was set to `application/json`.
- Addressed some CORS-related issues

For more information around the masking endpoint including working examples in Go, TypeScript, Python and cURL, check out the <a href="https://api.stability.ai/docs#tag/v1alphageneration/operation/v1alpha/generation#masking">REST API documentation</a>.

<br/>
<hr/>

# Stable Diffusion 2.1 - API Release {#v2-1}

<i>Dec. 7th 2022</i>

## Overview

In this release of the Stability API, we are introducing Stable Diffusion 2.1 (512px + 768px), including multi-prompting with prompt weighting.

## What's New

**New Models**

- Stable Diffusion 2.1 - 512px
- Stable Diffusion 2.1 - 768px

With the Stable Diffusion 2.1 release, we have updated our training strategy and reintroduced much of the artistic flair our users felt was lost in 2.0. Check out the [official announcement](https://stability.ai/blog/stablediffusion2-1-release7-dec-2022) on the Stability AI blog to learn more.

Our existing documentation has been updated to reflect the addition of Stable Diffusion 2.1 as an optional model accessible via the API.

**Multi-prompting**

Multiple weighted prompts can now be passed to the API in this release.

Multi-prompting allows users to combine concepts to create new and unique results.
The model will also attempt to eliminate or avoid concepts in the resulting image when a negative value is assigned to an additional prompt, colloquially known as "negative prompting."

For functional examples, please refer to our new documentation on [multi-prompting](https://platform.stability.ai/docs/features/multi-prompting).

**Open Source Releases**

Stable Diffusion 2.1 model checkpoints are now available via our open source repositories on [Hugging Face](https://huggingface.co/stabilityai).

<br/>
<hr/>

# Stable Diffusion 2.0 - API Release {#v2}

<i>Nov. 25th 2022</i>

## Overview

In this release of the Stability API, we are introducing Stable Diffusion 2.0 (512px + 768px), including two new samplers, and an improved inpainting model (Stable Inpainting 2.0).

## What's New

**New Models**

- Stable Diffusion 2.0 - 512px
- Stable Diffusion 2.0 - 768px
- Stable Inpainting 2.0 - 512px

Stable Diffusion 2.0 is all-new, trained from the ground up with safety in mind.

The 2.0 models are trained on an aesthetic subset of LAION-5B and further filtered via LAION’s NSFW filter, meaning high quality images are available with far less intrusive safety filtering.

Stable Diffusion 2.0 models include a new text encoder trained by LAION with support from Stability AI, which improves the quality of generated images when compared to Stable Diffusion 1.x models.

The new 768px model offers greater coherence at larger dimensions as it was trained on higher resolution samples (768 x 768). This helps mitigate common issues such as doubling and mosaic effects in larger dimension images generated by 512px models.

**New Samplers**

Optimized and backwards compatible with 1.4, 1.5 and 2.0, we’re introducing two new samplers: k_dpmpp_2m and k_dpmpp_2s_ancestral.

The benefit of these new samplers is their ability to resolve high quality images at lower required step counts, enabling your users to achieve better results with fewer steps.

Inpainting 2.0 is being introduced alongside Stable Diffusion 2.0, offering significantly improved coherency over Inpainting 1.0.

**Intelligent sampler defaults**

For your convenience, sampler selection is optional. If omitted, our API will select the best sampler for the chosen model and usage mode.

Unless you have a specific use case requirement, we recommend you allow our API to select the preferred sampler.

**Prompting is different**

Stable Diffusion 2.0 uses the new OpenCLIP ViT-H model which has been trained on a new dataset, meaning that it differs from the previous OpenAI ViT-L model used in our prior models. Thus, prompting techniques from prior models may work differently in Stable Diffusion 2.0.

Notably, celebrity and artist names have a lower impact than in prior models.

This is a characteristic of the new model, and not considered a defect.

Previous Stable Diffusion model versions (1.5, 1.4, Inpainting 1.0) remain available for API use.

**Open Source Releases**

Keeping with our tradition of open source collaboration and innovation, Stable Diffusion 2.0 was also released as an open source project. The open source release includes the above models and several additional models including a 4x upscaler and a new depth-to-image model capable of inferring the depth of an input image and generating new images from text prompts and incorporating the depth information.

These depth-to-image and upscaler models will be implemented into the DreamStudio API in the near future.
