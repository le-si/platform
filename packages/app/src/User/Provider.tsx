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
    if (!error || canIgnoreError(error)) return;

    console.error("[Auth0]", toJSON(error));

    enqueueSnackbar(getErrorMessage(error), {
      variant: isUnverifiedEmailError(error) ? "warning" : "error",
      preventDuplicate: true,
    });
  }, [enqueueSnackbar, error]);

  return <>{children}</>;
}

type AuthError = SetRequired<Auth0.OAuthError, "error_description" | "error">;
function isAuthError(x: unknown): x is AuthError {
  return (
    x instanceof Error &&
    "error" in x &&
    typeof x.error === "string" &&
    x.error.length > 0 &&
    "error_description" in x &&
    typeof x.error_description === "string" &&
    x.error_description.length > 0
  );
}

function isUnverifiedEmailError(error: Error): boolean {
  return (
    isAuthError(error) &&
    error.error === "unauthorized" &&
    error.error_description === "Please verify your email before logging in."
  );
}

function canIgnoreError(error: Error): boolean {
  return (
    isAuthError(error) &&
    (error.error === "login_required" || error.error === "cancelled")
  );
}

function getErrorMessage(error: Error): string {
  return isAuthError(error) ? error.error_description : error.message;
}

function toJSON(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (ignored) {
    return `Failed to convert the following to JSON: ${value}`;
  }
}
