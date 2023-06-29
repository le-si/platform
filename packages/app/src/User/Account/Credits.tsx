import { keyframes } from "@emotion/react";
import React from "react";
import { Billing } from "~/Billing";
import { Background, Theme } from "~/Theme";
import { User } from "~/User";
import { isNumber } from "~/Utilities";

import { PaymentsTable } from "./PaymentsTable";

export function Credits({ autoFocus }: { autoFocus: boolean }) {
  return (
    <div className="flex h-fit w-full flex-col gap-5 lg:flex-row">
      <Background title="Credits" className="h-fit w-full lg:max-w-[25rem]">
        <AvailableCredits />
        <hr className="mb-4 mt-3 h-px border-0 bg-neutral-200 dark:bg-white/5" />
        <div className="flex flex-col gap-4">
          <BuyCredits autoFocus={autoFocus} />
        </div>
      </Background>
      <PaymentsTable />
    </div>
  );
}

export namespace Credits {
  export const uri = () => "credits" as const;
  export const url = () => `${User.Account.Page.url()}/${uri()}` as const;
}

function AvailableCredits() {
  const { data: balance } = Billing.Credits.Balance.use();

  return (
    <div className="flex flex-row items-end justify-between">
      <span className="text-brand-400 text-3xl font-bold">
        {!balance ? (
          <Theme.Skeleton className="h-4 w-24" />
        ) : (
          <Billing.Credits credits={balance} />
        )}
      </span>
      {!balance ? (
        <Theme.Skeleton className="h-4 w-28" />
      ) : (
        <div className="opacity-muted flex text-xs tracking-wide">
          ~{balance ? Math.floor(balance * 5).toLocaleString() : 0} images
        </div>
      )}
    </div>
  );
}

const blink = keyframes`
  50% { --tw-ring-opacity: 0 }
`;

// TODO: Test the out-of-credits Snackbar with this component
function BuyCredits({ autoFocus }: { autoFocus: boolean | undefined }) {
  const [amount, setAmount] = useState<number>(10);
  const [focused, setFocused] = useState<boolean>(!!autoFocus);

  const onInputAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputAmount = Number(event.target.value.replace(/[\s$,]/g, ""));
    if (isNumber(newInputAmount)) {
      setAmount(newInputAmount);
    }
  };

  const createPayment = Billing.Payment.Create.use();
  const onBuyCredits = () => {
    if (!isNaN(amount) && amount >= 10) {
      createPayment?.mutate({ amount: { usd: amount } });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Purchase credits</h1>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <div
            className={classes(
              "flex items-center justify-end overflow-hidden rounded bg-neutral-50 bg-white/20 text-neutral-900 duration-200 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400",
              focused &&
                "ring-brand-500 ring-[2px] ring-offset-1 dark:ring-offset-zinc-800"
            )}
            css={css`
              animation-name: ${blink};
              animation-duration: 0.4s;
              animation-delay: 0.2s;
              animation-iteration-count: 2;
            `}
          >
            <input
              autoFocus={autoFocus}
              value={amount > 0 ? `$ ${Billing.Credits.formatted(amount)}` : ""}
              onChange={onInputAmountChange}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);

                if (isNaN(amount) || amount < 10) {
                  setAmount(10);
                } else if (amount > 1000) {
                  setAmount(1000);
                }
              }}
              className="flex h-8 w-full flex-grow cursor-text items-center gap-2 rounded rounded-r-none border border-zinc-300 px-2 py-1 shadow-none outline-none"
            />
            <Theme.Button
              onClick={onBuyCredits}
              loading={createPayment?.isLoading}
              disabled={isNaN(amount) || amount < 10}
              className="w-fit gap-0 rounded-l-none rounded-r-sm bg-indigo-500 py-1.5 text-sm text-white duration-100 hover:bg-indigo-600"
            >
              Buy
            </Theme.Button>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <Billing.Credits currency={{ usd: amount }} />
          &nbsp;credits
          <div className="opacity-muted flex text-xs tracking-wide">
            ~{Math.floor(amount * 5 * 100).toLocaleString()} images
          </div>
        </div>
      </div>
    </div>
  );
}
