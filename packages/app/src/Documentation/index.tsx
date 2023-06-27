import { Navigate, RouteObject } from "react-router-dom";
import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";

import animationInstall from "./Features/AnimationInstall.md?raw";
import animationParameters from "./Features/AnimationParameters.md?raw";
import animationPricing from "./Features/AnimationPricing.md?raw";
import animationUsing from "./Features/AnimationUsing.md?raw";
import apiParameters from "./Features/APIParameters.md?raw";
import clipGuidance from "./Features/CLIP.md?raw";
import imageToImagePython from "./Features/ImageToImagePython.md?raw";
import imageToImageTypeScript from "./Features/ImageToImageTypeScript.md?raw";
import inpaintingPython from "./Features/InpaintingPython.md?raw";
import inpaintingTypeScript from "./Features/InpaintingTypeScript.md?raw";
import multiprompting from "./Features/Multiprompting.md?raw";
import textToImagePython from "./Features/TextToImagePython.md?raw";
import textToImageTypeScript from "./Features/TextToImageTypeScript.md?raw";
import imageUpscalerPython from "./Features/UpscalerPython.md?raw";
import imageUpscalerTypeScript from "./Features/UpscalerTypeScript.md?raw";
import variants from "./Features/Variants.md?raw";
import frequentlyAskedQuestions from "./FrequentlyAskedQuestions.md?raw";
import authentication from "./GettingStarted/Authentication.md?raw";
import creditsAndBilling from "./GettingStarted/CreditsAndBilling.md?raw";
import pythonSDK from "./GettingStarted/PythonSDK.md?raw";
import typeScriptClient from "./GettingStarted/TypeScriptClient.md?raw";
import installingBlenderAddon from "./Integrations/InstallingBlenderAddon.md?raw";
import installingPhotoshop from "./Integrations/InstallingPhotoshop.md?raw";
import UsingBlenderAddonAnimation from "./Integrations/UsingBlenderAddonAnimation.md?raw";
import UsingBlenderAddonGettingStarted from "./Integrations/UsingBlenderAddonGettingStarted.md?raw";
import UsingBlenderAddonImageEditor from "./Integrations/UsingBlenderAddonImageEditor.md?raw";
import UsingBlenderAddonRenderToImage from "./Integrations/UsingBlenderAddonRenderToImage.md?raw";
import UsingBlenderUpscaler from "./Integrations/UsingBlenderUpscaler.md?raw";
import UsingPhotoshopGettingStarted from "./Integrations/UsingPhotoshopGettingStarted.md?raw";
import UsingPhotoshopImageToImage from "./Integrations/UsingPhotoshopImageToImage.md?raw";
import UsingPhotoshopTextToImage from "./Integrations/UsingPhotoshopTextToImage.md?raw";
import UsingPhotoshopUpscaler from "./Integrations/UsingPhotoshopUpscaler.md?raw";
import releaseNotes from "./ReleaseNotes.md?raw";

export type Documentation = Documentation.Group[];
export namespace Documentation {
  export type Group = {
    /** Used to label the SideBar link & GlobalSearch results */
    name: string;

    /** URL to the documentation page. */
    route: string;

    /** Description of what can be found in this documentation. */
    summary?: React.ReactNode;

    /** The content to render */
    content?: Markdown | React.ReactElement | React.ReactNode;

    /** Optional sidebar icon */
    icon?: React.ReactElement | React.ReactNode;

    /** Optional path to an image to use when rendering this in a Theme.LinksGrid  */
    imageURL?: string;

    /** Optional children to nest under this group in the sidebar. */
    children?: Group[];

    /** Optional redirect override */
    redirect?: string;
  };

  export function create(): Documentation {
    return [
      {
        icon: "rocket",
        name: "Getting Started",
        route: "/docs/getting-started",
        imageURL: "/RocketLaunch.png",
        summary:
          "Learn how to authenticate, use credits, and make calls to our APIs.",
        redirect: "/docs/getting-started/authentication",
        children: [
          {
            name: "Authentication",
            route: "/docs/getting-started/authentication",
            imageURL: "/PadLock.png",
            summary: "Learn how to create an account and manage your keys.",

            content: authentication,
          },
          {
            name: "Credits + Billing",
            route: "/docs/getting-started/credits-and-billing",
            imageURL: "/Coins.png",
            summary:
              "Learn how to get credits and which settings most affect generation costs.",

            content: creditsAndBilling,
          },
          {
            name: "Python gRPC SDK",
            imageURL: "/Snake.png",
            route: "/docs/getting-started/python-sdk",
            summary: "Learn how to configure and use the Python SDK.",

            content: pythonSDK,
          },
          {
            name: "TypeScript gRPC Client",
            imageURL: "/AbstractShapes.png",
            route: "/docs/getting-started/typescript-client",
            summary: "Learn how to configure and use the TypeScript Client.",

            content: typeScriptClient,
          },
        ],
      },
      {
        icon: "puzzle",
        name: "gRPC API",
        route: "/docs/features",
        imageURL: "/PaintingRobot.png",
        summary: "Try out our gRPC clients for Python and TypeScript.",
        redirect: "/docs/features/api-parameters",
        children: [
          {
            name: "Parameters",
            route: "/docs/features/api-parameters",
            imageURL: "/APIParameters.png",
            summary:
              "Learn about all of the parameters available for gRPC API calls.",
            content: apiParameters,
          },
          {
            name: "Text-to-Image",
            route: "/docs/features/text-to-image",
            imageURL: "/PaintingRobot.png",
            summary: "Learn how to generate images from text.",
            redirect: "/docs/features/text-to-image/python",
            children: [
              {
                name: "Text-to-Image (Python)",
                route: "/docs/features/text-to-image/python",
                content: textToImagePython,
                icon: <Theme.Icon.Python />,
              },
              {
                name: "Text-to-Image (TypeScript)",
                route: "/docs/features/text-to-image/typescript",
                content: textToImageTypeScript,
                icon: <Theme.Icon.TypeScript />,
              },
            ],
          },
          {
            name: "Image-to-Image",
            route: "/docs/features/image-to-image",
            imageURL: "/FloatingArtOrSomething.png",
            summary: "Learn how to generate images from existing images.",
            redirect: "/docs/features/image-to-image/python",
            children: [
              {
                name: "Image-to-Image (Python)",
                route: "/docs/features/image-to-image/python",
                content: imageToImagePython,
                icon: <Theme.Icon.Python />,
              },
              {
                name: "Image-to-Image (TypeScript)",
                route: "/docs/features/image-to-image/typescript",
                content: imageToImageTypeScript,
                icon: <Theme.Icon.TypeScript />,
              },
            ],
          },
          {
            name: "Inpainting + Masking",
            route: "/docs/features/inpainting",
            imageURL: "/VRDog.png",
            summary:
              "Learn how to paint anything into existing images and how masking works.",
            redirect: "/docs/features/inpainting/python",
            children: [
              {
                name: "Inpainting (Python)",
                route: "/docs/features/inpainting/python",
                content: inpaintingPython,
                icon: <Theme.Icon.Python />,
              },
              {
                name: "Inpainting (TypeScript)",
                route: "/docs/features/inpainting/typescript",
                content: inpaintingTypeScript,
                icon: <Theme.Icon.TypeScript />,
              },
            ],
          },
          {
            name: "CLIP Guidance",
            route: "/docs/features/clip-guidance",
            imageURL: "/ClipGuiderButReal.png",
            summary: "Learn how to use CLIP to guide image generation.",

            content: clipGuidance,
          },
          {
            name: "Animation",
            route: "/docs/features/animation",
            imageURL: "/Animation/using.jpg",
            summary: "Learn how to create animations with our API.",
            redirect: "/docs/features/animation/install",
            children: [
              {
                name: "Installing",
                route: "/docs/features/animation/install",
                imageURL: "/Animation/installing.jpg",
                summary: "Learn how to install the Animation SDK.",
                content: animationInstall,
              },
              {
                name: "Using",
                route: "/docs/features/animation/using",
                imageURL: "/Animation/using.jpg",
                summary: "Learn how to use the Animation SDK.",
                content: animationUsing,
              },
              {
                name: "Parameters",
                route: "/docs/features/animation/parameters",
                imageURL: "/Animation/parameters.jpg",
                summary: "Learn about the various Animation SDK parameters.",
                content: animationParameters,
              },
              {
                name: "Pricing",
                route: "/docs/features/animation/pricing",
                imageURL: "/Animation/pricing.jpg",
                summary: "Learn about how we price Animation API usage.",
                content: animationPricing,
              },
            ],
          },
          {
            name: "Image Upscaling",
            route: "/docs/features/image-upscaling",
            imageURL: "/img2upscale.png",
            summary: "Learn how to upscale your images with our API.",
            redirect: "/docs/features/image-upscaling/python",

            children: [
              {
                name: "Upscaling (Python)",
                route: "/docs/features/image-upscaling/python",
                content: imageUpscalerPython,
                icon: <Theme.Icon.Python />,
              },
              {
                name: "Upscaling (TypeScript)",
                route: "/docs/features/image-upscaling/typescript",
                content: imageUpscalerTypeScript,
                icon: <Theme.Icon.TypeScript />,
              },
            ],
          },
          {
            name: "Multi-prompting",
            route: "/docs/features/multi-prompting",
            imageURL: "/MultiPrompt.png",
            summary: "Learn how to use multi-prompting and prompt weighting.",

            content: multiprompting,
          },
          {
            name: "Variants",
            route: "/docs/features/variants",
            imageURL: "/Variants.png",
            summary: "Learn how to create variants of generated images.",

            content: variants,
          },
        ],
      },
      {
        icon: "wrench",
        name: "Integrations",
        route: "/docs/integrations",
        imageURL: "/Photoshop/PipeBoys.png",
        summary:
          "Learn how to use the official Stability integrations for Blender and Photoshop.",
        redirect: "/docs/integrations/blender",

        children: [
          {
            name: "Blender",
            route: "/docs/integrations/blender",
            summary:
              "Learn how to use the Stability plugin to generate images, animations and textures right inside Blender.",
            imageURL: "/Blender/fancy_city.png",
            redirect: "/docs/integrations/blender/install",
            children: [
              {
                name: "Installing",
                route: "/docs/integrations/blender/install",
                imageURL: "/Blender/city_init.png",
                summary:
                  "Learn how to install the Stability addon for Blender.",

                content: installingBlenderAddon,
              },
              {
                name: "Get Started",
                route: "/docs/integrations/blender/get-started",
                imageURL: "/Blender/city_result.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from text.",

                content: UsingBlenderAddonGettingStarted,
              },
              {
                name: "Render-to-Image",
                route: "/docs/integrations/blender/render",
                imageURL: "/Blender/fancy_city.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from your renders.",

                content: UsingBlenderAddonRenderToImage,
              },
              {
                name: "Generate Textures",
                route: "/docs/integrations/blender/textures",
                imageURL: "/Blender/skyscraper_texture.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from your existing textures.",

                content: UsingBlenderAddonImageEditor,
              },
              {
                name: "Animation",
                route: "/docs/integrations/blender/animation",
                imageURL: "/Blender/city.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate animations from your videos.",

                content: UsingBlenderAddonAnimation,
              },
              {
                name: "Upscaler",
                route: "/docs/integrations/blender/upscaler",
                imageURL: "/Blender/upscaler.png",
                summary:
                  "Learn how to use the Stability addon for Blender to upscale your rendered images and animations.",

                content: UsingBlenderUpscaler,
              },
            ],
          },
          {
            name: "Photoshop",
            route: "/docs/integrations/photoshop",
            imageURL: "/Photoshop/Photoshop.png",
            summary:
              "Learn how to use the Stability plugin to generate images right inside Photoshop.",
            redirect: "/docs/integrations/photoshop/install",
            children: [
              {
                name: "Installing",
                route: "/docs/integrations/photoshop/install",
                imageURL: "/Photoshop/installing.png",
                summary:
                  "Learn how to install the Stability plugin for Photoshop.",

                content: installingPhotoshop,
              },
              {
                name: "Get Started",
                route: "/docs/integrations/photoshop/get-started",
                imageURL: "/Photoshop/get_started.png",
                summary:
                  "Learn how to authenticate and configure the Stability plugin for Photoshop.",

                content: UsingPhotoshopGettingStarted,
              },
              {
                name: "Text-to-Image",
                route: "/docs/integrations/photoshop/text-to-image",
                imageURL: "/Photoshop/concept_art.png",
                summary:
                  "Learn how to use the Stability plugin for Photoshop to generate images from text, using Stable Diffusion.",

                content: UsingPhotoshopTextToImage,
              },
              {
                name: "Image-to-Image",
                route: "/docs/integrations/photoshop/image-to-image",
                imageURL: "/Photoshop/famous_paintings.png",
                summary:
                  "Learn how to use the Stability plugin for Photoshop to generate images from your content, using Stable Diffusion.",

                content: UsingPhotoshopImageToImage,
              },
              {
                name: "Upscaler",
                route: "/docs/integrations/photoshop/upscaler",
                imageURL: "/Photoshop/upscaler.png",
                summary:
                  "Learn how to use the Stability plugin for Photoshop to upscale your content.",

                content: UsingPhotoshopUpscaler,
              },
            ],
          },
        ],
      },
      {
        icon: "question",
        name: "FAQ",
        route: "/docs/reference/faq",
        imageURL: "/QuestionDog.png",
        summary: "Have a question? We might have an answer.",

        content: frequentlyAskedQuestions,
      },
      {
        icon: "broadcast",
        name: "Release Notes",
        route: "/docs/release-notes",
        imageURL: "/GiftBoxes.png",
        summary:
          "Check out our release notes to stay up to date on the latest Stability API features!",
        content: releaseNotes,
      },
    ];
  }

  export const use = (): Documentation => React.useMemo(create, []);

  export function useRoutes() {
    const documentation = Documentation.use();

    const routes = React.useMemo(() => {
      const routes = (documentation: Documentation): RouteObject[] =>
        documentation.flatMap((group) => {
          const element =
            !group.content && group.redirect ? (
              <Navigate to={group.redirect} replace />
            ) : typeof group.content === "string" ? (
              <div className="mx-auto w-full max-w-full text-left">
                <Markdown className="w-full max-w-full 2xl:max-w-full">
                  {group.content}
                </Markdown>
              </div>
            ) : (
              group.content
            );

          return [
            {
              path: group.route,
              element: element,
            },
            ...routes(group.children ?? []),
          ];
        });

      return routes(documentation);
    }, [documentation]);

    return routes;
  }
}
