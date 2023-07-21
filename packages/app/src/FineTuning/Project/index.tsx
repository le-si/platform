import { GlobalState } from "~/GlobalState";

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

  export const get = () => State.use.getState().project;

  export const set = (project?: Project) =>
    State.use.getState().setProject(project);

  export const use = () => {
    const create = Create.use();
    const project = State.use(({ project }) => project, GlobalState.shallow);

    useEffect(() => {
      !project && create.mutate({ name: Name.preset() });
    }, [project, create]);

    return project;
  };

  type State = {
    project?: Project;
    projectIsBeingCreated?: boolean;

    setProject: (project?: Project) => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      setProject: (project) => set({ project }),
    }));
  }
}
