# Fine-tuning

In this guide, we will demonstrate the process of fine-tuning your models using the Stability API. We will show how to install the SDK, connect to the Stability API, upload your training data,perform fine-tuning and how to generate images with your new model. 

Try it out live by clicking the link below to open the notebook in Google Colab!

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1aTLAuCF-5tseklGY25HHc0b4w9sRzvKM?usp=sharing)

## Fine-tuning Tips {#tips}

At present, the fine-tuning API offers three modes: Face, Object, and Style. Each of these modes comes with specific requirements along with suggestions for how to get the best results:

### Face Mode

#### Requirements:

- Face mode has been designed for human faces. As such, for non-human faces please try our Object mode with `face` or `head` object prompts.
- Uploaded images must be of a single person's face. Multiple people may yield strange results and we will not be able to distinguish between multiple faces.
- Ensure that your images are vertically oriented. Sideways or upside down photos may yield poor results.
- A minimum of four photos is required to train a face model. 

#### Suggestions:

- Higher quality and quantities of photos will improve the final resulting model. We suggest uploading `six or more` images for a Face model.
- Contrasting backgrounds help differentiate the face from its surroundings.
- Variation in lighting, angle, clothing, and hair style in the dataset will improve the overall flexibility of the resulting model.
- Avoid uploading photos where objects may be obscuring the subject of the photo's face.

### Object Mode

#### Requirements:

- Uploaded images should be focused on a single object, as we are currently only extracting a single object for training with this mode.
- Use simple, concrete terms for your object prompt. IE: `cat`, `car`, etc. instead of using your cat's name, or a specific car model.
- Objects should be clearly differentiated from and stand out against the background.

#### Suggestions:

- Higher quality and quantities of photos will improve the final resulting model. We suggest uploading `six to ten or more` images for an Object model.
- Variation in lighting and angle in the dataset will improve the overall flexibility of the resulting model.
- Contrasting backgrounds help differentiate the object from its surroundings.

### Style Mode

#### Requirements:

- A minimum of ten example images are required to capture a style.
- Uploaded Images may vary in aspect ratio, however they will be center cropped as a part of the training process. If your dataset has a person or a subject in them, we recommend that they be in the center of the images. 
- Aesthetic styles like `oil painting` or `line art` often work best. Keep in mind that the more your conceptual style can generalize to a diversity of subjects, the better the resulting model will be. 

#### Suggestions:

- High-quality images with wide dynamic range and resolution are preferred when training a Style model.
- Include a diverse range of subjects in your style dataset to avoid the resulting model focusing on a specific type of object. IE: If you are training a Cartoon style model with a dataset primarily consisting of bikes, the resulting model will be heavily biased towards generating images of bikes.
- Larger datasets enhance results; `20 - 30` images are suggested for styles like `oil painting`, whereas `50 - 60` images are suggested for general concepts like `dark and moody.`
- Upload only the highest quality version if you have the same image in different qualities, and avoid uploading duplicates.

## Python Example {#python-example}

### 1. Install the Stability SDK package... {#install-sdk}

```bash
pip install stability-sdk
```

### 2. Import our dependencies... {#setup-environment}

```python
import io
import logging
import os
import time
from IPython.display import clear_output
from pathlib import Path
from zipfile import ZipFile
from stability_sdk.api import Context, generation
from stability_sdk.finetune import (
    create_model, delete_model, get_model, list_models, resubmit_model, update_model,
    FineTuneMode, FineTuneParameters, FineTuneStatus
)
```

### 3. Connect to the Stability API and list the existing models associated with your account... {#api-connection}

Now we create an API context that we can use to interact with the Stability API.

To connect, you will need an API key, which can be found by visiting your account page at https://platform.stability.ai/account/keys.


```python
STABILITY_HOST = "grpc.stability.ai:443" 
STABILITY_KEY = "key-goes-here" 

engine_id = "stable-diffusion-xl-1024-v1-0" # Here we specify the model we will be using to fine-tune our model from. 
                                            # Currently, only stable-diffusion-xl-1024-v1-0 is supported.

# Create an API context so that we can query user information and generate images. 
context = Context(STABILITY_HOST, STABILITY_KEY, generate_engine_id=engine_id)
(balance, pfp) = context.get_user_info()
print(f"Logged in org:{context._user_organization_id} with balance:{balance}")

# Redirect logs to print statements so that we can see them when running in the notebook. 
class PrintHandler(logging.Handler):
    def emit(self, record):
        print(self.format(record))
logging.getLogger().addHandler(PrintHandler())
logging.getLogger().setLevel(logging.INFO)

# List the fine-tuned models associated with your account.
models = list_models(context, org_id=context._user_organization_id)
print(f"Found {len(models)} models")
for model in models:
    print(f"  Model {model.id} {model.name} {model.status}")
```

### 4. Specify a dataset directory, or upload a `.zip` file with images... {#training-data}

For training, we need a dataset of images. Please only upload images that you have the permission to use. This can be a folder of images or a `.zip` file containing your images if running in Google Colab. Images can be of any aspect ratio, as long as they obey a minimum size of `384px` on the shortest side, and a maximum size of `1024px` on the longest side. Datasets can range from a minimum of `4` images to a maximum of `128` images.

A larger dataset often tends to result in a more accurate model, but will also take longer to train.

While each mode can accept up to `128` images, we have a few suggestions for a starter dataset based on the mode you are using:

- Face: `6 or more` images.
- Object: `6 - 10` images.
- Style: `20 - 30` images.

The file formats that are acceptable are `.png`, `.jpg`, and `.jpeg`. If you're running this on Google Colab, you can upload your `.zip` file directly after running the cell without inputting a local directory.

```python
training_dir = "./train" # Point this towards your training data if you already have it in a local directory.

# If you're working from a Google Colab notebook, the following code will allow you to upload your training data zip file.
if not os.path.exists(training_dir):
    try:
        from google.colab import files

        upload_res = files.upload()
        training_dir = list(upload_res.keys())[0]
        print(f"Received {training_dir}")
        if not training_dir.endswith(".zip"):
            raise ValueError("Uploaded file must be a zip file")

        zf = ZipFile(io.BytesIO(upload_res[training_dir]), "r")
        training_dir = Path(training_dir).stem
        print(f"Extracting to {training_dir}")
        zf.extractall(training_dir)

    except ImportError:
        pass

print(f"Using training images from: {training_dir}")
```

### 5. Create our fine-tuned model... {#fine-tune}

Now we're ready to train our model. Specify parameters like the name of your model, the training mode, and the guiding prompt for object mode training.

Please note that the training duration will vary based on the size of your dataset, the training mode or the engine that is being fine-tuned on. 

However, the following are some rough estimates for the training duration for each mode based on our recommended dataset sizes:

- Face: `4 - 5` minutes.
- Object: `5 - 10` minutes.
- Style: `20 - 30` minutes.


```python
model_name = "cat-ft-01" # The name of your fine-tuned model.
training_mode = "object" # The training mode, can be "face", "style", or "object".
object_prompt = "cat" # A guiding prompt for object mode training, not applicable to other modes.

images = []
for filename in os.listdir(training_dir):
    if os.path.splitext(filename)[1].lower() in ['.png', '.jpg', '.jpeg']:
        images.append(os.path.join(training_dir, filename))

params = FineTuneParameters(
    name=model_name,
    mode=FineTuneMode(training_mode),
    object_prompt=object_prompt,
    engine_id=engine_id,
)
model = create_model(context, params, images)
print(f"Model {model_name} created.")
print(model)
```

### 6. Monitor the status of the fine-tuning job... {#monitor-status}

```python
start_time = time.time()
while model.status != FineTuneStatus.COMPLETED and model.status != FineTuneStatus.FAILED:
    model = get_model(ft_context, model.id)
    elapsed = time.time() - start_time
    print(f"Model {model.name} ({model.id}) status: {model.status}, checking for {elapsed:.2f} sec")
    time.sleep(5)
```

### 7. Optionally, we can resubmit the fine-tuning job if the training fails... {#check-status}

```python
if model.status == FineTuneStatus.FAILED:
    print(f"Training failed, resubmitting")
    model = resubmit_model(context, model.id)
```

### 8. Generate images from your fine-tuned model... {#generate-images}

Now that we have a fine-tuned model, we can generate images with it! By calling `<{model.id}:0.7>`in the example below, we are telling the model to generate an image with 70% of the fine-tuned model's weight. This allows us to control the amount of influence the fine-tuned model has on the generated image.

Note that the examples below assume that you still have the `model` object from the training session handy. If you don't, refer to Step 3 again to get a list of your models, assign the model ID string to a variable (IE: `model_a_id = 'model-id-string'`), and then use that in place of `model.id` in the examples below (IE: `<{model_a_id}:0.7>` or `model_a_id` if updating or deleting a model).

Multiple fine-tuned models can be used together in the same prompt by ensuring that each model ID has its own respective variable. For example, `<{model_a_id}:0.7> in the style of <{model_b_id}:0.7>` will generate an image using two different fine-tuned models.

Note that the example below is a basic image request with your fine-tuned model, however all of the API's image generation parameters (minus CLIP Guidance, due to incompatibility with SDXL) are available to be used with your fine-tuned model.

```python  
results = context.generate(
    prompts=[f"Illustration of <{model.id}:0.7> as a wizard."], # The prompt(s) used to generate the image. Separate by comma after quotation marks for multiple prompts. Set as f-string if calling models in prompt.
    weights=[1], # The weight of each prompt included in your prompts array, separated by commas within the bracket. Weight is assigned according to the position of the prompt in the array.  
    width=512,
    height=512,
)
image = results[generation.ARTIFACT_IMAGE][0]
image # Display the generated image within the notebook.
```

### 9. Optionally, model settings can be updated before a resubmit or after training session... {#update-model}

```python   
update_model(context, model.id, name="cat-ft-01-renamed")
```

### 10. Optionally, you can delete your model if you no longer intend to use it... {#delete-model}

```python
delete_model(context, model.id)
```

**Note:** This is an example of using the Stability API for fine-tuning. For complete parameters and more details, please refer to the [protobuf reference](https://github.com/Stability-AI/api-interfaces/blob/main/src/proto/generation.proto).
