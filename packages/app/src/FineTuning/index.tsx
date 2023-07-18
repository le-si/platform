import { Sandbox } from "~/SandboxV2";

import { Icon } from "./Icon";
import { Input } from "./Input";
import { Introduction } from "./Introduction";
import { Mode, Modes } from "./Mode";
import { Step, Steps } from "./Step";
import { Uploads } from "./Upload";

export function FineTuning() {
  const steps = Steps.use({
    active: 2,
    max: 5,
  });

  return (
    <Sandbox
      icon={<Icon />}
      title="Fine-Tuning"
      titleRight={
        <div
          onClick={steps.previous}
          className={classes(
            "flex items-center gap-2",
            steps.active > 1 ? "cursor-pointer" : "cursor-default"
          )}
        >
          {steps.active > 1 && (
            <FineTuning.ArrowRight className="opacity-muted rotate-180" />
          )}
          <div>
            Step {steps.active}
            <span className="opacity-muted"> / {steps.max}</span>
          </div>
        </div>
      }
    >
      <div className="flex h-full grow items-center justify-center overflow-y-auto">
        {steps.active === 1 && <Introduction />}
        {steps.active === 2 && <Modes />}
        {steps.active === 3 && <Mode.Instructions />}
        {steps.active === 4 && <Uploads />}
      </div>
    </Sandbox>
  );
}

export declare namespace FineTuning {
  export { Input, Introduction, Mode, Modes, Step, Steps };
}

export namespace FineTuning {
  FineTuning.Input = Input;
  FineTuning.Introduction = Introduction;
  FineTuning.Mode = Mode;
  FineTuning.Modes = Modes;
  FineTuning.Step = Step;
  FineTuning.Steps = Steps;

  export const route = () => "/fine-tuning" as const;

  export function H1({ className, children }: StyleableWithChildren) {
    return <div className={classes("text-2xl", className)}>{children}</div>;
  }

  export function H2({ className, children }: StyleableWithChildren) {
    return <div className={classes("text-xl", className)}>{children}</div>;
  }

  export function Card({ className, children }: StyleableWithChildren) {
    return (
      <div className={classes("rounded-lg bg-white p-4", className)}>
        {children}
      </div>
    );
  }

  export function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M7.75 11L12.75 6L7.75 1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.25 6L1.25 6" stroke="currentColor" strokeLinecap="round" />
      </svg>
    );
  }
}
