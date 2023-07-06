import * as MobX from "mobx-react";
import { createPortal } from "react-dom";
import * as Redoc from "redoc";

/** The actual Redoc documentation content. */
export const RedocContent = MobX.observer(
  ({ store }: { store: Redoc.AppStore }) => (
    <Redoc.RedocWrap className="redoc-wrap">
      {createPortal(
        <Redoc.SideMenu
          // have to use inline CSS since its being portal'd
          css={css`
            & ul {
              padding-bottom: 0 !important;
              padding-left: 1rem !important;
            }

            & label {
              padding: 0 !important;
            }

            & label {
              padding-top: 0.5rem !important;
              padding-bottom: 0.5rem !important;
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
              margin-bottom: 1.875px !important;
              margin-top: 1.875px !important;
              border-radius: 7.5px !important;
            }

            & label:hover {
              background-color: #e5e5e5 !important;
            }

            & label.active {
              background-color: #e4e4ce !important;
            }

            & ul > li > label {
              align-items: center !important;
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
  )
);
