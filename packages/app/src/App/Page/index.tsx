import { Link } from "react-router-dom";

import { TopBar } from "../TopBar";

// TODO: Move this to Theme so we can reference it as Theme.Page
export function Page({
  children,
  className,
  noScroll,
  noFooter,
}: StyleableWithChildren & {
  noScroll?: boolean;
  noFooter?: boolean;
}) {
  return (
    <div
      className={classes("z-0 w-full", className)}
      style={
        noScroll
          ? {
              height: `calc(100vh - (${TopBar.height()} + ${
                noFooter ? "0rem" : "4rem"
              }))`,
            }
          : undefined
      }
    >
      <TopBar />

      {!noFooter ? (
        <>
          <div className="min-h-screen">{children}</div>
          <Footer />
        </>
      ) : (
        children
      )}
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-auto flex h-16 w-full items-center justify-between border-t border-zinc-100 bg-white px-5">
      <div className="flex gap-6">
        <Link
          to="/support"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Support
        </Link>
        <Link
          to="https://stabilityai.instatus.com/"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Status
        </Link>
        <Link
          to="/legal/terms-of-service"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Terms of Service
        </Link>
        <Link
          to="/legal/privacy-policy"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Privacy Policy
        </Link>
        <a
          href="https://stability.ai"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          stability.ai
        </a>
      </div>
      <div className="flex gap-6">
        <a
          href="https://discord.gg/stablediffusion"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Discord
        </a>
      </div>
    </div>
  );
}
