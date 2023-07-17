import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Modes({
  onModeSelected,
}: {
  onModeSelected: (mode: Mode) => void;
}) {
  return (
    <FineTuning.Wrapper>
      <div className="flex flex-col gap-6 lg:flex-row">
        <Mode.Face onModeSelected={() => onModeSelected("Face")} />
        <Mode.Style onModeSelected={() => onModeSelected("Style")} />
        <Mode.Object onModeSelected={() => onModeSelected("Object")} />
      </div>
    </FineTuning.Wrapper>
  );
}

export type Mode = Mode.Face | Mode.Style | Mode.Object;
export function Mode({
  title,
  description,
  background,
  onModeSelected,
}: Mode.Props) {
  return (
    <FineTuning.Card className="flex grow basis-0 flex-col gap-4">
      <FineTuning.H1>{title}</FineTuning.H1>
      <div className="-mx-4 aspect-[4/3]" style={{ background }} />
      <div className="my-2">{description}</div>
      <Theme.Button onClick={onModeSelected} className="self-end px-4">
        Select
        <FineTuning.ArrowRight className="ml-2" />
      </Theme.Button>
    </FineTuning.Card>
  );
}

export namespace Mode {
  export type Props = {
    title: React.ReactNode;
    description: React.ReactNode;
    background: CSSValue;

    onModeSelected: () => void;
  };

  export type Face = "Face";
  export function Face({ onModeSelected }: { onModeSelected: () => void }) {
    return (
      <Mode
        title="Face"
        description="Upload images of the same face or character from different angles, more angles the better"
        background="#037847"
        onModeSelected={onModeSelected}
      />
    );
  }

  export type Style = "Style";
  export function Style({ onModeSelected }: { onModeSelected: () => void }) {
    return (
      <Mode
        title="Style"
        description="Get the exact style you want by uploading a variety of images with the same style"
        background="#D6501E"
        onModeSelected={onModeSelected}
      />
    );
  }

  export type Object = "Object";
  export function Object({ onModeSelected }: { onModeSelected: () => void }) {
    return (
      <Mode
        title="Object"
        description="Create imagery based on an object, for example a car, furniture, architecture, or spaceship"
        background="#386D8C"
        onModeSelected={onModeSelected}
      />
    );
  }
}
