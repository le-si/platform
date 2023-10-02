import { useAuth0 } from "@auth0/auth0-react";
import { Environment } from "~/Environment";

export type AccessToken = string;
export namespace AccessToken {
  export const use = (): AccessToken | undefined => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
      useAuth0();
    const [accessToken, setAccessToken] = useState<AccessToken | undefined>();

    useEffect(() => {
      if (!isAuthenticated) return;
      let isCancelled = false;

      (async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          if (!isCancelled) setAccessToken(accessToken);
        } catch (error) {
          console.error(error);
          await loginWithRedirect({
            appState: {
              returnTo: window.location.pathname + window.location.search,
            },
            authorizationParams: {
              audience: Environment.get("AUTH0_AUDIENCE"),
            },
          });
        }
      })();

      return () => {
        isCancelled = true;
      };
    }, [loginWithRedirect, getAccessTokenSilently, isAuthenticated]);

    return accessToken;
  };
}
