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
      navigate("/account/overview");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="mt-6 flex w-full gap-5 px-5">
      <div className="flex w-full max-w-[20rem] flex-col gap-5">
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          <Theme.NavButton
            url="/account/overview"
            active={location.pathname === "/account/overview"}
          >
            Account
          </Theme.NavButton>
          <Theme.NavButton
            url="/account/billing"
            active={location.pathname === "/account/billing"}
          >
            Billing
          </Theme.NavButton>
          <Theme.NavButton
            url="/account/keys"
            active={location.pathname === "/account/keys"}
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
    onRedirecting: () => <Theme.Icon.Spinner />,
    returnTo: location.pathname,
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
      content: "User account, account page",
    },
    {
      route: Page.url() + "/" + User.Account.Credits.uri(),
      name: "Buy Credits",
      content:
        "buy credits, out of credits, purchase credits, get credits, purchase history, payments",
    },
  ];
}
