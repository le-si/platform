import * as ReactQuery from "@tanstack/react-query";

import { Billing } from "~/Billing";
import { GRPC } from "~/GRPC";
import { Remote } from "~/Remote";

export type Balance = Billing.Credits;
export namespace Balance {
  export const refresh = () =>
    Remote.Client.get().invalidateQueries(["Billing.Credits.Balance.use"]);

  export const use = () => {
    const grpc = GRPC.use();

    return ReactQuery.useQuery({
      enabled: grpc !== undefined,

      queryKey: ["Billing.Credits.Balance.use"],
      queryFn: async (): Promise<Balance> => {
        // await waitForFirstRequest();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const org = await grpc!.organization.get();

        if (org instanceof Error) throw org;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { response } = await grpc!.dashboard.getOrganization({
          id: org.id,
        });

        return (response.paymentInfo?.balance ?? 0) * 100;
      },
    });
  };
}
