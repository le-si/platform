# Inpainting + Masking

Our API also offers the ability to inpaint (the ability to modify a specific section of an image) via masking out a specific area of an image, and then generating new details based on a provided prompt.

In the example below, this is accomplished by providing the gRPC API with a grayscale mask image, where black pixels represent the areas that will be replaced by the prompt, and the white pixels represent areas that are to be untouched by the inpainting process, and gray pixels result in partial replacement.

Try it out live by clicking the link below to open the notebook in Google Colab!

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1tG4oWg6oI1wNhlyFaGru4P__3bGZmUxf?usp=sharing)

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
import numpy as np
from torchvision.transforms import GaussianBlur

# Our host url should not be prepended with "https" nor should it have a trailing slash.
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'

# Sign up for an account at the following link to get an API Key.
# https://dreamstudio.ai/

# Click on the following link once you have created an account to be taken to your API Key.
# https://dreamstudio.ai/account

# Paste your API Key below.
os.environ['STABILITY_KEY'] = 'apikeyhere'
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

### 4. Set up initial generation parameters, save image on generation, and warn if the safety filter is tripped... {#initial-generation-parameters}

```python

answers = stability_api.generate(
    prompt="houston, we are a 'go' for launch!",
    seed=34567, # If a seed is provided, the resulting generated image will be deterministic.
                    # What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again.
                    # Note: This isn't quite the case for CLIP Guided generations, which we tackle in the CLIP Guidance documentation.
    steps=30, # Amount of inference steps performed on image generation. Defaults to 30.
)

# Set up our warning to print to the console if the adult content classifier is tripped. If adult content classifier is not tripped, save generated image.
for resp in answers:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img
            img = Image.open(io.BytesIO(artifact.binary))
            img.save(str(artifact.seed)+ "-1-start.png") # Save our generated image with its seed number as the filename and the 1-start suffix so that we know this was our origin generation.
```
### Resulting image written to `<seed>-1-start.png`:

![Initial generation.](/Inpainting-C1.png)

### 5. Set up an initial image based on our previous generation, and use a prompt to convert it into a crayon drawing... {#initial-image-based-on-previous-generation}

```python
answers2 = stability_api.generate(
    prompt="sketchy crayon drawing of a starship in space on old paper",
    init_image=img, # Assign our previously generated img as our Initial Image for transformation.
    start_schedule=0.6, # Set the strength of our prompt in relation to our initial image.
    seed=54321, # If attempting to transform an image that was previously generated with our API,
                    # initial images benefit from having their own distinct seed rather than using the seed of the original image generation.
    steps=30, # Amount of inference steps performed on image generation. Defaults to 30.
    cfg_scale=7.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=512, # Generation width, defaults to 512 if not included.
    height=512, # Generation height, defaults to 512 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_lms if not specified. Clip Guidance only supports ancestral samplers.
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
            img2.save(str(artifact.seed)+ "-2-img2img.png") # Save our generated image with its seed number as the filename and the 2-img2img suffix so that we know this is our transformed image.
```
### Resulting image written to `<seed>-2-img2img.png`:

![Initial generation converted into crayon drawing.](/Inpainting-C2.png)

### 6. We can mask out part of our resulting image, and use that to determine specific portions of our image that we would like to transform... {#creating-a-mask}

```python
img2_grayscale = img2.convert('L')
img2_a = np.array(img2_grayscale)

mask = np.array(img2_grayscale)
mask[img2_a<150] = 0  # This is the area that will get painted, will show up as grey.
mask[img2_a>=150] = 1 # This is the protected area, will show up white. Protected areas won't be affected by our generating.

strength = .2  # This controls the strength of our prompt relative to the init image.

d = int(255 * (1-strength))
mask *= 255-d # Converts our range from [0,1] to [0,255]
mask += d

mask = Image.fromarray(mask)
mask.save(str(artifact.seed)+ "-3-mask.png") # Save our mask w/ the generation seed number as the filename and 3-mask suffix so that we know this is the mask we've created for this generation.
```
### Resulting mask written to `<seed>-3-mask.png`:

![Inpainting mask.](/Inpainting-C3.png)

### 6.1. Feathering the edges of our mask generally helps provide a better result... {#feathering-the-edges-of-our-mask}

```python
blur = GaussianBlur(11,20)
mask = blur(mask)
mask.save(str(artifact.seed)+ "-4-featheredmask.png") # Save our mask w/ the generation seed number as the filename and 4-featheredmask suffix so that we know this is the feathered mask we've created for this generation.
```
### Resulting feathered mask written to `<seed>-4-featheredmask.png`:

![Feathered Inpainting Mask](/Inpainting-C4.png)

### 7. Now we can generate a new image, including our mask to affect the specific areas laid out above... {#generating-a-new-image-from-our-mask}

```python
answers3 = stability_api.generate(
    prompt="rainbow galactic nebula, star-filled sky, spectral, psychedelic, masterpiece",
    init_image=img2,
    mask_image=mask,
    start_schedule=1,
    seed=1823948, # If attempting to transform an image that was previously generated with our API,
                    # initial images benefit from having their own distinct seed rather than using the seed of the original image generation.
    steps=30, # Amount of inference steps performed on image generation. Defaults to 30.
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=512, # Generation width, defaults to 512 if not included.
    height=512, # Generation height, defaults to 512 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_lms if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
)

# Set up our warning to print to the console if the adult content classifier is tripped.
# If adult content classifier is not tripped, save generated image.
for resp in answers3:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            warnings.warn(
                "Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
        if artifact.type == generation.ARTIFACT_IMAGE:
            global img3
            img3 = Image.open(io.BytesIO(artifact.binary))
            img3.save(str(artifact.seed)+ "-5-completed.png") # Save our completed image with its seed number as the filename, including the 5-completed suffix so that we know this is our final result.
```

### Resulting image written to `<seed>-5-completed.png`:

![Final result.](/Inpainting-C5.png)

**Note:** This is not representative of all of the parameters available for image generation.

Please check out our [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto) for a complete list of parameters available for image generation.
