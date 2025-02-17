import * as Auth0 from "@auth0/auth0-react";
import { OpenAPI } from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { GRPC } from "~/GRPC";

import { AccessToken } from "./AccessToken";
import { Account } from "./Account";
import { APIKey, APIKeys } from "./APIKey";
import { Avatar } from "./Avatar";
import { Delete } from "./Delete";
import { FineTuning } from "./FineTuning";
import { IdentityToken } from "./IdentityToken";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Organization } from "./Organization";
import { Provider } from "./Provider";

export type User = {
  id: ID;
  email?: string;
  name?: string;
  avatar?: string;
  organizationID?: ID;
  apiKeys?: APIKeys;
};

export declare namespace User {
  export {
    AccessToken,
    APIKey,
    APIKeys,
    Avatar,
    IdentityToken,
    Provider,
    Login,
    Logout,
    Account,
    Delete,
    Organization,
    FineTuning,
  };
}

export namespace User {
  User.AccessToken = AccessToken;
  User.APIKey = APIKey;
  User.APIKeys = APIKeys;
  User.Avatar = Avatar;
  User.IdentityToken = IdentityToken;
  User.Provider = Provider;
  User.Login = Login;
  User.Logout = Logout;
  User.Account = Account;
  User.Delete = Delete;
  User.Organization = Organization;
  User.FineTuning = FineTuning;

  export const use = () => {
    const accessToken = AccessToken.use();
    const identityToken = IdentityToken.use();
    const auth0 = Auth0.useAuth0();

    const query = ReactQuery.useQuery({
      enabled: !!accessToken,
      staleTime: 5 * 60 * 1000,

      queryKey: ["User.use"],
      queryFn: async (): Promise<User> => {
        const response = await fetch(
          `${import.meta.env.VITE_API_REST_URL}/v1/user/account`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const user: OpenAPI.UserAccountResponseBody = await response.json();
        const dashboardResponse = await GRPC.get()?.dashboard.getMe({});

        return {
          id: user.id,
          email: user.email,
          avatar: user.profile_picture,
          organizationID: user.organizations?.[0]?.id,
          apiKeys: dashboardResponse?.response.apiKeys.map(
            ({ createdAt, ...key }) => ({
              ...key,
              created: new Date(Number(createdAt) * 1000),
            })
          ),
        };
      },
    });

    const user = useMemo(
      () =>
        auth0.isAuthenticated
          ? { ...query.data, name: identityToken?.name }
          : undefined,
      [query.data, identityToken?.name, auth0.isAuthenticated]
    );

    return {
      ...query,
      isLoading: auth0.isAuthenticated ? query.isLoading : auth0.isLoading,
      user,
    };
  };
}
