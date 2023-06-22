import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { topBarHeight } from "~/App/TopBar";
import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";
import { Documentation } from ".";

type Subroute = {
  /** Used to label the SideBar link & GlobalSearch results */
  name: string;
  url: string;
  subroutes?: Subroute[];
};

function DocButton({
  name,
  route,
  children,
  indent = 0
}: Documentation.Group & { indent?: number }) {
  const location = useLocation();

  const active = location.pathname === route;
  const softActive = location.pathname.startsWith(route);

  return (
    <div
      className={classes(
        indent === 0
          ? "border-b border-zinc-300 last:border-b-0"
          : "first:pt-1 last:pb-1",
        children && softActive && "pb-1"
      )}
    >
      <Link
        to={route}
        className={classes(
          "block w-full",
          indent === 0 ? "p-3" : "p-1",
          active ? "bg-indigo-500 text-white" : "hover:bg-indigo-200"
        )}
        style={indent > 0 ? { paddingLeft: `${indent * 1.5}rem` } : undefined}
      >
        {name}
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

  useEffect(() => {
    if (location.pathname === "/docs") {
      navigate("/docs/getting-started");
    }
  }, [location.pathname]);

  return (
    <div className="relative flex w-full gap-5 px-5">
      <div
        className="fixed mt-5 flex w-full max-w-[20rem] flex-col gap-5"
        style={{
          top: topBarHeight()
        }}
      >
        <div className="bg-brand-amber-1 flex w-full flex-col overflow-hidden rounded-xl">
          {routes.map((route) => (
            <DocButton key={route.name} {...route} />
          ))}
        </div>
      </div>
      <div className="w-[20rem] shrink-0" />
      <div className="mx-auto flex w-full max-w-[80rem] justify-center overflow-hidden">
        <div className="flex flex-col gap-6">
          <Outlet />
          {/* <div className="flex w-full justify-between gap-7"></div> */}
          {/* TODO: next/previous buttons */}
        </div>
      </div>
    </div>
  );
}
