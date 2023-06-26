# Generating Textures in Stability for Blender {#image-editor}

One of the most useful features of the addon is the ability to generate textures from your existing images.

![](/Blender/texture_to_image_splash.png)

1. In Blender, change the UI type to Image Editor, like so:

![](/Blender/image_editor_change_panel_type.jpg)

2. Then, you may need to select this tiny arrow icon to open the Image Editor side panel:

![](/Blender/image_editor_slide_out.jpg)

3. Now, you should see the following UI:

![](/Blender/image_editor_ready.jpg)

4. Right click on the image below and select 'Save As' to use our example texture. Open the image in blender by clicking the 'Open' button in the Image Editor top panel.

![](/Blender/brick.png)

5. Similar to before, set the 'Height' and 'Width' to 512, and set the Init Strength to 0.3. Set the Prompt to something like `Realistic brick, high resolution, seamless, 4k`.

![](/Blender/texture_to_image_init.png)

5. Now, to render. Click 'Dream (Image Editor)' and Blender will send the texture to the Stability API. When the API finishes processing your image, the result will be displayed in your existing texture window.

![](/Blender/texture_to_image_finished.png)

From here, try changing the prompt, adding multiple prompts, playing with the quality options, or different types of textures, and see what happens!
