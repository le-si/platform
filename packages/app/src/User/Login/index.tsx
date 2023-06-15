import * as Auth0 from "@auth0/auth0-react";

import { Callback } from "./Callback";
import { User } from "..";
import { Link } from "react-router-dom";

export declare namespace Login {
  export { Callback };
}

export namespace Login {
  Login.Callback = Callback;

  export function Button() {
    const { loginWithRedirect } = Auth0.useAuth0();
    const onClick = useCallback(
      () =>
        loginWithRedirect({
          appState: { returnTo: window.location.pathname },
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE
          }
        }),
      [loginWithRedirect]
    );
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
        <Link
          to="/account/overview"
          className="rounded-full ring-1 ring-transparent duration-100 hover:ring hover:ring-indigo-500"
        >
          <User.Avatar />
        </Link>
      );
    }
  }
}
