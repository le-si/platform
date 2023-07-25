import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export type Duration = {
  minMilliseconds: number;
  maxMilliseconds: number;
};

export function Duration({
  duration: { minMilliseconds, maxMilliseconds },
  className,
}: Styleable & { duration: Duration }) {
  return (
    <div className={classes("flex items-center gap-1", className)}>
      <Theme.Icon.Clock className="h-4 w-4" />
      <span className="text-base">
        {minMilliseconds / 1000 / 60}-{maxMilliseconds / 1000 / 60} minutes
      </span>
    </div>
  );
}

export namespace Duration {
  export const use = () => {
    const input = FineTuning.Input.use();
    if (!input?.mode) return;

    return input.mode === "Face"
      ? FineTuning.Mode.Face.duration()
      : input.mode === "Style"
      ? FineTuning.Mode.Style.duration()
      : FineTuning.Mode.Object.duration();
  };
}
