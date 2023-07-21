// import { FineTuning } from "~/FineTuning";
// import { GlobalState } from "~/GlobalState";

// import { Create } from "./Create";
// import { Name } from "./Name";

// export { Projects } from "./Projects";

// export type Model = {
//   id: ID;
//   name: Name;
// };

// export declare namespace Project {
//   export { Create, Name };
// }

// export namespace Project {
//   Project.Create = Create;
//   Project.Name = Name;

//   export const use = () =>
//     State.use(({ project }) => project, GlobalState.shallow);

//   type State = {
//     project?: Project;
//     setProject: (project?: Project) => void;
//   };

//   namespace State {
//     export const use = GlobalState.create<State>((set) => ({
//       setProject: (project) => set({ project }),
//     }));
//   }
// }
