# Image Upscaling

Image upscaling is an effective way to enlarge both local images and images generated via our gRPC API. Rather than generating an image at a larger size, you may be interested in scaling up the dimensions of an image that already suits your needs.

A key advantage of `stable-diffusion-x4-latent-upscaler`, although slower and more expensive than `esrgan-v1-x2plus`, is its ability to use the diffusion process in a similar manner to how our Stable Diffusion models work to increase the perceived level of detail while upscaling the input image.

Please note that it is possible to generate images with our models that may not be able to be passed into an upscaler in the same API call. For example, if you generate an image with a resolution of `1024 x 1024`, you will not be able to pass that image into the `stable-diffusion-x4-latent-upscaler` engine as the input limit for that engine is `512 x 768`.

## Pricing {#pricing}

| Upscaler                            | Resolution      | Credit Cost  |
| ----------------------------------- | --------------- | ------------ |
| esrgan-v1-x2plus                    | Any             | 0.2 ($0.002) |
| stable-diffusion-x4-latent-upscaler | 512 x 512       | 8 ($0.08)    |
| stable-diffusion-x4-latent-upscaler | Above 512 x 512 | 12 ($0.12)   |

## Limits {#limits-py}

Input / output images can be any aspect ratio, however certain pixel counts must be obeyed depending on the engine in use.

| Model                               | Input Image Limit (pixels) | Equivalent Input Image (dimensions) | Output Image Limit (pixels) | Equivalent Output Image (dimensions) |
| ----------------------------------- | -------------------------- | ----------------------------------- | --------------------------- | ------------------------------------ |
| esrgan-v1-x2plus                    | 1048576                    | 1024 x 1024                         | 4194304                     | 2048 x 2048                          |
| stable-diffusion-x4-latent-upscaler | 393216                     | 512 x 768                           | 6291456                     | 2048 x 3072                          |

<img src="/imageupscalersbs.png" alt="image upscaler side-by-side comparison" style="max-height: 40rem"/>

Try it out live by clicking the link below to open the notebook in Google Colab!

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1E5avwcmKy1HG4-jwEOCYszjyjPNK0Pj4?usp=sharing)

## Python Example {#python-example}

### 1. Install the Stability SDK package... {#install-sdk}

```bash
pip install stability-sdk
```

### 2. Import our dependencies and set up our environment variables and API Key... {#setup-environment}

```python
import os
import io
import warnings
from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

# Our Host URL should not be prepended with "https" nor should it have a trailing slash.
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'

# Sign up for an account at the following link to get an API Key.
# https://platform.stability.ai/

# Click on the following link once you have created an account to be taken to your API Key.
# https://platform.stability.ai/account

# Paste your API Key below.

os.environ['STABILITY_KEY'] = 'key-goes-here'
```

### 3. Establish our connection to the API... {#api-connection}

```python
# Set up our connection to the API.
stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'], # API Key reference.
    upscale_engine="esrgan-v1-x2plus", # The name of the upscaling model we want to use.
                                       # Available Upscaling Engines: esrgan-v1-x2plus, stable-diffusion-x4-latent-upscaler
    verbose=True, # Print debug messages.
)
```

### 4. Set up initial API call parameters... {#initial-generation-parameters}

Depending on the engine that is in use `stability_api.upscale` accepts different parameters.

If `esrgan-v1-x2plus` is in use, `init_image=` `width=` and `height=` parameters are accepted.

If `stable-diffusion-x4-latent-upscaler` is in use the additional parameters of `seed=` `steps=` `cfg_scale=` and `prompt=` are accepted. These additional parameters will be ignored if passed to `esrgan-v1-x2plus`.

Note that only `width=` **OR** `height=` can be passed to the upscale function to specify the desired output size, never both. If no `width=` or `height=` parameter is provided, the image will be upscaled to `2x` or `4x` its dimensions by default depending on the engine in use. Providing, for example `width=1024`, will upscale the image to `1024` pixels wide, and automatically account for the height in order to maintain the initial image's aspect ratio.

If upscaling an image that was originally generated via one of our inference engines with `stable-diffusion-x4-latent-upscaler`, best practice is to use the same prompt and seed as the original generation call as this helps with the quality of the resulting image.

```python
# Import our local image to use as a reference for our upscaled image.
# The 'img' variable below is set to a local file for upscaling, however if you are already running a generation call and have an image artifact available, you can pass that image artifact to the upscale function instead.
img = Image.open('/img2upscale.png')

answers = stability_api.upscale(
    init_image=img, # Pass our image to the API and call the upscaling process.
    # width=1024, # Optional parameter to specify the desired output width.
    # prompt="A beautiful sunset", # Optional parameter when using `stable-diffusion-x4-latent-upscaler` to specify a prompt to use for the upscaling process.
    # seed=1234, # Optional parameter when using `stable-diffusion-x4-latent-upscaler` to specify a seed to use for the upscaling process.
    # steps=20, # Optional parameter when using `stable-diffusion-x4-latent-upscaler` to specify the number of diffusion steps to use for the upscaling process. Defaults to 20 if no value is passed, with a maximum of 50.
    # cfg_scale=7 # Optional parameter when using `stable-diffusion-x4-latent-upscaler` to specify the strength of prompt in use for the upscaling process. Defaults to 7 if no value is passed.
)
```

![InitImage](/img2upscale.png)

### 5. Save our upscaled image, and set up a warning for if the safety filter is tripped... {#save-upscaled-image}

```python
# Set up our warning to print to the console if the adult content classifier is tripped.
# If adult content classifier is not tripped, save our image.

for resp in answers:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please submit a different image and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            big_img = Image.open(io.BytesIO(artifact.binary))
            big_img.save("imageupscaled" + ".png") # Save our image to a local file.
```

### Resulting image if using `stable-diffusion-x4-latent-upscaler` @ `1024 x 1024`:

![OutputImage](/imgupscaledlatent.png)

### Resulting image if using `esrgan-v1-x2plus` @ `1024 x 1024`:

![OutputImage](/imgupscaled.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
