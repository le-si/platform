import * as MobX from "mobx-react";
import * as Redoc from "redoc";
import { RedocCSS } from "~/REST/Redoc/RedocCSS";

/** The actual Redoc documentation content. */
export const RedocContent = MobX.observer(
  ({ store }: { store: Redoc.AppStore }) => (
    <div css={RedocCSS}>
      <Redoc.RedocWrap className="redoc-wrap">
        <Redoc.StickyResponsiveSidebar
          menu={store.menu}
          className="menu-content"
        >
          {(!store.options.disableSearch && store.search && (
            <Redoc.SearchBox
              search={store.search}
              marker={store.marker}
              getItemById={store.menu.getItemById}
              onActivate={store.menu.activateAndScroll}
            />
          )) ||
            null}
          <Redoc.SideMenu menu={store.menu} />
        </Redoc.StickyResponsiveSidebar>
        <Redoc.ApiContentWrap className="api-content">
          <Redoc.ApiInfo store={store} />
          <Redoc.ContentItems items={store.menu.items as Redoc.GroupModel[]} />
        </Redoc.ApiContentWrap>
        <Redoc.BackgroundStub />
      </Redoc.RedocWrap>
    </div>
  )
);
