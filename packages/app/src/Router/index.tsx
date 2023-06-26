import * as ReactRouter from "react-router-dom";
import { Page } from "~/App/Page";
import { Documentation } from "~/Documentation";
import { Page as DocumentationPage } from "~/Documentation/Page";
import { Markdown } from "~/Markdown";
import { Overview } from "~/Overview";
import { Pricing } from "~/Pricing";
import { REST } from "~/REST";

import { Sandbox } from "~/Sandbox";
import { ImageToImage } from "~/Sandbox/ImageToImage";
import { List } from "~/Sandbox/List";
import { MultiPrompting } from "~/Sandbox/MultiPrompting";
import { TextToImage } from "~/Sandbox/TextToImage";
import { Upscaling } from "~/Sandbox/Upscaling";
import { User } from "~/User";

export function Router() {
  const path = ReactRouter.useLocation().pathname;

  // reset scroll on route change
  useEffect(() => window.scrollTo(0, 0), [path]);

  return ReactRouter.useRoutes([
    {
      path: "/",
      element: (
        <Page>
          <Overview />
        </Page>
      )
    },
    {
      path: "/sandbox",
      element: (
        <Page>
          <List />
        </Page>
      )
    },
    {
      path: "/pricing",
      element: (
        <Page>
          <Pricing />
        </Page>
      )
    },
    {
      path: "/docs",
      element: (
        <Page>
          <DocumentationPage />
        </Page>
      ),
      children: [
        ...Documentation.useRoutes(),
        {
          path: "/docs/api-reference",
          element: <REST.Page />
        }
      ]
    },
    {
      path: "/sandbox/text-to-image",
      element: (
        <Page noScroll noFooter>
          <Sandbox
            SandboxComponent={TextToImage}
            samples={TextToImage.Samples}
          />
        </Page>
      )
    },
    {
      path: "/sandbox/image-to-image",
      element: (
        <Page noScroll noFooter>
          <Sandbox
            SandboxComponent={ImageToImage}
            samples={ImageToImage.Samples}
          />
        </Page>
      )
    },
    {
      path: "/sandbox/upscaling",
      element: (
        <Page noScroll noFooter>
          <Sandbox SandboxComponent={Upscaling} samples={Upscaling.Samples} />
        </Page>
      )
    },
    {
      path: "/sandbox/multi-prompting",
      element: (
        <Page noScroll noFooter>
          <Sandbox
            SandboxComponent={MultiPrompting}
            samples={MultiPrompting.Samples}
          />
        </Page>
      )
    },
    {
      path: User.Logout.url(),
      element: <User.Logout />
    },
    {
      path: User.Login.Callback.url(),
      element: <User.Login.Callback />
    },
    {
      path: "/legal/terms-of-service",
      element: <Markdown.Page>{Markdown.Pages.API_TOS}</Markdown.Page>
    },
    {
      path: "/faq",
      element: <Markdown.Page>{Markdown.Pages.FAQ}</Markdown.Page>
    },
    {
      path: "/account",
      element: (
        <Page>
          <User.Account.Page />
        </Page>
      ),
      children: [
        {
          path: "*",
          index: true,
          element: <User.Account.Overview />
        },
        {
          path: "billing",
          element: <User.Account.Credits autoFocus />
        },
        {
          path: "keys",
          element: <User.APIKeys.Table />
        }
      ]
    }
  ]);
}

export namespace Router {
  export const useNavigate = ReactRouter.useNavigate;
  export const useLocation = ReactRouter.useLocation;

  export const Provider = ReactRouter.BrowserRouter;
}
