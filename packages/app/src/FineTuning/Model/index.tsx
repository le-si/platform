import { FineTuning } from "~/FineTuning";

import { Create } from "./Create";
import { GRPC } from "./GRPC";
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
  export { Create, GRPC, Status };
}

export namespace Model {
  Model.Create = Create;
  Model.GRPC = GRPC;
  Model.Status = Status;

  export const use = (id?: ID) => {
    const { data: models } = Models.use();
    if (!id) return;

    return models[id];
  };
}
