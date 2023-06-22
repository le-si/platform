import { Navigate, Route, RouteObject } from "react-router-dom";
import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";

import animation from "./Features/Animation.md?raw";
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
    summary: React.ReactNode;

    /** The content to render */
    content: Markdown | React.ReactElement | React.ReactNode;

    /** Optional sidebar icon */
    icon?: React.ReactElement | React.ReactNode;

    /** Optional path to an image to use when rendering this in a Theme.LinksGrid  */
    imageURL?: string;

    /** Optional children to nest under this group in the sidebar. */
    children?: Group[];
  };

  export function create(): Documentation {
    return [
      {
        icon: "rocket",
        name: "Get Started",
        route: "/docs/getting-started",
        imageURL: "/RocketLaunch.png",
        summary:
          "Learn how to authenticate, use credits, and make calls to our APIs.",

        content: "content!\nyay!",
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
        icon: "question",
        name: "FAQ",
        route: "/docs/reference/faq",
        imageURL: "/QuestionDog.png",
        summary: "Have a question? We might have an answer.",

        content: frequentlyAskedQuestions
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

    const routes = React.useMemo(() => {
      const routes = (documentation: Documentation): RouteObject[] =>
        documentation.flatMap((group) => {
          const element =
            typeof group.content === "string" ? (
              <div className="mx-auto w-full max-w-[80rem] text-left">
                <Markdown>{group.content}</Markdown>
              </div>
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

    return routes;
  }
}
