# Using the Upscaler in Stability for Photoshop {#upscaler}

Once you've completed [Getting Started](/docs/integrations/UsingPhotoshopGettingStarted), click on the tab labeled 'Upscaler' at the top of the plugin panel to switch to the Upscaler. You should see the following UI:

![](/Photoshop/upscaler_default.png)

1. First, decide if you want to upscale your entire document or just a single layer. You can access both options by clicking the 'Upscaler Source' dropdown. The selected upscale sizes available will change depending on which option you choose. You can see the expected output size above the 'Upscale' button - in this case it's 1536 x 1536. The upscaler supports up to 2048 x 2048, and images of any aspect ratio.

![](/Photoshop/upscaler_select_source.png)

2. Choose a factor to upscale your image or document to. If the resulting image would be larger than the maximum available size of 2048 x 2048, that factor option will be grayed out. You can also select 'Use Document Size' if the Upscaler Source is set to 'Selected Layer' - this will use the dimensions of the document as the output size.

![](/Photoshop/select_upscale_factor.png)

3. Once you have your factor and source selected, click 'Upscale' and you should see your result in the image selection area below. Image Upscaling costs 0.2 credits per image. Note that your results probably won't look very different from your input - that's to be expected! Select 'Layer' and the image will be added to your document at its native resolution. Note that if the upscaled image is larger than the document, it will be resized to fit - simply rescale it to the size you want.

![](/Photoshop/upscaler_result.png)

You may notice some artifacting on the edges of the inpainted region of your document. This is expected, and due to the upscaler itself. We are working on improving the upscaler to reduce this artifacting, but for now, it's best to avoid using the upscaler on images with large amounts of inpainting or other seams.

Happy upscaling! Head over to our page on [Image to Image](/docs/integrations/photoshop/image-to-image) to learn how to use this plugin to generate new assets from your existing images, or [Text to Image](/docs/integrations/photoshop/text-to-image) to learn how to generate new images from scratch.
