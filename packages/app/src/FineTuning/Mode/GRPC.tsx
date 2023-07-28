import * as Stability from "@stability/sdk";

import { FineTuning } from "~/FineTuning";

export type GRPC = Stability.GRPC.FineTuningMode;
export namespace GRPC {
  export const decode = (grpc: GRPC): FineTuning.Mode | undefined =>
    (({ 0: undefined, 1: "Face", 2: "Style", 3: "Object" } as const)[grpc]);

  export const encode = (mode: FineTuning.Mode): GRPC =>
    (({ Face: 1, Style: 2, Object: 3 } as const)[mode]);
}
