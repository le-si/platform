import * as MobX from "mobx-react";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Redoc from "redoc";

import { TopBar } from "~/App/TopBar";
import { Scroll } from "~/Scroll";
import { Theme } from "~/Theme";

import { remToPx } from "~/Utilities";

import { RedocContent } from "./RedocContent";
import { useRedocTheme } from "./useRedocTheme";
import { useRedocURLHotfix } from "./useRedocURLHotfix";
import "./redoc-styles.scss";

/** Container & boilerplate for the Redoc documentation */
export function RedocContainer({ spec }: { spec?: object | undefined }) {
  const theme = useRedocTheme();
  const handleDeepLink = useRedocDeepLinkHandler();

  useRedocURLHotfix();

  return (
    <Redoc.ErrorBoundary>
      <Redoc.StoreBuilder
        spec={spec}
        options={{
          theme: theme,
          disableSearch: true,
          enumSkipQuotes: true,
          sortEnumValuesAlphabetically: true,
          sortTagsAlphabetically: false,
          nativeScrollbars: false,
          scrollYOffset: remToPx(TopBar.height()),
        }}
        onLoaded={handleDeepLink}
      >
        {({ loading, store }) =>
          !loading && store ? (
            <Redoc.ThemeProvider theme={store.options.theme}>
              <Redoc.StoreProvider value={store}>
                <Redoc.OptionsProvider value={store.options}>
                  <MobileMenuScrollFix store={store}>
                    <RedocContent store={store} />
                  </MobileMenuScrollFix>
                </Redoc.OptionsProvider>
              </Redoc.StoreProvider>
            </Redoc.ThemeProvider>
          ) : (
            <Theme.Loading.Overlay />
          )
        }
      </Redoc.StoreBuilder>
    </Redoc.ErrorBoundary>
  );
}

function useRedocDeepLinkHandler() {
  const { hash } = useLocation();

  return React.useCallback(
    (error: Error | undefined) => {
      if (error) console.error("Redoc error:", error);

      // We apply a negative offset to the scroll position to account for a bug in
      // the Redoc scroll behavior that would cause the wrong section to be highlighted.
      if (hash) Scroll.toElementByID(hash, -15);
    },
    [hash]
  );
}

/** Disables scrolling on document body while Redoc mobile menu is open */
const MobileMenuScrollFix = MobX.observer(
  ({ store, children }: React.PropsWithChildren<{ store: Redoc.AppStore }>) => {
    useEffect(() => {
      document.body.style.overflow = store.menu.sideBarOpened
        ? "hidden"
        : "unset";

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [store.menu.sideBarOpened]);

    return <>{children}</>;
  }
);
