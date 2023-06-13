import { Billing } from "~/Billing";

import { Balance } from "./Balance";

export type Credits = number;

type Props = { decimalize?: boolean } & (
  | { credits: Credits }
  | { currency: Billing.Currency }
);

export function Credits({ decimalize = false, ...props }: Props) {
  const amount = "credits" in props ? props.credits : props.currency.usd * 100;
  return <>{Credits.formatted(amount, decimalize)}</>;
}

export declare namespace Credits {
  export { Balance };
}

export namespace Credits {
  Credits.Balance = Balance;

  export const formatted = (amount: Credits, decimalize = false) => {
    const minimizeDecimals = (): [number, string] => {
      if (!decimalize || amount < 1e3) return [amount, ""];
      if (amount >= 1e9) return [amount / 1e9, "B"];
      if (amount >= 1e6) return [amount / 1e6, "M"];
      return [amount / 1e3, "K"];
    };

    const [decimalized, suffix] = minimizeDecimals();
    const decimalDigits = amount > 1000 ? 2 : 1;
    const fixed = decimalized.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalDigits,
    });

    return `${fixed}${suffix}`;
  };
}
