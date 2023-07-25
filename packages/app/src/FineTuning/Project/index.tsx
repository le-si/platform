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
    return {
      id: "bbb1b8de-c77b-4880-b734-9a2216fd4ae5",
      name: "My Model",
    };

    // // const { data } = Create.use();
    // return spy(data);
  };
}
