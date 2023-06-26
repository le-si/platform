import * as MobX from "mobx-react";
import { createPortal } from "react-dom";
import * as Redoc from "redoc";
import { RedocCSS } from "~/REST/Redoc/RedocCSS";

/** The actual Redoc documentation content. */
export const RedocContent = MobX.observer(
  ({ store }: { store: Redoc.AppStore }) => (
    <div css={RedocCSS}>
      <Redoc.RedocWrap className="redoc-wrap">
        {createPortal(
          <Redoc.SideMenu
            // have to use inline CSS since its being portal'd
            css={css`
              & ul {
                padding-bottom: 0 !important;
              }
            `}
            menu={store.menu}
          />,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          document.getElementById("redoc-sidebar-container")!
        )}
        <Redoc.ApiContentWrap className="api-content">
          <Redoc.ApiInfo store={store} />
          <Redoc.ContentItems items={store.menu.items as Redoc.GroupModel[]} />
        </Redoc.ApiContentWrap>
      </Redoc.RedocWrap>
    </div>
  )
);
