# Generating Animations from Video with Stability for Blender {#generating-video}

One of the coolest features of the addon is the ability to render out entire Blender animations to video. Follow the steps below to make an animation like this one:

![](/Blender/animation_preview.gif)

1. Open the example project, which you can download [here](https://github.com/Stability-AI/stability-blender-addon-public/blob/main/example_scenes/toy_city.blend). Open the Stability addon panel, and change the `Init Type` under `Init Options` to `Animation`.

![](/Blender/render_animation_init.png)

2. Hover your mouse cursor over the `Init Strength` parameter in the addon UI, under the `Init Options` dropdown. Press I to insert a keyframe for the parameter at the current value - try using 0.8 to start. Your UI should look like this:

![](/Blender/animation_insert_keyframes.png)

3. Then, scrub the timeline to the last frame of your animation, and change the `Init Strength` parameter to a different value. Press I again to insert a keyframe at the new value. Your timeline should look like this:

![](/Blender/animation_timeline.png)

4. Set the File Format in Blender's output options to `PNG`. Then, create a new directory (or point to a pre-existing directory) to hold your output images, and select it as the output location in Blender's Output Settings tab. Your settings should look like this:

![](/Blender/render_anim_frames.png)

5. If you haven't yet, at this point you'll need to render out your animation to frames. These frames will be saved to the new directory you've just created for your output images. You can do this by clicking the `Render` drop-down and pressing `Render Animation` while in the Render tab.

![](/Blender/render_animation.png)

6. Select the directory your just created as `Frame Directory` in the addon window, under Render Options, and press `Dream (Animate)`. You should see the addon generate a new frame in the output folder, with each parameter at its interpolated value for each frame. While the generation is progress, you should see this UI:

![](/Blender/animation_in_progress.png)

7.  Press `Open Output Folder` under `Generation Options` to open the folder with your generated frames.

8.  From here, you can import the frames back into Blender, or any video editing program to create a video. [Gifski](https://gif.ski/) is a great, simple GUI tool for converting sets of frames like this to a gif.

    You can also use the following ffmpeg command to convert the frames to a video:

        ffmpeg -framerate 30 -pattern_type glob -i '*.png' \ -c:v libx264 -pix_fmt yuv420p out.mp4

    Or, if you use ImageMagick:

        convert -delay 10 -loop 0 *.png out.gif

Happy animating! Be sure to post your creations on [Twitter](https://twitter.com/hashtag/stablediffusion) or [Discord](https://discord.gg/stablediffusion), we'd love to see them!
