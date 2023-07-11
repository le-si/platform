import * as Auth0 from "@auth0/auth0-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { type SetRequired } from "type-fest";
import { Theme } from "~/Theme";

import { User } from "~/User";

export function Provider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const onRedirect = React.useCallback(
    (appState?: Auth0.AppState) =>
      navigate(appState?.returnTo ?? window.location.pathname, {
        replace: true,
      }),
    [navigate]
  );

  return (
    <Auth0.Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      onRedirectCallback={onRedirect}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: `${window.location.origin}${User.Login.Callback.url()}`,
      }}
    >
      <ErrorHandler>{children}</ErrorHandler>
    </Auth0.Auth0Provider>
  );
}

function ErrorHandler({ children }: React.PropsWithChildren) {
  const { error } = Auth0.useAuth0();
  const { enqueueSnackbar } = Theme.Snackbar.use();

  useEffect(() => {
    if (!error) return;

    if (Auth0Error.is(error)) {
      if (Auth0Error.canIgnore(error)) return;

      console.error("[Auth0]", toJSON(error));

      enqueueSnackbar(error.error_description, {
        variant: "error",
        preventDuplicate: true,
      });
    } else {
      console.error("[Auth0]", toJSON(error));

      enqueueSnackbar(error.message, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  }, [enqueueSnackbar, error]);

  return <>{children}</>;
}

type Auth0Error = SetRequired<Auth0.OAuthError, "error_description" | "error">;
namespace Auth0Error {
  export const is = (x: unknown): x is Auth0Error =>
    x instanceof Error &&
    "error" in x &&
    typeof x.error === "string" &&
    x.error.length > 0 &&
    "error_description" in x &&
    typeof x.error_description === "string" &&
    x.error_description.length > 0;

  export const canIgnore = (error: Auth0Error): boolean =>
    error.error === "login_required" || error.error === "cancelled";
}

function toJSON(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (ignored) {
    return `Failed to convert the following to JSON: ${value}`;
  }
}
