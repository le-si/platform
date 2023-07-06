import * as Auth0 from "@auth0/auth0-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";
import { Theme } from "~/Theme";
import { User } from "~/User";

function Component() {
  const location = useLocation();
  const navigate = useNavigate();

  // redirect to /account/overview if no subpage is selected
  useEffect(() => {
    if (location.pathname === "/account") {
      navigate(User.Account.Overview.url() + location.search);
    }
  }, [location.pathname, location.search, navigate]);

  return (
    <div className="mt-6 flex w-full gap-5 px-5">
      <div className="flex w-full max-w-[20rem] flex-col gap-5">
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          <Theme.NavButton
            url={User.Account.Overview.url()}
            active={location.pathname === User.Account.Overview.url()}
          >
            Account
          </Theme.NavButton>
          <Theme.NavButton
            url={User.Account.Credits.url()}
            active={location.pathname === User.Account.Credits.url()}
          >
            Billing
          </Theme.NavButton>
          <Theme.NavButton
            url={User.APIKeys.Table.url()}
            active={location.pathname === User.APIKeys.Table.url()}
          >
            API Keys
          </Theme.NavButton>
        </div>
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          <Theme.NavButton url="/logout">Logout</Theme.NavButton>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[80rem] justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export function Page() {
  const ProtectedComponent = Auth0.withAuthenticationRequired(Component, {
    onRedirecting: () => <Theme.Loading.Overlay />,
    returnTo: location.pathname + location.search,
  });

  return <ProtectedComponent />;
}

export namespace Page {
  export const url = () => "/account" as const;

  export const searchCandidate = (): GlobalSearch.Candidate[] => [
    {
      route: Page.url(),
      name: "Account",
      content: "User account, account page",
    },
    {
      route: Page.url() + "/" + User.APIKeys.Table.uri(),
      name: "API Key Management",
      content:
        "api key, api keys, api key management, api key table, api key list",
    },
    {
      route: Page.url() + "/" + User.Account.Credits.uri(),
      name: "Buy Credits",
      content:
        "buy credits, out of credits, purchase credits, get credits, purchase history, payments",
    },
  ];
}
