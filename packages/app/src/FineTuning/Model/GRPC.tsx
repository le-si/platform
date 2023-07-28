import * as Stability from "@stability/sdk";
import { SetOptional } from "type-fest";

import { FineTuning } from "~/FineTuning";

export type GRPC = SetOptional<
  Stability.GRPC.FineTuningModel,
  "userId" | "projectId" | "engineId" | "duration" | "status"
>;

export namespace GRPC {
  export const encode = (model: FineTuning.Model): GRPC => ({
    id: model.id,

    ...(!!model.engineID && { engineId: model.engineID }),

    name: model.name,

    ...(!!model.mode && { mode: FineTuning.Mode.GRPC.encode(model.mode) }),
    ...(!!model.objectPrompt && { objectPrompt: model.objectPrompt }),

    ...(!!model.status && {
      status: FineTuning.Model.Status.GRPC.encode(model.status),
    }),

    ...(!!model.failureReason && { failureReason: model.failureReason }),
  });

  export const decode = (grpc: GRPC): FineTuning.Model => ({
    id: grpc.id,

    ...(!!grpc.engineId && { engineID: grpc.engineId }),

    name: grpc.name,

    ...(!!grpc.mode && { mode: FineTuning.Mode.GRPC.decode(grpc.mode) }),
    ...(!!grpc.objectPrompt && { objectPrompt: grpc.objectPrompt }),

    ...(!!grpc.status && {
      status: FineTuning.Model.Status.GRPC.decode(grpc.status),
    }),

    ...(!!grpc.failureReason && { failureReason: grpc.failureReason }),
  });
}
