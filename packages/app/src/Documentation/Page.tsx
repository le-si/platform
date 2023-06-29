import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopBar } from "~/App/TopBar";
import { Theme } from "~/Theme";

import { Documentation } from ".";

function DocButton({
  name,
  route,
  children,
  indent = 0,
  className,
  activeOverride,
  softActiveOverride,
}: Styleable &
  Partial<Documentation.Group> & {
    indent?: number;
    activeOverride?: boolean;
    softActiveOverride?: boolean;
  }) {
  const location = useLocation();

  const active = activeOverride ?? location.pathname === route;
  const softActive =
    softActiveOverride ?? location.pathname.startsWith(route ?? "");

  return (
    <div>
      <Link
        to={route ?? "/docs"}
        className={classes(
          "flex w-full items-center justify-between px-5 py-3.5 text-[14px]",
          indent === 0
            ? "hover:bg-[#e4e4ce] active:bg-[#e4e4ce]"
            : "hover:bg-[#ededdf] active:bg-[#ededdf]",
          (active || softActive) && "active",
          className
        )}
      >
        {name}
        {children && (
          <Theme.Icon.ChevronRight
            className={classes(
              "h-[1.5em] w-[1.5em] -rotate-90 duration-200 ease-out",
              softActive && "rotate-0 transform"
            )}
          />
        )}
      </Link>
      {children && softActive && (
        <div>
          {children.map((child) => (
            <DocButton key={child.name} {...child} indent={indent + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Page() {
  const routes = Documentation.create();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/docs") {
      navigate("/docs/getting-started");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="w-fullgap-5 relative flex px-8">
      <div
        className="fixed mt-5 flex w-full max-w-[20rem] flex-col gap-5"
        style={{
          top: TopBar.height(),
        }}
      >
        <div
          id="redoc-sidebar-container"
          className="bg-brand-amber-1 flex max-h-[calc(100vh-10.5rem)] w-full flex-col overflow-hidden overflow-y-auto rounded-xl"
        >
          {routes.map((route) => (
            <DocButton key={route.name} {...route} />
          ))}
          <DocButton
            name="API Reference"
            route="/docs/api-reference"
            activeOverride={location.hash.length > 0}
          >
            {[]}
          </DocButton>
        </div>
      </div>
      <div className="w-[20rem] shrink-0" />
      <div
        className={classes(
          "mx-auto flex w-full justify-center overflow-x-visible md:max-w-[35rem] lg:max-w-[50rem] 2xl:max-w-[80rem]"
        )}
      >
        <div className="flex w-full flex-col gap-6">
          <Outlet />
          {/* <div className="flex w-full justify-between gap-7"></div> */}
          {/* TODO: next/previous buttons */}
        </div>
      </div>
    </div>
  );
}
