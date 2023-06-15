import { Credits } from "./Credits";
import { Payment, Payments } from "./Payment";

export declare namespace Billing {
  export { Credits, Payment, Payments };
}

export namespace Billing {
  Billing.Credits = Credits;
  Billing.Payment = Payment;
  Billing.Payments = Payments;

  export type Currency = { usd: number };

  export namespace Stripe {
    export type Links = {
      receipt: string;
      payment: string;
    };
  }
}
