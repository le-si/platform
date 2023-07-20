import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

import { Advice } from "./Advice";
import { Duration } from "./Duration";
import { Face } from "./Face";
import { Object } from "./Object";
import { Style } from "./Style";

export function Modes() {
  return (
    <FineTuning.Step>
      <div className="flex flex-col gap-6 lg:flex-row">
        <Mode.Face />
        <Mode.Style />
        <Mode.Object />
      </div>
    </FineTuning.Step>
  );
}

export type Mode = Mode.Face | Mode.Style | Mode.Object;

export function Mode({
  mode,
  duration,
  description,
  background,
}: {
  mode: Mode;
  duration: Duration;
  description: React.ReactNode;
  background: CSSValue;
}) {
  const input = FineTuning.Input.use();
  const isModeSelected = input?.mode === mode;

  const onClick = useCallback(() => {
    FineTuning.Input.set({ mode });
    FineTuning.Steps.next();
  }, [mode]);

  return (
    <FineTuning.Card className="flex grow basis-0 flex-col gap-4">
      <FineTuning.H1 className="flex items-center">
        {isModeSelected && <Theme.Icon.Check className="mr-2 text-green-700" />}
        {mode}
        <Duration duration={duration} className="opacity-muted ml-auto" />
      </FineTuning.H1>
      <div className="-mx-4 aspect-[4/3]" style={{ background }} />
      <div className="my-2">{description}</div>
      <Theme.Button
        className="mt-auto self-end px-4"
        onClick={onClick}
        variant={isModeSelected ? "primary" : "secondary"}
      >
        {isModeSelected ? "Next" : "Select"}
        <FineTuning.ArrowRight className="ml-2" />
      </Theme.Button>
    </FineTuning.Card>
  );
}

export declare namespace Mode {
  export { Advice, Face, Style, Object, Duration };
}

export namespace Mode {
  Mode.Advice = Advice;
  Mode.Face = Face;
  Mode.Style = Style;
  Mode.Object = Object;
  Mode.Duration = Duration;
}
