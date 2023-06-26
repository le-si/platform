# Using the Upscaler in Stability for Blender {#upscaler}

Once you've completed [Getting Started](/docs/integrations/UsingBlenderAddonGettingStarted), if you'd like to upscale images or animation frames within Blender, click on the dropdown labeled 'Mode' at the top of the plugin panel, and select 'Upscaler'. You should see the following UI:

![](/Blender/upscaler_default.png)

1. First, select an input resolution. Your input will be scaled to this size before the upscaling is performed. If you'd prefer to not rescale your input, select 'Use Render Resolution'. The selected upscale sizes available will change depending on which resolution you choose.

2. Choose a factor to upscale your image or document to. If the resulting image would be larger than the maximum available size of 2048 x 2048, that factor option will be grayed out. The upscaler supports images of any aspect ratio.

![](/Blender/upscaler_size.png)

3. Finally, choose whether you want to upscale a single render output or an animation. If you choose 'Animation', you'll be prompted to select a folder containing your animation frames. The upscaler will upscale each frame in the folder, and save the results to a new folder. For details on how to use animations, see [our guide to Animation](/docs/integrations/blender/animation).

![](/Blender/upscaler_animation.png)

4. Press Upscale, and you should see your upscaled frame in a second or two! Image Upscaling costs 0.2 credits per image. If you chose 'Animation', you'll see a progress message as the upscaler processes each frame. Once the upscaling is complete, you can find your upscaled frames in the addon's output folder. Select 'Show Output Folder' to open the folder in your file explorer.

Happy upscaling! From here, you might want to check out the [Render to Image](/docs/integrations/blender/render) page, or [Render to Animation](/docs/integrations/blender/animation) to learn how to generate images from your renders, or animations from your renders, respectively. Have fun!
