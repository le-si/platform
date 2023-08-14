import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";
import { User } from "~/User";

import { FineTuning } from "..";

import agreement from "./Agreement.md?raw";

export function Legal() {
  const createAPIKey = User.APIKey.Create.use();
  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-3">
          <LegalTakeaway text="Use images you own" />
          <LegalTakeaway text="Use the service in accordance to regulations" />
          <LegalTakeaway text="Use images of people with permission" />
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-3">
          <LegalTakeaway isNegative text="Use images you don't own" />
          <LegalTakeaway
            isNegative
            text="Use images of people without permission"
          />
          <LegalTakeaway
            isNegative
            text="Use this service from the State of Illinois"
          />
        </div>
      </div>
      <div className="min-h-0 rounded-xl border border-zinc-300 bg-black/[2%] p-1 pl-0">
        <div className="scrollbar max-h-[25rem] min-h-0 shrink overflow-y-auto">
          <Markdown className="m-0 max-w-[50rem] p-0 2xl:max-w-[50rem]">
            {agreement}
          </Markdown>
        </div>
      </div>
      <p className="max-w-[50rem] text-sm opacity-75">
        By clicking &lsquo;Agree&rsquo; you acknowledge that you have read and
        understood the above agreement and that you agree to be bound by its
        terms.
      </p>
      <Theme.Button
        className="text-base"
        variant="primary"
        loading={createAPIKey?.isLoading}
        onClick={() => {
          createAPIKey?.mutate();
        }}
      >
        <div className="mx-2 flex items-center gap-2">
          Agree <FineTuning.ArrowRight />
        </div>
      </Theme.Button>
    </div>
  );
}

function LegalTakeaway({
  text,
  isNegative,
}: {
  isNegative?: boolean;
  text: string;
}) {
  return (
    <div className="flex gap-2">
      <div
        className={classes(
          "flex h-6 w-6 items-center justify-center rounded-full p-1",
          isNegative ? "bg-red-500/10" : "bg-green-500/10"
        )}
      >
        {isNegative ? (
          <Theme.Icon.X className="text-red-500" />
        ) : (
          <Theme.Icon.Check className="text-green-500" />
        )}
      </div>
      <div>{text}</div>
    </div>
  );
}
