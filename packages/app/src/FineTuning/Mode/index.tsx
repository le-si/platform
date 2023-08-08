import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

import { Duration } from "./Duration";
import { Face } from "./Face";
import { GRPC } from "./GRPC";
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
  const isModeSelected = Mode.use() === mode;
  const onClick = useCallback(() => {
    Mode.set(mode);
    FineTuning.Steps.next();
  }, [mode]);

  return (
    <FineTuning.Card className="flex grow basis-0 flex-col gap-4">
      <FineTuning.H1 className="flex items-center">
        {isModeSelected && <Theme.Icon.Check className="mr-2 text-green-700" />}
        {mode}
        <Duration duration={duration} className="opacity-muted ml-auto" />
      </FineTuning.H1>
      <div className="aspect-[4/3] rounded-xl" style={{ background }} />
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
  export { Face, GRPC, Style, Object, Duration };
}

export namespace Mode {
  Mode.Face = Face;
  Mode.GRPC = GRPC;
  Mode.Style = Style;
  Mode.Object = Object;
  Mode.Duration = Duration;

  export const get = () => State.use.getState().mode;
  export const set: State["setMode"] = (mode) =>
    State.use.getState().setMode(mode);

  export const fromGRPC = (grpc = 0): Mode | undefined =>
    (({ 1: "Face", 2: "Style", 3: "Object" } as const)[grpc]);

  export const toGRPC = (mode: Mode): number =>
    (({ Face: 1, Style: 2, Object: 3 } as const)[mode]);

  export const use = () => State.use(({ mode }) => mode, GlobalState.shallow);
}

type State = {
  mode?: Mode;
  setMode: (setMode: React.SetStateAction<Mode | undefined>) => void;
};

namespace State {
  export const use = GlobalState.create<State>((set) => ({
    setMode: (setMode) =>
      set((state) => ({
        ...state,
        mode: typeof setMode === "function" ? setMode(state.mode) : setMode,
      })),
  }));
}
