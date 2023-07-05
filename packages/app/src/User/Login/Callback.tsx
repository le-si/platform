import * as Auth0 from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { Theme } from "~/Theme";

export function Callback() {
  const { isLoading } = Auth0.useAuth0();
  if (isLoading) return <Theme.Loading.Overlay />;
  return <Navigate to="/sandbox" replace />;
}

export namespace Callback {
  export const url = () => "/auth0" as const;
}
