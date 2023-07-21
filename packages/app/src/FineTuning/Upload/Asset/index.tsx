import { Create } from "./Create";
import { Delete } from "./Delete";

export type Asset = {
  id: ID;
};

export declare namespace Asset {
  export { Create, Delete };
}

export namespace Asset {
  Asset.Create = Create;
  Asset.Delete = Delete;
}
