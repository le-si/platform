# Image-to-Image

Initial images (aka: 'init' images) are a powerful tool for generating or modifying new images based on a starting point. Also known as Image-to-Image, we'll show you how to use the gRPC API to generate an image, and then further modify that image as our initial image with a prompt.

Try it out live by clicking the link below to open the notebook in Google Colab!

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/179vzpU99rWTFfXFkje-j9Y-12qymRi7s?usp=sharing)

## Python Example {#python-example}

### 1. Install the Stability SDK package... {#install-sdk}

```bash
pip install stability-sdk
```

### 2. Import our dependencies and set up our environment variables and API Key... {#setup-environment}

```python
import io
import os
import warnings

from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

# Our Host URL should not be prepended with "https" nor should it have a trailing slash.
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'

# Sign up for an account at the following link to get an API Key.
# https://dreamstudio.ai/

# Click on the following link once you have created an account to be taken to your API Key.
# https://dreamstudio.ai/account

# Paste your API Key below.

os.environ['STABILITY_KEY'] = 'key-goes-here'
```

### 3. Establish our connection to the API... {#api-connection}

```python
# Set up our connection to the API.
stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'], # API Key reference.
    verbose=True, # Print debug messages.
    engine="stable-diffusion-xl-1024-v0-9", # Set the engine to use for generation.
    # Available engines: stable-diffusion-xl-1024-v0-9 stable-diffusion-v1 stable-diffusion-v1-5 stable-diffusion-512-v2-0 stable-diffusion-768-v2-0
    # stable-diffusion-512-v2-1 stable-diffusion-768-v2-1 stable-diffusion-xl-beta-v2-2-2 stable-inpainting-v1-0 stable-inpainting-512-v2-0
)
```

### 4. Set up initial generation parameters, save image on generation, and warn if the safety filter is tripped... {#generation-parameters}

```python
# Set up our initial generation parameters.
answers = stability_api.generate(
    prompt="rocket ship launching from forest with flower garden under a blue sky, masterful, ghibli",
    seed=121245125, # If a seed is provided, the resulting generated image will be deterministic.
                    # What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again.
                    # Note: This isn't quite the case for CLIP Guided generations, which we tackle in the CLIP Guidance documentation.
    steps=50, # Amount of inference steps performed on image generation. Defaults to 30.
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=1024, # Generation width, defaults to 512 if not included.
    height=1024, # Generation height, defaults to 512 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
)

# Set up our warning to print to the console if the adult content classifier is tripped.
# If adult content classifier is not tripped, display generated image.
for resp in answers:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img
            img = Image.open(io.BytesIO(artifact.binary))
            img.save(str(artifact.seed)+ ".png") # Save our generated images its seed number as the filename.
```

![Initial generation.](/TSgRPCImageToImageInit.png)

### 5. Set up an initial image based on our previous generation, and use a prompt to convert it into a crayon drawing... {#image-to-image}

```python
# Set up our initial generation parameters.
answers2 = stability_api.generate(
    prompt="crayon drawing of rocket ship launching from forest",
    init_image=img, # Assign our previously generated img as our Initial Image for transformation.
    start_schedule=0.6, # Set the strength of our prompt in relation to our initial image.
    seed=123463446, # If attempting to transform an image that was previously generated with our API,
                    # initial images benefit from having their own distinct seed rather than using the seed of the original image generation.
    steps=50, # Amount of inference steps performed on image generation. Defaults to 30.
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=1024, # Generation width, defaults to 512 if not included.
    height=1024, # Generation height, defaults to 512 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
)

# Set up our warning to print to the console if the adult content classifier is tripped.
# If adult content classifier is not tripped, save generated image.
for resp in answers2:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img2
            img2 = Image.open(io.BytesIO(artifact.binary))
            img2.save(str(artifact.seed)+ "-img2img.png") # Save our generated image with its seed number as the filename and the img2img suffix so that we know this is our transformed image.
```

### Resulting image written to `<seed>.png`:

![Final result.](/TSgRPCImageToImageResult.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
