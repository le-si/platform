import * as ReactQuery from "@tanstack/react-query";

import { Billing } from "~/Billing";
import { GRPC } from "~/GRPC";
import { User } from "~/User";

export type Payments = Billing.Payment[];

export namespace Payments {
  export const use = (options?: { organization: { id: ID } }) => {
    const context = GRPC.use();
    const { data: organization } = User.Organization.use();
    const organizationID = options?.organization.id ?? organization?.id;

    return ReactQuery.useQuery({
      enabled: organizationID !== undefined && context !== undefined,

      queryKey: ["Billing.Payments.use", organizationID],
      queryFn: async (): Promise<Payments> => {
        // await waitForFirstRequest();

        const {
          response: { charges },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } = await context!.dashboard.getCharges(
          GRPC.GetChargesRequest.create({
            organizationId: organizationID,
            rangeFrom: 0n,
            rangeTo: BigInt(new Date(3000, 1, 1).getTime() / 1000),
          })
        );

        return charges
          .map((charge) => ({
            id: charge.id,
            paid: charge.paid,
            created: new Date(Number(charge.createdAt) * 1000),
            credits: Number(charge.amountCredits) * 100,
            stripe: {
              receipt: charge.receiptLink,
              payment: charge.paymentLink,
            },
          }))
          .sort((a, b) => b.created.valueOf() - a.created.valueOf());
      },
    });
  };
}
