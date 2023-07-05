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
import authentication from "./GettingStarted/Authentication.md?raw";
import creditsAndBilling from "./GettingStarted/CreditsAndBilling.md?raw";
import pythonSDK from "./GettingStarted/PythonSDK.md?raw";
import typeScriptClient from "./GettingStarted/TypeScriptClient.md?raw";
import installingBlenderAddon from "./Integrations/InstallingBlenderAddon.md?raw";
import UsingBlenderAddonAnimation from "./Integrations/UsingBlenderAddonAnimation.md?raw";
import UsingBlenderAddonGettingStarted from "./Integrations/UsingBlenderAddonGettingStarted.md?raw";
import UsingBlenderAddonImageEditor from "./Integrations/UsingBlenderAddonImageEditor.md?raw";
import UsingBlenderAddonRenderToImage from "./Integrations/UsingBlenderAddonRenderToImage.md?raw";
import UsingBlenderUpscaler from "./Integrations/UsingBlenderUpscaler.md?raw";
import { ListPage } from "./ListPage";
import { Page } from "./Page";
import releaseNotes from "./ReleaseNotes.md?raw";
import { TabPage } from "./TabPage";

export type Documentation = Documentation.Group[];

export declare namespace Documentation {
  export { Page };
}

export namespace Documentation {
  Documentation.Page = Page;

  export type Group = {
    /** Used to label the SideBar link & GlobalSearch results */
    name: string;

    /** URL to the documentation page. */
    route: string;

    /** Description of what can be found in this documentation. */
    summary?: React.ReactNode;

    /** The content to render */
    content?: Markdown | React.ReactElement | React.ReactNode;

    /** Optional tabs to render (alternate markdown pages) **/
    tabs?: Omit<Group, "route">[];

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
        children: [
          {
            name: "Authentication",
            route: "/docs/getting-started/authentication",
            imageURL: "/PadLock.png",
            summary: "Learn how to create an account and manage your keys.",

            content: authentication
          },
          {
            name: "Credits + Billing",
            route: "/docs/getting-started/credits-and-billing",
            imageURL: "/Coins.png",
            summary:
              "Learn how to get credits and which settings most affect generation costs.",

            content: creditsAndBilling
          },
          {
            name: "Python gRPC SDK",
            imageURL: "/Snake.png",
            route: "/docs/getting-started/python-sdk",
            summary: "Learn how to configure and use the Python SDK.",

            content: pythonSDK
          },
          {
            name: "TypeScript gRPC Client",
            imageURL: "/AbstractShapes.png",
            route: "/docs/getting-started/typescript-client",
            summary: "Learn how to configure and use the TypeScript Client.",

            content: typeScriptClient
          }
        ]
      },
      {
        icon: "puzzle",
        name: "gRPC API",
        route: "/docs/features",
        imageURL: "/PaintingRobot.png",
        summary: "Try out our gRPC clients for Python and TypeScript.",
        children: [
          {
            name: "Parameters",
            route: "/docs/features/api-parameters",
            imageURL: "/APIParameters.png",
            summary:
              "Learn about all of the parameters available for gRPC API calls.",
            content: apiParameters
          },
          {
            name: "Text-to-Image",
            route: "/docs/features/text-to-image",
            imageURL: "/PaintingRobot.png",
            summary: "Learn how to generate images from text.",
            tabs: [
              {
                name: "Python",
                content: textToImagePython,
                icon: <Theme.Icon.Python className="h-4 w-4" />
              },
              {
                name: "TypeScript",
                content: textToImageTypeScript,
                icon: <Theme.Icon.TypeScript className="h-4 w-4" />
              },
              {
                name: "REST API Reference",
                redirect:
                  "/docs/api-reference#tag/v1generation/operation/textToImage"
              }
            ]
          },
          {
            name: "Image-to-Image",
            route: "/docs/features/image-to-image",
            imageURL: "/FloatingArtOrSomething.png",
            summary: "Learn how to generate images from existing images.",
            tabs: [
              {
                name: "Python",
                content: imageToImagePython,
                icon: <Theme.Icon.Python className="h-4 w-4" />
              },
              {
                name: "TypeScript",
                content: imageToImageTypeScript,
                icon: <Theme.Icon.TypeScript className="h-4 w-4" />
              },
              {
                name: "REST API Reference",
                redirect:
                  "/docs/api-reference#tag/v1generation/operation/imageToImage"
              }
            ]
          },
          {
            name: "Inpainting + Masking",
            route: "/docs/features/inpainting",
            imageURL: "/VRDog.png",
            summary:
              "Learn how to paint anything into existing images and how masking works.",
            tabs: [
              {
                name: "Python",
                content: inpaintingPython,
                icon: <Theme.Icon.Python className="h-4 w-4" />
              },
              {
                name: "TypeScript",
                content: inpaintingTypeScript,
                icon: <Theme.Icon.TypeScript className="h-4 w-4" />
              },
              {
                name: "REST API Reference",
                redirect:
                  "/docs/api-reference#tag/v1generation/operation/masking"
              }
            ]
          },
          {
            name: "CLIP Guidance",
            route: "/docs/features/clip-guidance",
            imageURL: "/ClipGuiderButReal.png",
            summary: "Learn how to use CLIP to guide image generation.",

            content: clipGuidance
          },
          {
            name: "Animation",
            route: "/docs/features/animation",
            imageURL: "/Animation/using.jpg",
            summary: "Learn how to create animations with our API.",
            children: [
              {
                name: "Installing",
                route: "/docs/features/animation/install",
                imageURL: "/Animation/installing.jpg",
                summary: "Learn how to install the Animation SDK.",
                content: animationInstall
              },
              {
                name: "Using",
                route: "/docs/features/animation/using",
                imageURL: "/Animation/using.jpg",
                summary: "Learn how to use the Animation SDK.",
                content: animationUsing
              },
              {
                name: "Parameters",
                route: "/docs/features/animation/parameters",
                imageURL: "/Animation/parameters.jpg",
                summary: "Learn about the various Animation SDK parameters.",
                content: animationParameters
              },
              {
                name: "Pricing",
                route: "/docs/features/animation/pricing",
                imageURL: "/Animation/pricing.jpg",
                summary: "Learn about how we price Animation API usage.",
                content: animationPricing
              }
            ]
          },
          {
            name: "Image Upscaling",
            route: "/docs/features/image-upscaling",
            imageURL: "/img2upscale.png",
            summary: "Learn how to upscale your images with our API.",
            tabs: [
              {
                name: "Python",
                content: imageUpscalerPython,
                icon: <Theme.Icon.Python className="h-4 w-4" />
              },
              {
                name: "TypeScript",
                content: imageUpscalerTypeScript,
                icon: <Theme.Icon.TypeScript className="h-4 w-4" />
              },
              {
                name: "REST API Reference",
                redirect:
                  "/docs/api-reference#tag/v1generation/operation/upscaleImage"
              }
            ]
          },
          {
            name: "Multi-prompting",
            route: "/docs/features/multi-prompting",
            imageURL: "/MultiPrompt.png",
            summary: "Learn how to use multi-prompting and prompt weighting.",

            content: multiprompting
          },
          {
            name: "Variants",
            route: "/docs/features/variants",
            imageURL: "/Variants.png",
            summary: "Learn how to create variants of generated images.",

            content: variants
          }
        ]
      },
      {
        icon: "wrench",
        name: "Integrations",
        route: "/docs/integrations",
        imageURL: "/Photoshop/PipeBoys.png",
        summary:
          "Learn how to use the official Stability integrations for Blender and Photoshop.",

        children: [
          {
            name: "Blender",
            route: "/docs/integrations/blender",
            summary:
              "Learn how to use the Stability plugin to generate images, animations and textures right inside Blender.",
            imageURL: "/Blender/fancy_city.png",
            children: [
              {
                name: "Installing",
                route: "/docs/integrations/blender/install",
                imageURL: "/Blender/city_init.png",
                summary:
                  "Learn how to install the Stability addon for Blender.",

                content: installingBlenderAddon
              },
              {
                name: "Get Started",
                route: "/docs/integrations/blender/get-started",
                imageURL: "/Blender/city_result.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from text.",

                content: UsingBlenderAddonGettingStarted
              },
              {
                name: "Render-to-Image",
                route: "/docs/integrations/blender/render",
                imageURL: "/Blender/fancy_city.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from your renders.",

                content: UsingBlenderAddonRenderToImage
              },
              {
                name: "Generate Textures",
                route: "/docs/integrations/blender/textures",
                imageURL: "/Blender/skyscraper_texture.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate images from your existing textures.",

                content: UsingBlenderAddonImageEditor
              },
              {
                name: "Animation",
                route: "/docs/integrations/blender/animation",
                imageURL: "/Blender/city.png",
                summary:
                  "Learn how to use the Stability addon for Blender to generate animations from your videos.",

                content: UsingBlenderAddonAnimation
              },
              {
                name: "Upscaler",
                route: "/docs/integrations/blender/upscaler",
                imageURL: "/Blender/upscaler.png",
                summary:
                  "Learn how to use the Stability addon for Blender to upscale your rendered images and animations.",

                content: UsingBlenderUpscaler
              }
            ]
          }
        ]
      },
      {
        icon: "broadcast",
        name: "Release Notes",
        route: "/docs/release-notes",
        imageURL: "/GiftBoxes.png",
        summary:
          "Check out our release notes to stay up to date on the latest Stability API features!",
        content: releaseNotes
      }
    ];
  }

  export const use = (): Documentation => React.useMemo(create, []);

  export function useRoutes() {
    const documentation = Documentation.use();

    return React.useMemo(() => {
      const routes = (documentation: Documentation): RouteObject[] =>
        documentation.flatMap((group) => {
          const element =
            !group.content && group.redirect ? (
              <Navigate to={group.redirect} replace />
            ) : typeof group.content === "string" && !group.children ? (
              <div className="mx-auto w-full max-w-full text-left">
                <Markdown className="w-full max-w-full 2xl:max-w-full">
                  {group.content}
                </Markdown>
              </div>
            ) : group.children ? (
              <ListPage group={group} />
            ) : group.tabs ? (
              <TabPage group={group} />
            ) : (
              group.content
            );

          return [
            {
              path: group.route,
              element: element
            },
            ...routes(group.children ?? [])
          ];
        });

      return routes(documentation);
    }, [documentation]);
  }
}
