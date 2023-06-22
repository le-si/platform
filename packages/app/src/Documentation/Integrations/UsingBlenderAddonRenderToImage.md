# Generating Images from Your Renders in Stability for Blender {#generating-images}

One of the most commonly used features of the addon is the ability to generate images from your existing renders. This is a great way to experiment with different styles or aesthetics in Blender without having to remodel your existing scene!

![](/Blender/orb_before_after.png)

1. Load up a Blender project - if you don't have one handy, download our demo project [here](https://github.com/Stability-AI/stability-blender-addon-public/blob/main/example_scenes/the%20orb.blend).

2. Open your project and select the Stability panel in the 3D View. You may need to click this arrow on the right side of the 3D View panel:

![](/Blender/image_editor_slide_out.jpg)

3. Enter your Stability API key, and you should see the following UI:

![](/Blender/3D_view_default.jpg)

4. Add a prompt, or replace the default one with `A mystical floating orb, concept art, matte painting, HQ, 4k`. You can also use the `Presets` dropdown next to the Add button to add a style preset; if you'd like to add your own presets, there is a button to open the presets file in your text editor under `Render Options`.

5. In Blender's File menu, click `Render` -> `Render Image`. This will render a frame from your scene.

![](/Blender/render_to_image_render.png)

6. In the addon window, click the arrow next to Init Options dropdown - and change `Init Type` to `Texture`. Click `Use Render` (with the old-timey camera icon). This will tell the addon to use the rendered frame as the initial image for the diffusion process. With both changes made, your addon window should look like this:

![](/Blender/render_to_image_ready.png)

7. Time to generate an image. Press the 'Dream (Texture)' button to generate an image from your rendered frame. The addon will send the image to the Stability API, and when the API finishes processing your image, the result will be displayed in a pop up window. Isn't that neat!

![](/Blender/render_to_image_finished.png)

Now you're ready for the coolest feature in the addon - generating animations from your renders! Check out the [Render to Animation](/docs/integrations/blender/animation) page for more details.
