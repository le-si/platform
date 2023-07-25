import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Advice() {
  return (
    <FineTuning.Step className="items-center justify-center">
      <FineTuning.H1>
        Advice <span className="opacity-muted-extra italic">TODO</span>
      </FineTuning.H1>
      <Theme.Button
        variant="primary"
        className="px-4"
        onClick={FineTuning.Steps.next}
      >
        Next
        <FineTuning.ArrowRight className="ml-2" />
      </Theme.Button>
    </FineTuning.Step>
  );
}
