import * as Auth0 from "@auth0/auth0-react";
import { Theme } from "~/Theme";

export function Page() {
  const { loginWithRedirect } = Auth0.useAuth0();

  // get history and redirect to previous page after login (just get the pathname of the previous page)
  const lastPage = window.history.state?.returnTo ?? "/";

  loginWithRedirect({
    appState: { returnTo: lastPage },
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  return <Theme.Loading.Overlay />;
}
