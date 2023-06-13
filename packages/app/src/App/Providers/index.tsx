import { Remote } from "~/Remote";
import { Router } from "~/Router";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <Router.Provider>
      <Remote.Provider>
        <User.Provider>
          <Theme.Provider>{children}</Theme.Provider>
        </User.Provider>
      </Remote.Provider>
    </Router.Provider>
  );
}
