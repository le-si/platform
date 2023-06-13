import { Credits } from "./Credits";
import { type Currency } from "./Currency";
import { Payment, Payments } from "./Payment";
import { type Stripe } from "./Stripe";

export declare namespace Billing {
  export { Credits, Currency, Payment, Payments, Stripe };
}

export namespace Billing {
  Billing.Credits = Credits;
  Billing.Payment = Payment;
  Billing.Payments = Payments;
}
