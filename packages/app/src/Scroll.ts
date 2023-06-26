import * as React from "react";
import { useLocation } from "react-router-dom";
import { TopBar } from "~/App/TopBar";
import { remToPx } from "~/Utilities";

export namespace Scroll {
  /**
   * Scrolls to the top of the page or, if a hash is present,
   * to the element referenced in the hash.
   */
  export function useListenForURLChanges(): void {
    const { pathname, hash } = useLocation();

    React.useEffect(
      () => (hash ? Scroll.toElementByID(hash) : Scroll.toTopOfPage()),
      [pathname, hash]
    );
  }

  export function toTopOfPage() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  export function toElementByID(id: string, offset = 24) {
    try {
      const element = document.getElementById(
        id.startsWith("#") ? id.slice(1) : id
      );

      if (element) {
        const rect = element.getBoundingClientRect();

        window.scrollTo(
          window.scrollX,
          window.scrollY + rect.top - remToPx(TopBar.height()) - offset
        );
      }
    } catch (err) {
      console.log(`[Scroll.toElementByID] '${id}' not found in the DOM.`);
    }
  }
}
