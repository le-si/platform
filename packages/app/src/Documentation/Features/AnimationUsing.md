# Animation SDK Usage

See the Google Colab notebook (with included Gradio UI) provided below to help you conveniently explore the Animation SDK's various parameters before you develop your custom scripts.

Prefer to run locally? Execute `python -m stability_sdk animate --gui` or click below to open the notebook in Google Colab.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Stability-AI/stability-sdk/blob/main/nbs/animation_gradio.ipynb)

## Code Sample {#animation-code-sample}

In order to create animations with the SDK, a connection to the Stability servers must first be established. The API `Context` class is used to manage the connection. You will need to supply an API key which you can create using the [account page](https://platform.stability.ai/account).

```python
from stability_sdk import api

STABILITY_HOST = "grpc.stability.ai:443"
STABILITY_KEY = "" # API key from https://platform.stability.ai/account

context = api.Context(STABILITY_HOST, STABILITY_KEY)
```

An instance of the `Animator` class is used to orchestrate the rendering of each frame of animation. To configure the animation settings, create an instance of the `AnimationArgs` class and set the desired parameters. The `animation_prompts` parameter is a dictionary where the keys are the frame numbers and the values are the prompts for that frame. The `negative_prompt` parameter is an optional prompt applied to all frames that can be used to describe content that should be avoided during generation.

```python
from stability_sdk.animation import AnimationArgs, Animator

# Configure the animation
args = AnimationArgs()
args.interpolate_prompts = True
args.locked_seed = True
args.max_frames = 48
args.seed = 42
args.strength_curve = "0:(0)"
args.diffusion_cadence_curve = "0:(4)"
args.cadence_interp = "film"

animation_prompts = {
    0: "a photo of a cute cat",
    24: "a photo of a cute dog",
}
negative_prompt = ""

# Create Animator object to orchestrate the rendering
animator = Animator(
    api_context=context,
    animation_prompts=animation_prompts,
    negative_prompt=negative_prompt,
    args=args
)

# Render each frame of animation
for idx, frame in enumerate(animator.render()):
    frame.save(f"frame_{idx:05d}.png")
```

All available settings for `AnimationArgs` can be seen directly [in the SDK code](https://github.com/Stability-AI/stability-sdk/blob/animation/src/stability_sdk/animation.py#L53) and are also described in the [Animation Parameters](/docs/features/animation/parameters) page.

## Helpers {#animation-helpers}

You can set the `out_dir` parameter to have `Animator` save each frame automatically and
then use the `create_video_from_frames` function to create a video from the resulting frames. You must
have `ffmpeg` installed to use this function (`sudo apt install ffmpeg` on Linux or `brew install ffmpeg` on macOS).
The example below also uses `tqdm` (`pip install tqdm`) to display progress while your animation is rendering.

```python
from stability_sdk.utils import create_video_from_frames
from tqdm import tqdm

animator = Animator(
    api_context=api_context,
    animation_prompts=animation_prompts,
    negative_prompt=negative_prompt,
    args=args,
    out_dir="video_01"
)

for _ in tqdm(animator.render(), total=args.max_frames):
    pass

create_video_from_frames(animator.out_dir, "video.mp4", fps=24)
```

## Exception Handling {#animation-exceptions}

An exception will be raised if the animation fails during rendering. Below is an example showing how to handle these exceptions when raised.

```python
try:
    for _ in animator.render():
        pass
except ClassifierException:
    print("Animation terminated early due to NSFW classifier.")
except OutOfCreditsException as e:
    print(f"Animation terminated early, out of credits.\n{e.details}")
except Exception as e:
    print(f"Animation terminated early due to exception: {e}")
```

A built-in retry mechanism is in place so that connection errors will not cause the animation to fail. You can override the default settings on the `Context` object.

```python
api_context._max_retries = 5   # Number of times to retry.
api_context._retry_delay = 1.0 # Base delay in seconds between retries, each attempt will double.
```
