# Get Started with Stability for Blender {#get-started}

Stability for Blender is meant to be used in two different contexts: the 3D View, for taking a 3D scene and running Image-to-Image on rendered frames, or in the Image Editor, for running Image-to-Image on existing textures - or generating next textures from scratch.

1. Install the addon if you haven't already, as detailed [here](/docs/integrations/blender/install).

2. Select the Stability panel in the 3D View. You may need to click this arrow on the right side of the 3D View panel:

![](/Blender/image_editor_slide_out.jpg)

3. Enter your Stability API key, which you can get [here](https://dreamstudio.ai/membership?tab=apiKeys). Click 'Get Started' and you should see the following UI:

![](/Blender/3D_view_default.jpg)

4. You should see a prompt with the text `A dream of a distant galaxy`. If not, click the `Add` button. This will add an empty prompt to the list - fill the text field with `A dream of a distant galaxy`.

   You can click on 'Stability Options' and 'Render Options' to toggle the panels for options relevant to diffusion and Blender, respectively - however, you shouldn't need to mess with any of these options just yet.

![](/Blender/text_to_image_ready.png)

5. Now, time to generate an image. Press the 'Dream (Prompt Only)' button to generate an image from your rendered frame. The addon will send the image to the Stability API, and when the API finishes processing your image, the result will be displayed in a pop-up window. Congrats on your first generation!

![](/Blender/text_to_image_finished.png)

From here, check out the [Render to Image](/docs/integrations/blender/render) page, or [Render to Animation](/docs/integrations/blender/animation) to learn how to generate images from your renders, or animations from your renders, respectively. Have fun!
