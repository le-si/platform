import { Link } from "react-router-dom";

import { TopBar } from "~/App/TopBar";

import { Theme } from "..";

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
          <div
            style={
              noScroll
                ? {
                    height: `calc(100vh - (${TopBar.height()} + ${
                      noFooter ? "0rem" : "4rem"
                    }))`,
                  }
                : {
                    minHeight: `calc(100vh - (${TopBar.height()} + ${
                      noFooter ? "0rem" : "4rem"
                    }))`,
                  }
            }
          >
            {children}
          </div>
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
    <div className="relative mt-auto flex w-full items-start justify-between border-t border-zinc-100 bg-white px-5 md:items-center lg:h-16">
      <div className="opacity-muted pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-end justify-center whitespace-nowrap p-6 italic lg:items-center">
        © STABILITY AI LTD, 2023
      </div>
      <div className="flex flex-col gap-6 py-6 lg:flex-row lg:p-0">
        <Link
          to="/support"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Support
        </Link>
        <Link
          to="/legal/terms-of-service"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          ToS
        </Link>
        <Link
          to="/legal/privacy-policy"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Privacy
        </Link>
        <Link to="/faq" className="text-sm font-semibold hover:text-indigo-500">
          FAQ
        </Link>
      </div>

      <div className="flex flex-col gap-6 py-6 lg:flex-row lg:p-0">
        <a
          href="https://stability.ai"
          className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-500"
          target={"_blank"}
          rel="noreferrer"
        >
          stability.ai <Theme.Icon.ExternalLink />
        </a>
        <a
          href="https://discord.gg/stablediffusion"
          className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-500"
          target={"_blank"}
          rel="noreferrer"
        >
          Discord <Theme.Icon.ExternalLink />
        </a>
        <a
          href="https://stabilityai.instatus.com/"
          className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-500"
          target={"_blank"}
          rel="noreferrer"
        >
          API Status <Theme.Icon.ExternalLink />
        </a>
      </div>
    </div>
  );
}
