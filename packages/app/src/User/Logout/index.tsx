import * as Auth0 from "@auth0/auth0-react";
import { Theme } from "~/Theme";

export function Logout() {
  const { logout } = Auth0.useAuth0();
  logout({ logoutParams: { returnTo: window.location.origin } });
  return <Theme.Loading.Overlay />;
}

export namespace Logout {
  export const url = () => "/logout" as const;
}
