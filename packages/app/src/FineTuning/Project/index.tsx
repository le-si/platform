import { Create } from "./Create";
import { Name } from "./Name";

export type Project = {
  id: ID;
  name: Name;
};

export declare namespace Project {
  export { Create, Name };
}

export namespace Project {
  Project.Create = Create;
  Project.Name = Name;

  export const use = () => {
    const { data } = Create.use();
    return data ?? undefined;
  };
}
