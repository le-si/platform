# Variants

Image variants are a powerful way to create alternative versions of a past generation.

By generating an image and then passing that image in as part of an Image-to-Image request, we can create as many variations on the initial idea as we'd like.

Try it out live by clicking the link below to open the notebook in Google Colab!

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1NrO9nHmNVFSly71RaWV5PfzsgbH9w05a?usp=sharing)

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
    engine="stable-diffusion-xl-beta-v2-2-2", # Set the engine to use for generation.
    # Available engines: stable-diffusion-v1 stable-diffusion-v1-5 stable-diffusion-512-v2-0 stable-diffusion-768-v2-0
    # stable-diffusion-512-v2-1 stable-diffusion-768-v2-1 stable-diffusion-xl-beta-v2-2-2 stable-inpainting-v1-0 stable-inpainting-512-v2-0
)
```

### 4. Set up initial generation parameters, save image on generation, and warn if the safety filter is tripped... {#generation-parameters}

```python
# Set up our initial generation parameters.
answers = stability_api.generate(
    prompt="Giant ice cream cone melting and creating a river through a city, with boats floating down it, high detail, fast-paced, wide angled, aerial view, colorful, fun, stylized graphics",
    seed=112446758, # If a seed is provided, the resulting generated image will be deterministic.
                    # What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again.
                    # Note: This isn't quite the case for CLIP Guided generations, which we tackle in the CLIP Guidance documentation.
    steps=50, # Step Count defaults to 50 if not specified here.
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=512, # Generation width, defaults to 512 if not included.
    height=512, # Generation height, defaults to 512 if not included.
    samples=1, # Number of images to generate, defaults to 1 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2S_ANCESTRAL # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
)

# Set up our warning to print to the console if the adult content classifier is tripped.
# If adult content classifier is not tripped, save generated image.
for resp in answers:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img
            img = Image.open(io.BytesIO(artifact.binary))
            img.save(str(artifact.seed)+ ".png")
```

### Resulting image written to `<seed>.png`:

![Initial generation.](/Variants-C1.png)

### 5. Set up an initial image based on our previous generation settings and generate variations based on it... {#generate-variations}

By changing only the seed we can use our previous generation as a base for our new variations.

```python
# Set up our initial generation parameters.
answers = stability_api.generate(
    prompt="Giant ice cream cone melting and creating a river through a city, with boats floating down it, high detail, fast-paced, wide angled, aerial view, colorful, fun, stylized graphics",
    init_image=img, # Assign our previously generated img as our Initial Image for transformation.
    start_schedule=0.7, # Set the strength of our prompt in relation to our initial image.
    seed=123467458, # If attempting to transform an image that was previously generated with our API, initial images benefit from having their own distinct seed rather than using the seed of the original image generation.
    steps=30, # Amount of inference steps performed on image generation. Defaults to 30. 
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt. Setting this value higher increases the strength in which it tries to match your prompt. Defaults to 7.0 if not specified.
    width=512, # Generation width, defaults to 512 if not included.
    height=512, # Generation height, defaults to 512 if not included.
    samples=4, # Number of images to generate, defaults to 1 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2S_ANCESTRAL # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
)

# Set up our warning to print to the console if the adult content classifier is tripped. If adult content classifier is not tripped, save generated image.
for resp in answers2:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img2
            img2 = Image.open(io.BytesIO(artifact.binary)) # Set our resulting initial image generations as 'img2' to avoid overwriting our previous 'img' generation.
            img2.save(str(artifact.seed)+ ".png") # Save our generated images with their seed number as the filename.
```

### Resulting images written to `<seed>.png`:

![Final variants.](/Variants-C2.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
