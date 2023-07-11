import { GlobalSearch } from "~/GlobalSearch";
import { Remote } from "~/Remote";
import { Router } from "~/Router";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <Router.Provider>
      <Remote.Provider>
        <Theme.Provider>
          <User.Provider>
            <GlobalSearch.Provider>{children}</GlobalSearch.Provider>
          </User.Provider>
        </Theme.Provider>
      </Remote.Provider>
    </Router.Provider>
  );
}
