import * as ReactRouter from "react-router-dom";
import { Page } from "~/App/Page";
import { Overview } from "~/Overview";

import { Sandbox } from "~/Sandbox";
import { List } from "~/Sandbox/List";
import { TextToImage } from "~/Sandbox/TextToImage";
import { User } from "~/User";

export function Router() {
  return ReactRouter.useRoutes([
    {
      path: "/",
      element: (
        <Page noFooter noScroll>
          <Overview />
        </Page>
      ),
    },
    {
      path: "/sandbox",
      element: (
        <Page>
          <List />
        </Page>
      ),
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
  ]);
}

export namespace Router {
  export const useNavigate = ReactRouter.useNavigate;
  export const useLocation = ReactRouter.useLocation;

  export const Provider = ReactRouter.BrowserRouter;
}
