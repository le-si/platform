import * as Auth0 from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { User } from "~/User";

export function Provider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const onRedirect = React.useCallback(
    (appState?: Auth0.AppState) =>
      navigate(appState?.returnTo ?? window.location.pathname),
    [navigate]
  );

  return <>{children}</>;
}

function ErrorInterceptor({ children }: React.PropsWithChildren) {
  const { error } = Auth0.useAuth0();

  useEffect(() => {
    if (!error || isIgnorableError(error)) return;
    console.error(error);
  }, [error]);

  return <>{children}</>;
}

function isIgnorableError(error: unknown) {
  return (
    error instanceof Auth0.OAuthError &&
    (error.error === "login_required" || error.error === "cancelled")
  );
}
