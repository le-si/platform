import { FineTuning } from "~/FineTuning";

import { Create } from "./Create";
import { Status } from "./Status";

export { Models } from "./Models";

export type Model = {
  id: ID;
  engineID: ID;

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
}
