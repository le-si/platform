import { Sandbox } from "~/SandboxV2";

import { Icon } from "./Icon";
import { Input } from "./Input";
import { Introduction } from "./Introduction";
import { Mode, Modes } from "./Mode";
import { Steps } from "./Step";

export function FineTuning() {
  const step = Steps.use();
  return (
    <Sandbox
      icon={<Icon />}
      title="Fine-Tuning"
      titleRight={
        <div
          onClick={Steps.previous}
          className={classes(
            "flex items-center gap-2",
            step > 0 ? "cursor-pointer" : "cursor-default"
          )}
        >
          {step > 0 && (
            <FineTuning.ArrowRight className="opacity-muted rotate-180" />
          )}
          <div>
            Step {step + 1}
            <span className="opacity-muted"> / 5</span>
          </div>
        </div>
      }
    >
      <div className="flex h-full grow items-center justify-center overflow-y-auto">
        {step}
      </div>
    </Sandbox>
  );
}

export declare namespace FineTuning {
  export { Input, Introduction, Mode, Modes, Steps };
}

export namespace FineTuning {
  FineTuning.Input = Input;
  FineTuning.Introduction = Introduction;
  FineTuning.Mode = Mode;
  FineTuning.Modes = Modes;
  FineTuning.Steps = Steps;

  export const route = () => "/fine-tuning" as const;

  export function Wrapper({ className, children }: StyleableWithChildren) {
    return (
      <div
        className={classes(
          "flex max-w-[100rem] flex-col gap-12 p-4 sm:p-4 md:p-6",
          className
        )}
      >
        {children}
      </div>
    );
  }

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
