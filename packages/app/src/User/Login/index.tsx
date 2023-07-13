import * as Auth0 from "@auth0/auth0-react";

import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

import { User } from "..";

import { Callback } from "./Callback";
import { Page } from "./Page";

export declare namespace Login {
  export { Callback, Page };
}

export namespace Login {
  Login.Callback = Callback;
  Login.Page = Page;

  const use = () => {
    const { loginWithRedirect } = Auth0.useAuth0();

    return useCallback(
      () =>
        loginWithRedirect({
          appState: { returnTo: window.location.pathname },
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        }),
      [loginWithRedirect]
    );
  };

  export function CTA() {
    const onClick = use();
    const { user } = User.use();

    if (!user) {
      return (
        <div className="flex flex-col items-center gap-3">
          <p className="w-full select-none text-center">
            Please log in to use the sandbox
          </p>
          <a
            className="w-fit cursor-pointer select-none rounded-full border border-black/75 px-3 py-1 font-semibold duration-100 hover:border-indigo-500 hover:bg-indigo-300/10 hover:text-indigo-500"
            onClick={onClick}
          >
            Login
          </a>
        </div>
      );
    }

    return null;
  }

  export function Button() {
    const onClick = use();
    const { user } = User.use();

    if (!user) {
      return (
        <a
          className="cursor-pointer select-none text-sm font-semibold hover:text-indigo-500"
          onClick={onClick}
        >
          Login
        </a>
      );
    } else {
      return (
        <Theme.Tooltip content="View your account page" placement="bottom">
          <Link
            to="/account/keys"
            className="block rounded-full ring-1 ring-transparent duration-100 hover:ring hover:ring-indigo-500"
          >
            <User.Avatar />
          </Link>
        </Theme.Tooltip>
      );
    }
  }
}
