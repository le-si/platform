import { keyframes } from "@emotion/react";
import { Billing } from "~/Billing";
import { Theme } from "~/Theme";
import { isNumber } from "~/Utilities";

import { Panel } from "./Panel";

export function Credits({ autoFocus }: { autoFocus: boolean }) {
  return (
    <Panel className="flex h-fit flex-col">
      <div className="flex items-start">
        <h5 className="mb-3.5 text-xl font-semibold text-neutral-900 dark:text-white">
          Credits
        </h5>
      </div>
      <AvailableCredits />
      <hr className="mb-4 mt-3 h-px border-0 bg-neutral-200 dark:bg-white/5" />
      <div className="flex flex-col gap-4">
        <BuyCredits autoFocus={autoFocus} />
      </div>
    </Panel>
  );
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

function BuyCredits({ autoFocus }: { autoFocus: boolean | undefined }) {
  const [amount, setAmount] = useState<number>(10);
  // const [focused, setFocused] = useState<boolean>(!!autoFocus);

  const onInputAmountChange = (value: string) => {
    const newInputAmount = Number(value.replace(/,/g, ""));
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
        <div
          className={classes(
            "col-span-2 flex items-center overflow-hidden rounded bg-neutral-50 bg-white/20 text-neutral-900 duration-200 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
            // focused &&
            //   "ring-brand-500 ring-[2px] ring-offset-1 dark:ring-offset-zinc-800"
          )}
          css={css`
            animation-name: ${blink};
            animation-duration: 0.4s;
            animation-delay: 0.2s;
            animation-iteration-count: 2;
          `}
        >
          <Theme.Input
            autoFocus={autoFocus}
            value={amount > 0 ? Billing.Credits.formatted(amount) : ""}
            onChange={onInputAmountChange}
            // iconLeft={
            //   <span className="select-none text-neutral-900 dark:text-neutral-400">
            //     $
            //   </span>
            // }
            // onFocus={() => setFocused(true)}
            // onBlur={() => {
            //   setFocused(false);
            //
            //   if (isNaN(amount) || amount < 10) {
            //     setAmount(10);
            //   } else if (amount > 1000) {
            //     setAmount(1000);
            //   }
            // }}
            className="h-full items-center rounded-r-none shadow-none"
            // transparent
          />
          <Theme.Button
            onClick={onBuyCredits}
            // loading={createPayment?.isLoading}
            disabled={isNaN(amount) || amount < 10}
            // color="brand"
            // icon={(props) => (
            //   <div className={classes(props.className, "w-0")} />
            // )}
            className="gap-0 rounded-l-none rounded-r-sm py-1.5 pr-4 text-sm text-white duration-100"
          >
            Buy
          </Theme.Button>
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

const blink = keyframes`
  50% { --tw-ring-opacity: 0 }
`;
