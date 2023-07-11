import { Link } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function TopBar() {
  const isScrolledToTop = useIsScrolledToTop();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={classes("sticky top-0 z-50 flex w-full shrink-0 flex-col")}>
      <div
        style={{
          height: TopBar.height(),
        }}
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

// function Help() {
//   return (
//     <svg
//       width="32"
//       height="32"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_1110_24449)">
//         <path
//           d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
//           stroke="#18181B"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M8.79883 8.70004C9.05744 7.96488 9.5679 7.34496 10.2398 6.95009C10.9117 6.55522 11.7016 6.41087 12.4697 6.54262C13.2378 6.67437 13.9345 7.07372 14.4364 7.66992C14.9383 8.26613 15.213 9.02072 15.2118 9.80004C15.2118 12 11.9118 13.1 11.9118 13.1"
//           stroke="#18181B"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M12 17.5H12.011"
//           stroke="#18181B"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_1110_24449">
//           <rect width="24" height="24" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>
//   );
// }
