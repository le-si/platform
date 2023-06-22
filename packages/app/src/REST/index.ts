import { Page } from "./Page";
import { useOpenAPISpec } from "./useOpenAPISpec";

export declare namespace REST {
  export { Page, useOpenAPISpec };
}

export namespace REST {
  REST.Page = Page;
  REST.useOpenAPISpec = useOpenAPISpec;
}

/** Fix for incorrect type definitions in Redoc.StickyResponsiveSidebar */
declare module "redoc" {
  interface StickySidebarProps {
    children: React.ReactNode;
  }
}
