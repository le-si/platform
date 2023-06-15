import { Billing } from "~/Billing";
import { DateTime } from "~/Utilities";

import { Create } from "./Create";

export { Payments } from "./Payments";

export type Payment = {
  id: string;
  paid: boolean;
  created: DateTime;
  credits: Billing.Credits;
  stripe: Billing.Stripe.Links;
};

export declare namespace Payment {
  export { Create };
}

export namespace Payment {
  Payment.Create = Create;
}
