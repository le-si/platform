import * as ReactRouter from "react-router-dom";
import { Page } from "~/App/Page";
import { Overview } from "~/Overview";

import { Sandbox } from "~/Sandbox";
import { ImageToImage } from "~/Sandbox/ImageToImage";
import { List } from "~/Sandbox/List";
import { TextToImage } from "~/Sandbox/TextToImage";
import { Upscaling } from "~/Sandbox/Upscaling";
import { User } from "~/User";

export function Router() {
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
      path: User.Logout.url(),
      element: <User.Logout />
    },
    {
      path: User.Login.Callback.url(),
      element: <User.Login.Callback />
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
