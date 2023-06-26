import * as React from "react";
import { MenuStore } from "redoc";
import { REST } from "~/REST";

let isRestApiPage = false;

/**
 * Redoc wires in URL rewriting behavior based on scroll position, this hack
 * limits that URL rewriting behavior to the REST documentation page.
 */
export function useRedocURLHotfix() {
  React.useEffect(() => {
    isRestApiPage = window.location.pathname.startsWith(REST.Page.url());

    return () => {
      isRestApiPage = window.location.pathname.startsWith(REST.Page.url());
    };
  }, []);
}

/** Hijack MenuStore.subscribe() and disable URL rewriting on non-REST pages */
MenuStore.prototype.subscribe = function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this._unsubscribe = this.scroll.subscribe((isScrollDown: boolean) =>
    isRestApiPage ? this.updateOnScroll(isScrollDown) : void 0
  );
};
