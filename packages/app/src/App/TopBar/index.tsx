import { Link } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function TopBar() {
  const isScrolledToTop = useIsScrolledToTop();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex w-full shrink-0 flex-col">
      <div
        style={{ height: TopBar.height() }}
        className={classes(
          "flex shrink-0 items-center justify-between border-b border-transparent bg-white px-5 duration-100",
          navOpen && "border-zinc-200 sm:border-transparent",
          !isScrolledToTop && "border-zinc-200 sm:border-zinc-200"
        )}
      >
        <div className="flex w-1/3 items-center gap-2 sm:hidden">
          {navOpen ? (
            <Theme.Icon.X
              className="h-6 w-6 cursor-pointer text-black"
              onClick={() => setNavOpen(false)}
            />
          ) : (
            <Theme.Icon.Menu
              className="h-6 w-6 cursor-pointer text-black"
              onClick={() => setNavOpen(true)}
            />
          )}
        </div>
        <div className="w-1/3">
          <div className="sm:w-fit">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 sm:justify-start"
            >
              <img src="/full-logo-black.svg" className="w-[90px]" />
              <div className="hidden h-6 w-px bg-black lg:block" />
              <h1 className="hidden text-sm font-medium lg:block">
                Developer Platform
              </h1>
            </Link>
          </div>
        </div>
        <div className="hidden w-1/3 items-center justify-center gap-6 sm:flex">
          <Link
            to="/sandbox"
            className="text-sm font-semibold hover:text-indigo-500"
          >
            Sandbox
          </Link>
          <Link
            to="/docs/getting-started"
            className="text-sm font-semibold hover:text-indigo-500"
          >
            Documentation
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-semibold hover:text-indigo-500"
          >
            Pricing
          </Link>
        </div>

        <div className="flex w-1/3 items-center justify-end gap-3">
          <GlobalSearch.Modal.OpenButton />
          <User.Login.Button />
        </div>
      </div>
      {navOpen && (
        <div className="flex h-fit w-full flex-col gap-3 border-b border-zinc-200 bg-white px-5 py-3 sm:hidden">
          <Link
            to="/sandbox"
            className="text-sm font-semibold hover:text-indigo-500"
            onClick={() => setNavOpen(false)}
          >
            Sandbox
          </Link>
          <Link
            to="/docs/getting-started"
            className="text-sm font-semibold hover:text-indigo-500"
            onClick={() => setNavOpen(false)}
          >
            Documentation
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-semibold hover:text-indigo-500"
            onClick={() => setNavOpen(false)}
          >
            Pricing
          </Link>
        </div>
      )}
    </div>
  );
}

function useIsScrolledToTop() {
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolledToTop(window.scrollY < 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolledToTop;
}

export namespace TopBar {
  export const height = () => "4rem" as const;
}
