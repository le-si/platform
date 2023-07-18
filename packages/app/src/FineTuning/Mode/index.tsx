import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

import { Instructions } from "./Instructions";

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

export function Mode({ mode, description, background }: Mode.Props) {
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
      </FineTuning.H1>
      <div className="-mx-4 aspect-[4/3]" style={{ background }} />
      <div className="my-2">{description}</div>
      <Theme.Button
        className="self-end px-4"
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
  export { Instructions };
}

export namespace Mode {
  Mode.Instructions = Instructions;

  export type Props = {
    mode: Mode;
    description: React.ReactNode;
    background: CSSValue;
  };

  export type Face = "Face";
  export function Face() {
    return (
      <Mode
        mode="Face"
        description="Upload images of the same face or character from different angles, more angles the better"
        background="#037847"
      />
    );
  }

  export type Style = "Style";
  export function Style() {
    return (
      <Mode
        mode="Style"
        description="Get the exact style you want by uploading a variety of images with the same style"
        background="#D6501E"
      />
    );
  }

  export type Object = "Object";
  export function Object() {
    return (
      <Mode
        mode="Object"
        description="Create imagery based on an object, for example a car, furniture, architecture, or spaceship"
        background="#386D8C"
      />
    );
  }
}
