import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function NavButton({
  children,
  url,
  active,
}: React.PropsWithChildren<{
  url: string;
  active?: boolean;
}>) {
  return (
    <Link
      to={url}
      className={classes(
        "border-b border-zinc-300 p-3 last:border-b-0",
        active ? "bg-indigo-500 text-white" : "duration-100 hover:bg-indigo-200"
      )}
    >
      {children}
    </Link>
  );
}

export function Page() {
  const location = useLocation();
  const navigate = useNavigate();

  // redirect to /account/overview if no subpage is selected
  useEffect(() => {
    if (location.pathname === "/account") {
      navigate("/account/overview");
    }
  }, [location.pathname]);

  return (
    <div className="mt-6 flex w-full gap-5 px-5">
      <div className="flex w-full max-w-[20rem] flex-col gap-5">
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          <NavButton
            url="/account/overview"
            active={location.pathname === "/account/overview"}
          >
            Account
          </NavButton>
          <NavButton
            url="/account/billing"
            active={location.pathname === "/account/billing"}
          >
            Billing
          </NavButton>
          <NavButton
            url="/account/keys"
            active={location.pathname === "/account/keys"}
          >
            API Keys
          </NavButton>
        </div>
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          <NavButton url="/logout">Logout</NavButton>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[80rem] justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export namespace Page {
  export const url = () => "/account" as const;
}
