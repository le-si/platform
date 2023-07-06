import { Router } from "~/Router";

import { Providers } from "./Providers";

export function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
