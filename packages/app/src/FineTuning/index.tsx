import { Sandbox } from "~/SandboxV2";

import { Icon } from "./Icon";
import { Input } from "./Input";
import { Introduction } from "./Introduction";
import { Mode, Modes } from "./Mode";
import { Project } from "./Project";
import { Step, Steps } from "./Step";
import { Training } from "./Training";
import { Upload, Uploads } from "./Upload";

export function FineTuning() {
  const steps = Steps.use({ active: 5, max: 5 });
  const isNavigationDisabled = Steps.useIsNavigationDisabled();
  const canNavigateBackwards = !isNavigationDisabled && steps.active > 1;
  return (
    <Sandbox
      icon={<Icon />}
      title="Fine-Tuning"
      titleRight={
        <div
          onClick={canNavigateBackwards ? steps.previous : undefined}
          className={classes(
            "flex items-center gap-2",
            canNavigateBackwards ? "cursor-pointer" : "cursor-default"
          )}
        >
          {canNavigateBackwards && (
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
        {steps.active === 3 && <Mode.Advice />}
        {steps.active === 4 && <Uploads />}
        {steps.active === 5 && <Training />}
      </div>
    </Sandbox>
  );
}

export declare namespace FineTuning {
  export {
    Input,
    Introduction,
    Mode,
    Modes,
    Project,
    Step,
    Steps,
    Training,
    Upload,
    Uploads,
  };
}

export namespace FineTuning {
  FineTuning.Input = Input;
  FineTuning.Introduction = Introduction;
  FineTuning.Mode = Mode;
  FineTuning.Modes = Modes;
  FineTuning.Project = Project;
  FineTuning.Step = Step;
  FineTuning.Steps = Steps;
  FineTuning.Training = Training;
  FineTuning.Upload = Upload;
  FineTuning.Uploads = Uploads;

  export const route = () => "/fine-tuning" as const;

  export function H1({ className, children }: StyleableWithChildren) {
    return <div className={classes("text-2xl", className)}>{children}</div>;
  }

  export function H2({ className, children }: StyleableWithChildren) {
    return <div className={classes("text-xl", className)}>{children}</div>;
  }

  export function Card({ className, children }: StyleableWithChildren) {
    return (
      <div className={classes("rounded-lg bg-white p-4 lg:p-6", className)}>
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
