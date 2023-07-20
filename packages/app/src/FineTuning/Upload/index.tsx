import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export { Uploads } from "./Uploads";

export type Upload = {};

export function Upload() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-md border border-black opacity-10">
      <Theme.Icon.Image className="h-[25%] w-[25%] text-black" />
    </div>
  );
}

export namespace Upload {
  export const constraints = () =>
    ({
      size: {
        min: 328,
        max: 1024,
      },
    } as const);

  export type InProgress = {};

  export type Finished = {};
}
