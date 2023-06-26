# Text to Image in Stability for Photoshop {#text-to-image}

1. Once you've completed [Getting Started](/docs/integrations/UsingPhotoshopGettingStarted), you should see the following UI:

![](/Photoshop/default_screen.png)

2. In the box labeled 'Prompt' at the top, add some text - you can use the classic 'A Dream of a Distant Galaxy', or anything you want!

![](/Photoshop/add_prompt.png)

3. Now that you've got your prompt entered, click the 'Dream' button at the bottom of the panel, and the plugin will send the image to the Stability API. When the API finishes processing your image, the results will be displayed in a grid at the bottom of the panel. This may take a few seconds.

![](/Photoshop/distant_galaxy_results.png)

By default, we use the size of the document as the size of the generated image - click the 'Document' toggle to change the height / width to any custom value. Keep in mind that larger generations will take longer - 512x512 and 768x768 are good starting points.

4. Once you've got some results, click 'Layer' underneath a result to insert it into your open Photoshop document as a new layer. You can also click 'Save As' to save it to a file, or click 'Seed' to use that seed as the seed input - this is useful if you want to further iterate on a specific generation.

![](/Photoshop/select_layer.png)

5. If you'd like to edit the generation settings, click 'Show Defaults' above the Dream button, and de-select the 'Use Defaults' toggle. This will let you change the model used, alter the step count, or other quality settings, in case you have something specific in mind.

![](/Photoshop/engine_selection.png)

Happy diffusing! Head over to our page on [Image to Image](/docs/integrations/photoshop/image-to-image) to learn how to use this plugin to generate new assets from your existing images.
