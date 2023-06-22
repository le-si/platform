import * as React from "react";

import { Environment } from "./index";

export function Provider({ children }: React.PropsWithChildren) {
  React.useEffect(() => Environment.validate(), []);

  return <>{children}</>;
}
