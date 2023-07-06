import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

export function NotFound() {
  return (
    <Theme.Page noScroll>
      <div className="flex h-full select-none flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl opacity-75">This page doesn&apos;t exist....</p>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-500 duration-100 hover:text-indigo-400"
        >
          Go back home <Theme.Icon.Arrow />
        </Link>
      </div>
    </Theme.Page>
  );
}
