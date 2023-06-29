import * as ReactRouter from "react-router-dom";
import { App } from "~/App";
import { Documentation } from "~/Documentation";
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
import { Scroll } from "~/Scroll";
import { User } from "~/User";

export function Router() {
  Scroll.useScrollToTopOrHashOnNavigate();

  return ReactRouter.useRoutes([
    {
      path: "/",
      element: (
        <App.Page>
          <Overview />
        </App.Page>
      ),
    },
    {
      path: "/sandbox",
      element: (
        <App.Page>
          <List />
        </App.Page>
      ),
    },
    {
      path: Pricing.url(),
      element: (
        <App.Page>
          <Pricing />
        </App.Page>
      ),
    },
    {
      path: "/docs",
      element: (
        <App.Page>
          <Documentation.Page />
        </App.Page>
      ),
      children: [
        ...Documentation.useRoutes(),
        {
          path: "/docs/api-reference",
          element: <REST.Page />,
        },
      ],
    },
    {
      path: "/sandbox/text-to-image",
      element: (
        <App.Page noScroll noFooter>
          <Sandbox
            SandboxComponent={TextToImage}
            samples={TextToImage.Samples}
          />
        </App.Page>
      ),
    },
    {
      path: "/sandbox/image-to-image",
      element: (
        <App.Page noScroll noFooter>
          <Sandbox
            SandboxComponent={ImageToImage}
            samples={ImageToImage.Samples}
          />
        </App.Page>
      ),
    },
    {
      path: "/sandbox/upscaling",
      element: (
        <App.Page noScroll noFooter>
          <Sandbox SandboxComponent={Upscaling} samples={Upscaling.Samples} />
        </App.Page>
      ),
    },
    {
      path: "/sandbox/multi-prompting",
      element: (
        <App.Page noScroll noFooter>
          <Sandbox
            SandboxComponent={MultiPrompting}
            samples={MultiPrompting.Samples}
          />
        </App.Page>
      ),
    },
    {
      path: User.Logout.url(),
      element: <User.Logout />,
    },
    {
      path: User.Login.Callback.url(),
      element: <User.Login.Callback />,
    },
    {
      path: "/login",
      element: <User.Login.Page />,
    },
    {
      path: "/legal/terms-of-service",
      element: <Markdown.Page>{Markdown.Pages.API_TOS}</Markdown.Page>,
    },
    {
      path: "/faq",
      element: <Markdown.Page>{Markdown.Pages.FAQ}</Markdown.Page>,
    },
    {
      path: User.Account.Page.url(),
      element: (
        <App.Page>
          <User.Account.Page />
        </App.Page>
      ),
      children: [
        {
          path: "*",
          index: true,
          element: <User.Account.Overview />,
        },
        {
          path: User.Account.Credits.uri(),
          element: <User.Account.Credits autoFocus />,
        },
        {
          path: User.APIKeys.Table.uri(),
          element: <User.APIKeys.Table />,
        },
      ],
    },
  ]);
}

export namespace Router {
  export const useNavigate = ReactRouter.useNavigate;
  export const useLocation = ReactRouter.useLocation;

  export const Provider = ReactRouter.BrowserRouter;
}
