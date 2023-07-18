# Animation Pricing

Usage of the animation API is charged in credits. There are two parts to credit usage; one part is for still image generation, and the second part is for the running of animation operations which is how we animate the generations.

At the default of **(512 x 512, 30 steps)** using `stable-diffusion-v1-5`, an animation consisting of **100 frames (around 8s)** will cost **37.5 credits**.

**Note:** When using `stable-diffusion-xl-1024-v0-9`, an animation consisting of **100 frames (around 8s)** at **(1024 x 1024, 30 steps)** will cost **230 credits**. This is due to the extra processing required for the larger model. We recommend trying out the smaller models first to get a feel for the API before moving on to the larger more costly models.

Below we outline how the various settings and options within the Animation API can affect credit usage:

1. **Still Image Generation**

   Credit usage will be consistent with the credit usage for stand-alone still image generation. See our [Pricing](/pricing) page for more information on still image generation credit usage.

   Selecting the Inpaint Border option will double the selected number of steps to generate the still image.

   IE: a **30 step** image will actually require **60 steps** to generate.

   Note: There is no frame-limit for animations, however longer animations will take longer to generate, require more processing on our end and thus will use more credits.

2. **Animation Operations**

   There are four Animation Operations that can take place: **Resampling**, **Colour Adjustment**, **Depth Calculation**, and **Interpolation**.

   Animation operations using the default settings cost **0.058** or **0.174** credits per operation if using 3D render mode due to the extra processing required. Operation cost scales alongside frame dimensions according to the table below.

   | Dimensions  | Credit Cost Per Operation | Credit Cost Per Resample Operation (3D render mode) |
   | ----------- | ------------------------- | --------------------------------------------------- |
   | 512 x 512   | 0.058 ($0.00058)          | 0.174 ($0.00174)                                    |
   | 768 x 512   | 0.087 ($0.00087)          | 0.261 ($0.00261)                                    |
   | 768 x 768   | 0.13 ($0.0013)            | 0.392 ($0.00392)                                    |
   | 1024 x 512  | 0.12 ($0.0012)            | 0.348 ($0.00348)                                    |
   | 1024 x 768  | 0.18 ($0.0018)            | 0.522 ($0.00522)                                    |
   | 1024 x 1024 | 0.23 ($0.0023)            | 0.696 ($0.00696)                                    |

## Credit Usage Tips {#credit-usage-tips}

**Resolution,** **Steps** and **Cadence** have the highest impact on the credits used to generate an animation.

**Resolution** and **Steps** are covered in detail in the [still image API documentation](/docs/features/api-parameters).

The **Diffusion Cadence Curve** parameter plays an important role here. It determines if a frame is generated using a still image and animation operations, or animation operations only.

By default, the Cadence value is set to **1 still image** for every **1 frame** generated. Increasing the Cadence value may positively or negatively impact the quality of the generated animation, with the trade-off of reducing the number of credits used to generate the animation.

IE: **1 still image** for every **3 frames** generated.

Different animation modes may suit themselves better to lower or higher Cadence values. IE: **Video-to-Video** animations must have a Cadence of **1:1**. The upper limit to the Cadence value is the total number of frames in the animation, i.e. at least one still image is generated.

The table below gives an example of how credit usage scales as Cadence values increase when generating a standard animation of **100 frames @ 30 steps**:

| Resolution  | Cadence | Credits       |
| ----------- | ------- | ------------- |
| 512 x 512   | 1       | 37.5 ($0.375) |
| 512 x 512   | 2       | 33.1 ($0.331) |
| 512 x 512   | 3       | 29.9 ($0.299) |
| 512 x 512   | 4       | 28.3 ($0.283) |
| 768 x 768   | 1       | 130 ($0.13)   |
| 768 x 768   | 2       | 97.2 ($0.972) |
| 768 x 768   | 3       | 82.8 ($0.828) |
| 768 x 768   | 4       | 74.7 ($0.747) |
| 1024 x 1024 | 1       | 259 ($2.59)   |
| 1024 x 1024 | 2       | 187 ($1.87)   |

When using `stable-diffusion-xl-beta-v2-2-2`:

| Resolution | Cadence | Credits       |
| ---------- | ------- | ------------- |
| 512 x 512  | 1       | 67.5 ($0.675) |
| 512 x 512  | 2       | 42.5 ($0.425) |

When using `stable-diffusion-xl-1024-v0-9`:

| Resolution  | Cadence | Credits     |
| ----------- | ------- | ----------- |
| 1024 x 1024 | 1       | 230 ($2.30) |
| 1024 x 1024 | 2       | 150 ($1.50) |
