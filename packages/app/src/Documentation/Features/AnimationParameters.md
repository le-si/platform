# Animation Parameters

Artists have the ability to use all of our available inference models to generate animations. We currently support **text-to-animation**, **image-to-animation**, and **video-to-animation**. To see animated previews of how these parameters affect the resulting animation, please check out our [Animation Handbook](https://docs.google.com/document/d/1iHcAu_5rG11guGFie8sXBXPGuM4yKzqdd13MJ_1LU8U/edit?usp=sharing).

Please note that the [Animation Handbook](https://docs.google.com/document/d/1iHcAu_5rG11guGFie8sXBXPGuM4yKzqdd13MJ_1LU8U/edit?usp=sharing) is an evolving document and will continue to be updated with new features and examples.

## General Parameters {#general-parameters}

These are general parameters that can influence the resulting animations regardless of the mode chosen. Parameters that can be influenced per frame, are marked as **Yes** in the Keyframe Syntax column.

| Parameters                    | SDK Parameter Name      | Default                | Allowable                                                              | Affects Pricing | Keyframe Syntax |
| ----------------------------- | ----------------------- | ---------------------- | ---------------------------------------------------------------------- | --------------- | --------------- |
| Animation Prompts             | animation_prompts       | None                   | Multiprompting via assigning a start frame for each successive prompt. | No              | Yes             |
| Negative Prompts              | negative_prompt         | blurry, low resolution | Any elements you wish to discourage the model from generating.         | No              | No              |
| Max Frames                    | max_frames              | 72                     | 0 - Infinite                                                           | Yes             | No              |
| Height                        | height                  | 512                    | 1024                                                                   | Yes             | No              |
| Width                         | width                   | 512                    | 1024                                                                   | Yes             | No              |
| Steps Curve                   | steps_curve             | 30                     | 10 - 150 (30 - 50 typically)                                           | Yes             | Yes             |
| Model                         | model                   | stable-diffusion-v1-5  | <a href="#available-models">See comments below</a>                     | Yes             | No              |
| Style Preset                  | preset                  | None                   | <a href="#available-styles">See comments below</a>                     | No              | No              |
| Sampler                       | sampler                 | k_dpmpp_2m             | <a href="#available-samplers">See comments below</a>                   | No              | No              |
| Seed                          | seed                    | -1 (random)            | 0 - 2147483647                                                         | No              | No              |
| Guidance Scale                | cfg_scale               | 7                      | Unbounded (4 - 14 typically)                                           | No              | No              |
| CLIP Guidance                 | clip_guidance           | None                   | <a href="#available-clip-guidance-modes">See comments below</a>        | No              | No              |
| Steps Strength Adj            | steps_strength_adj      | On                     | On/Off                                                                 | Yes             | No              |
| Interpolate Prompts           | interpolate_prompts     | Off                    | On/Off                                                                 | No              | No              |
| Locked Seed                   | locked_seed             | Off                    | On/Off                                                                 | No              | No              |
| Noise Add Curve               | noise_add_curve         | 0.02                   | Unbounded (small typically)                                            | No              | Yes             |
| Noise Scale Curve             | noise_scale_curve       | 0.99                   | Unbounded (close to 1 typically)                                       | No              | Yes             |
| Previous Frame Strength Curve | strength_curve          | 0.65                   | 0 - 1                                                                  | Yes             | Yes             |
| Cadence                       | diffusion_cadence_curve | 1                      | 1 - Max Frames                                                         | Yes             | Yes             |
| Cadence Interp                | cadence_interp          | mix                    | Mix, RIFE, VAE-LERP, VAE-SLERP                                         | Yes             | No              |
| Cadence Spans                 | cadence_spans           | Off                    | On/Off                                                                 | Yes             | No              |
| Inpaint Border                | inpaint_border          | Off                    | On/Off                                                                 | Yes             | No              |
| Border                        | border                  | Replicate              | <a href="#2d-parameters">See comments below</a>                        | No              | No              |
| Use Inpainting Model          | use_inpainting_model    | Off                    | On/Off                                                                 | Yes             | No              |
| FPS                           | fps                     | 12                     | >0                                                                     | No              | No              |
| Mask Min Value                | mask_min_value          | 0.25                   | 0.05 - 0.5                                                             | Yes             | No              |
| Mask Binarization THR         | mask_binarization_thr   | 0.5                    | 0 - 1                                                                  | No              | No              |

#### **Available Models:** {#available-models}

- stable-diffusion-v1
- stable-diffusion-v1-5
- stable-diffusion-512-v2-0
- stable-diffusion-768-v2-0
- stable-diffusion-512-v2-1
- stable-diffusion-768-v2-1
- stable-diffusion-xl-beta-v2-2-2
- stable-diffusion-xl-1024-v0-9
- stable-diffusion-depth-v2-0

**Note:** `stable-diffusion-xl-beta-v2-2-2` and `stable-diffusion-xl-1024-v0-9` have special dimension considerations. Please check out this section of our [API Parameters](https://platform.stability.ai/docs/features/api-parameters#about-dimensions) page to learn more.

#### **Available Samplers:** {#available-samplers}

See the [Sampler](https://platform.stability.ai/docs/features/api-parameters#sampler) section of our Parameters page for more information.

#### **Available Clip Guidance Modes:** {#available-clip-guidance-modes}

None, Simple, FastBlue, FastGreen

#### **Available Style Presets:** {#available-styles}

None, 3d-model, analog-film, anime, cinematic, comic-book, digital-art, enhance fantasy-art, isometric, line-art, low-poly, modeling-compound, neon-punk, origami, photographic, pixel-art

## Colour & Depth Parameters {#colour-&-depth-parameters}

Influences image colour style and depth model features.

| Parameters           | SDK Parameter Name  | Default | Allowable           | Keyframe Syntax |
| -------------------- | ------------------- | ------- | ------------------- | --------------- |
| Colour Coherence     | color_coherence     | LAB     | None, HSV, LAB, RGB | No              |
| Brightness Curve     | brightness_curve    | 1.0     | Unbounded           | Yes             |
| Contrast Curve       | contrast_curve      | 1.0     | Unbounded           | Yes             |
| Hue Curve            | hue_curve           | 0.0     | -180 - 180          | Yes             |
| Saturation Curve     | saturation_curve    | 1.0     | Unbounded           | Yes             |
| Lightness Curve      | lightness_curve     | 0.0     | -1 - 1              | Yes             |
| Animate Colour Match | color_match_animate | True    | True/False          | No              |
| Depth Model Weight   | depth_model_weight  | 0.3     | 0 - 1               | No              |
| Fov Curve            | fov_curve           | 25.0    | 0 - 180             | Yes             |
| Depth Blur Curve     | depth_blur_curve    | 0.0     | 0 - 7               | Yes             |
| Depth Warp Curve     | depth_warp_curve    | 1.0     | 0 - 1               | Yes             |

When **Animate Colour Match** is on, an extra image is generated for each key-framed text prompt after the first. This affects the cost but allows colours to change over the course of the animation. Disabling it maintains the same colours for all frames of the animation.

## 2D & 3D Parameters {#2d-&-3d-parameters}

Camera parameters that can be keyframed across the duration of your animation. Accepts positive and negative values, with negative operating in the inverse direction of the positive. Usually, these parameters are unbounded in terms of value range.

| Parameters    | SDK Parameter Name | Default | Allowable    | Keyframe Syntax |
| ------------- | ------------------ | ------- | ------------ | --------------- |
| Translation X | translation_x      | 0       | +- Unbounded | Yes             |
| Translation Y | translation_y      | 0       | +- Unbounded | Yes             |

## 2D Parameters {#2d-parameters}

| Parameters | SDK Parameter Name | Default     | Allowable    | Keyframe Syntax |
| ---------- | ------------------ | ----------- | ------------ | --------------- |
| Angle      | angle              | 0           | +- Unbounded | Yes             |
| Zoom       | zoom               | 1 (no zoom) | +- Unbounded | Yes             |

When Zoom is set to a value less than 1 (IE: when zooming out), remember to enable **Inpaint Border** and choose your desired **Border** type.

Our available **Border** types are: reflect, replicate, wrap, zero, prefill.

## 3D Parameters {#3d-parameters}

These parameters affect both **3D Wrap** and **3D Render**. Rotation values are specified in degrees, and rotate the camera about its origin.

| Parameters    | SDK Parameter Name | Default | Allowable    | Keyframe Syntax |
| ------------- | ------------------ | ------- | ------------ | --------------- |
| Translation Z | translation_z      | 0       | +- Unbounded | Yes             |
| Rotation X    | rotation_x         | 0       | +- Unbounded | Yes             |
| Rotation Y    | rotation_y         | 0       | +- Unbounded | Yes             |
| Rotation Z    | rotation_z         | 0       | +- Unbounded | Yes             |

## 3D Render Parameters {#3d-render-parameters}

| Parameters  | SDK Parameter Name | Default     | Allowable                  | Keyframe Syntax |
| ----------- | ------------------ | ----------- | -------------------------- | --------------- |
| Camera Type | camera_type        | Perspective | Perspective / Orthographic | No              |
| Render Mode | render_mode        | Mesh        | Pointcloud / Mesh          | No              |
| Mask Power  | mask_power         | 0.3         | 0 - 4                      | No              |

**Mask Power** raises each mask (0, 1) value to this power. The higher the value the more changes will be applied to the nearest objects. Used for 3D render mode only.

## Input Parameters {#input-parameters}

| Parameters        | SDK Parameter Name | Default | Allowable                     | Keyframe Syntax |
| ----------------- | ------------------ | ------- | ----------------------------- | --------------- |
| Init Image        | init_image         | none    | Path to init image file.      | No              |
| Init Sizing       | init_sizing        | Stretch | cover, stretch, resize canvas | No              |
| Mask Path         | mask_path          | none    | Path to the mask file.        | No              |
| Mask Invert       | mask_invert        | Off     | On/Off                        | No              |
| Video Init Path   | video_init_path    | none    | Path to the video file.       | No              |
| Mix-in Curve      | video_mix_in_curve | 0.02    | 0 - 1                         | Yes             |
| Flow Warp         | video_flow_warp    | On      | On/Off                        | No              |
| Extract Nth Frame | extract_nth_frame  | 1       | 1 - Total Input Frames        | No              |
| FPS               | fps                | 12      | >0                            | No              |

**Mix-in Curve** offers the ability to keyframe its value throughout the duration of the animation.

## Post Processing Parameters {#post-processing-parameters}

| Parameters                 | SDK Parameter Name | Default | Allowable  | Keyframe Syntax |
| -------------------------- | ------------------ | ------- | ---------- | --------------- |
| FPS                        | fps                | 24      | >0         | No              |
| Frame Interpolation Mode   |                    | None    | film, rife | No              |
| Frame Interpolation Factor |                    | 2       | 2, 4, 8    | No              |

FPS allows regenerating the animation from previous frames at a different frame rate than the original.

Frame interpolation mode with **film** or **rife** will construct new frames and insert them between existing frames. It can insert **1**, **3**, or **7** frames in between.

An example of this would be: If you have a **100** frame animation, and select an interpolation factor of **8**, the total number of frames will be increased **8** times by inserting **7** frames between each set of two consecutive frames from the original sequence.
