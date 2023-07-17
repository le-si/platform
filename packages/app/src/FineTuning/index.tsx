import { Sandbox } from "~/SandboxV2";

export function FineTuning() {
  return <Sandbox>Test</Sandbox>;
}

export namespace FineTuning {
  export const route = () => "/fine-tuning" as const;
}
