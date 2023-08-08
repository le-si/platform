import { FineTuning } from "~/FineTuning";

export type Face = "Face";

export function Face() {
  return (
    <FineTuning.Mode
      mode="Face"
      description="Upload images of the same face or character from different angles, more angles the better"
      duration={Face.duration()}
      background="#037847"
    />
  );
}

export namespace Face {
  export const duration = (): FineTuning.Mode.Duration => ({
    minMilliseconds: 1000 * 60 * 4,
    maxMilliseconds: 1000 * 60 * 5,
  });
}
