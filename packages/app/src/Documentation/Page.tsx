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
  childrenOverride
}: Styleable &
  Partial<Documentation.Group> & {
    indent?: number;
    activeOverride?: boolean;
    softActiveOverride?: boolean;
    childrenOverride?: React.ReactNode;
  }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const active = activeOverride ?? location.pathname === route;
  const softActive =
    softActiveOverride ?? location.pathname.startsWith(route ?? "");

  return (
    <div className="my-0.5 flex flex-col gap-0.5 first:mt-0 last:mb-0">
      <div
        className={classes(
          "overflow-hidden rounded-lg text-black/75 duration-75 hover:bg-black/10 hover:text-black active:text-black",
          softActive && "active",
          !children && "active:bg-[#e4e4ce]"
          // !(children && softActive) && "hover:bg-[#e4e4ce]"
        )}
        style={{
          marginLeft: `${indent * 1}rem`
        }}
      >
        <Link
          to={route ?? "/docs"}
          className={classes(
            "flex w-full items-center justify-between px-3 py-2 text-[14px]",
            className
          )}
          onClick={(e) => {
            if (children && softActive) {
              e.preventDefault();
              setExpanded(!expanded);
            }
          }}
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
      </div>
      <div
        className={classes(
          (children || childrenOverride) && softActive && expanded
            ? "block"
            : "hidden"
        )}
      >
        {childrenOverride
          ? childrenOverride
          : children &&
            children.map((child) => (
              <DocButton key={child.name} {...child} indent={indent + 1} />
            ))}
      </div>
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
          top: TopBar.height()
        }}
      >
        <div className="flex max-h-[calc(100vh-10.5rem)] w-full flex-col gap-1 overflow-y-auto">
          {routes.map((route) => (
            <DocButton key={route.name} {...route} />
          ))}
          <DocButton
            name="API Reference"
            route="/docs/api-reference"
            activeOverride={location.hash.length > 0}
            childrenOverride={<div id="redoc-sidebar-container" />}
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
