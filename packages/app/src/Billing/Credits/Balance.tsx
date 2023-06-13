import * as ReactQuery from "@tanstack/react-query";

import { Billing } from "~/Billing";
import { Remote } from "~/Remote";
import { SDK, Stability } from "~/SDK";
import { Theme } from "~/Theme";

export type Balance = Billing.Credits;
export namespace Balance {
  export const refresh = () =>
    Remote.Client.get().invalidateQueries(["Billing.Credits.Balance.use"]);

  export const use = () => {
    const context = SDK.Context.use();
    const { enqueueSnackbar } = Theme.Snackbar.use();
    return ReactQuery.useQuery({
      enabled: context !== undefined,

      queryKey: ["Billing.Credits.Balance.use"],
      queryFn: async (): Promise<Balance> => {
        // await waitForFirstRequest();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const balance = await Stability.Sandbox.getBalance(context!);
        if (balance instanceof Error) {
          enqueueSnackbar(
            "Uh oh, no credits! You'll need credits to generate images.",
            {
              variant: "outOfCredits",
            }
          );

          return 0;
        }

        return balance;
      },
    });
  };
}
