import { FineTuning } from "~/FineTuning";

export type Style = "Style";

export function Style() {
  return (
    <FineTuning.Mode
      mode="Style"
      description="Get the exact style you want by uploading a variety of images with the same style"
      duration={Style.duration()}
      background="#D6501E"
    />
  );
}

export namespace Style {
  export const duration = (): FineTuning.Mode.Duration => ({
    minMilliseconds: 1000 * 60 * 0.2,
    maxMilliseconds: 1000 * 60 * 0.2,
  });
}
