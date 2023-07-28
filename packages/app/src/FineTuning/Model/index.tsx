import * as Stability from "@stability/sdk";
import { FineTuning } from "~/FineTuning";

import { Create } from "./Create";
import { Models } from "./Models";
import { Status } from "./Status";

export { Models } from "./Models";

export type Model = {
  id: ID;
  engineID?: ID;

  name: FineTuning.Project.Name;
  mode?: FineTuning.Mode;
  objectPrompt?: string;

  status?: Model.Status;
  failureReason?: string;
};

export declare namespace Model {
  export { Create, Status };
}

export namespace Model {
  Model.Create = Create;
  Model.Status = Status;

  export const fromGRPC = (model: Stability.GRPC.FineTuningModel): Model => ({
    id: model.id,

    ...(!!model.engineId && { engineID: model.engineId }),

    name: model.name,
    mode: FineTuning.Mode.fromGRPC(model.mode),

    ...(!!model.objectPrompt && { objectPrompt: model.objectPrompt }),

    status: FineTuning.Model.Status.fromGRPC(model.status),

    ...(!!model.failureReason && { failureReason: model.failureReason }),
  });

  export const use = (id?: ID) => {
    const { data: models } = Models.use();
    if (!id) return;

    return models[id];
  };
}
