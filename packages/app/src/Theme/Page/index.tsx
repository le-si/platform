import { TopBar } from "~/App/TopBar";

import { Theme } from "..";

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
          <Theme.Footer />
        </>
      ) : (
        children
      )}
    </div>
  );
}
