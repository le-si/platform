import * as ReactQuery from "@tanstack/react-query";

import { Billing } from "~/Billing";
import { Organization } from "~/Organization";
import { SDK, Stability } from "~/SDK";

export namespace Create {
  export const use = () => {
    const [payment, setPayment] = useState<Billing.Payment | undefined>(
      undefined
    );

    const context = SDK.Context.use();
    const { data: organization } = Organization.use();
    const organizationID = organization?.id;

    const execute = ReactQuery.useMutation(
      async ({
        amount: { usd },
      }: {
        amount: Billing.Currency;
      }): Promise<Billing.Payment | undefined> => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { response: charge } = await context!.dashboard.createCharge(
          Stability.Proto.Dashboard.CreateChargeRequest.create({
            amount: BigInt(usd),
            organizationId: organizationID,
          })
        );

        const payment = {
          id: charge.id,
          paid: charge.paid,
          created: new Date(Number(charge.createdAt) * 1000),
          credits: Number(charge.amountCredits) * 100,
          stripe: {
            receipt: charge.receiptLink,
            payment: charge.paymentLink,
          },
        };

        setPayment(payment);
        return payment;
      }
    );

    useEffect(() => {
      payment && (window.location.href = payment.stripe.payment);
    }, [payment]);

    return organizationID !== undefined && context !== undefined
      ? execute
      : undefined;
  };
}
