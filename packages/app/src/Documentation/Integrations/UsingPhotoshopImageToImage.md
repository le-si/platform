# Image to Image in Stability for Photoshop {#image-to-image}

Now that you've learned to use the Photoshop plugin to generate images in [Text to Image](/docs/integrations/photoshop/text-to-image), you're ready for the plugin's more advanced features: image-to-image and inpainting.

1. To start, toggle `Include Image` below the Seed input. This will open a dialog with some options for different modes to use for inputting your existing image. The options are listed with a description below.

![](/Photoshop/include_image.png)

2. For now, select `Selected Layer`. Select the layer with the image you want transformed in Photoshop's Layers pane, then click 'Dream' to generate a new image. You can adjust the `Image Strength` parameter to control how much of the original image is preserved in the generation.

![](/Photoshop/inpainting_options.png)

3. Press Dream, with a strength of 50 or so, and you should see your existing image, transformed by Stable Diffusion, on the bottom of the UI. How cool is that! From here, try experimenting with the different image to image and inpaint modes listed above to see what you can come up with.

![](/Photoshop/inpainting_result.png)

## Image to Image Modes

The various modes for image to image are listed below for reference.

### Document Content

Use the content currently visible in the document as an additional prompt. Uses the prompt slider and the image strength slider below to adjust their relative influence.

### Selected Layer

Use the selected layer as an additional prompt. Uses the prompt slider and the image strength slider to adjust their relative influence.

### Inpaint Selection

Inpaint the current selection. (Note that only single rectangular selections are supported.) Use the prompt strength slider to control the strength of the inpainting.

### Inpaint Mask

Select a layer with a layer mask. Any masked regions will be replaced with generated pixels. Uses the mask's luminosity to control the strength of the inpainting.

### Outpaint Transparency

Outpaints the transparency of the current layer. Uses the transparency of the layer to control the strength of the outpainting.

Happy diffusing! Be sure to post your creations on [Twitter](https://twitter.com/hashtag/stablediffusion) or [Discord](https://discord.gg/stablediffusion), we'd love to see them!