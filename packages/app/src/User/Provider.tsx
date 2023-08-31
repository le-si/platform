import * as Auth0 from "@auth0/auth0-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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
  const { error, loginWithRedirect } = Auth0.useAuth0();
  const { enqueueSnackbar } = Theme.Snackbar.use();

  useEffect(() => {
    if (!error || AuthError.isIgnorableError(error)) return;
    if (AuthError.isLoginRequiredError(error)) {
      loginWithRedirect().catch(console.error);
      return;
    }

    console.error("[Auth0]", toJSON(error));

    enqueueSnackbar(AuthError.getMessage(error), {
      preventDuplicate: true,
      variant: AuthError.isEmailNotVerifiedError(error) ? "warning" : "error",
    });
  }, [enqueueSnackbar, error]);

  return <>{children}</>;
}

type AuthError = {
  readonly error: string;
  readonly error_description: string;
};

namespace AuthError {
  export const is = (x: unknown): x is AuthError =>
    typeof x === "object" &&
    x !== null &&
    "error" in x &&
    typeof x.error === "string" &&
    x.error.length > 0 &&
    "error_description" in x &&
    typeof x.error_description === "string" &&
    x.error_description.length > 0;

  export const getMessage = (error: Error): string =>
    AuthError.is(error) ? error.error_description : error.message;

  export const isEmailNotVerifiedError = (x: unknown): boolean =>
    AuthError.is(x) &&
    x.error === "unauthorized" &&
    x.error_description === "Please verify your email before logging in.";

  export const isIgnorableError = (x: unknown): boolean =>
    AuthError.is(x) && x.error === "cancelled";

  export const isLoginRequiredError = (x: unknown): boolean =>
    AuthError.is(x) && x.error === "login_required";
}

function toJSON(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (ignored) {
    return `Failed to convert to JSON: ${value}`;
  }
}
