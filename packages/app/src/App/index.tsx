import { Router } from "~/Router";

import { Page } from "./Page";
import { Providers } from "./Providers";

export function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export declare namespace App {
  export { Page };
}

export namespace App {
  App.Page = Page;
}
