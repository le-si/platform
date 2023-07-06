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
  childrenOverride,
  redirect
}: Styleable &
  Partial<Documentation.Group> & {
    indent?: number;
    activeOverride?: boolean;
    softActiveOverride?: boolean;
    childrenOverride?: React.ReactNode;
  }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const active = activeOverride ?? location.pathname.startsWith(route ?? "");

  return (
    <div className="my-0.5 flex flex-col gap-0.5 first:mt-0 last:mb-0">
      <div
        className={classes(
          "overflow-hidden rounded-lg text-black/75 duration-75 hover:bg-black/10 hover:text-black active:text-black",
          active && "active",
          (!children || (!redirect && location.pathname === route)) &&
            "active:bg-[#e4e4ce]"
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
            if (!redirect && children && location.pathname !== route) return;

            if (children && active) {
              e.preventDefault();
              setExpanded(!expanded);
            } else {
              setExpanded(true);
            }
          }}
        >
          {name}
          {children && (
            <Theme.Icon.ChevronRight
              className={classes(
                "h-[1.5em] w-[1.5em] -rotate-90 duration-200 ease-out",
                active && "rotate-0 transform"
              )}
            />
          )}
        </Link>
      </div>
      <div
        className={classes(
          (children || childrenOverride) && active && expanded
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

function flattenRoutes(routes: Documentation.Group[]): Documentation.Group[] {
  return routes.reduce<Documentation.Group[]>((acc, route) => {
    acc.push(route);
    if (route.children) {
      acc.push(...flattenRoutes(route.children));
    }
    return acc;
  }, []);
}

function findDocCursor(
  routes: Documentation.Group[],
  location: string
): {
  prev: Documentation.Group | null;
  next: Documentation.Group | null;
} {
  // flatten out the routes into a single array
  const flattenedRoutes = flattenRoutes(routes);

  // find the index of the current route
  const currentIndex = flattenedRoutes.findIndex(
    (route) => route.route === location
  );

  return {
    prev: flattenedRoutes[currentIndex - 1] ?? null,
    next: flattenedRoutes[currentIndex + 1] ?? null
  };
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

  const cursor = useMemo(
    () => findDocCursor(routes, location.pathname),
    [routes, location.pathname]
  );

  return (
    <div className="relative flex w-full flex-col gap-5 px-5 sm:flex-row">
      <div
        className="mt-5 w-full flex-col gap-5 sm:fixed sm:max-w-[20rem]"
        style={{
          top: TopBar.height()
        }}
      >
        <div className="flex w-full flex-col overflow-y-auto sm:max-h-[calc(100vh-10.5rem)]">
          {routes.slice(0, 1).map((route) => (
            <DocButton key={route.name} {...route} />
          ))}
          <DocButton
            name="REST API"
            route="/docs/api-reference"
            childrenOverride={<div id="redoc-sidebar-container" />}
          >
            {[]}
          </DocButton>
          {routes.slice(1).map((route) => (
            <DocButton key={route.name} {...route} />
          ))}
        </div>
      </div>
      <div className="hidden w-[20rem] shrink-0 sm:block" />
      <div
        className={classes(
          "mx-auto flex w-full min-w-0 max-w-[80rem] justify-center"
        )}
      >
        <div className="flex w-full flex-col gap-8">
          <Outlet />
          <div className="mb-8 flex w-full justify-between gap-8 sm:mb-24 sm:px-5 sm:py-8">
            {cursor?.prev ? (
              <div className="flex gap-2 rounded-lg">
                <Link
                  to={cursor.prev.route}
                  className="flex items-center gap-1 text-sm font-semibold duration-100 hover:text-indigo-500 sm:text-lg"
                >
                  <Theme.Icon.ChevronRight className="h-4 w-4 rotate-90" />
                  {cursor.prev.name}
                </Link>
              </div>
            ) : (
              <div />
            )}
            {cursor?.next && (
              <div className="flex gap-2 rounded-lg">
                <Link
                  to={cursor.next.route}
                  className="flex items-center gap-1 text-sm font-semibold duration-100 hover:text-indigo-500 sm:text-lg"
                >
                  {cursor.next.name}
                  <Theme.Icon.ChevronRight className="h-4 w-4 -rotate-90" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
