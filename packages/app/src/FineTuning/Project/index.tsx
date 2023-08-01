import { Create } from "./Create";
import { Name } from "./Name";
import { Update } from "./Update";

export type Project = {
  id: ID;
  name: Name;
};

export declare namespace Project {
  export { Create, Name, Update };
}

export namespace Project {
  Project.Create = Create;
  Project.Name = Name;
  Project.Update = Update;

  export const use = () => {
    const { data } = Create.use();
    return data ?? undefined;
  };
}
