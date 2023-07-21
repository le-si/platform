// import * as Stability from "@stability/sdk";
// import * as ReactQuery from "@tanstack/react-query";

// import { FineTuning } from "~/FineTuning";
// import { GRPC } from "~/GRPC";

// export namespace Create {
//   export const use = () => {
//     const grpc = GRPC.use();

//     return ReactQuery.useMutation(
//       async ({ name }: Pick<FineTuning.Project, "name">) => {
//         if (!grpc) return;

//         const request = GRPC.CreateProjectRequest.create({
//           title: name,
//           type: Stability.GRPC.ProjectType.TRAINING,
//           access: Stability.GRPC.ProjectAccess.PRIVATE,
//           status: Stability.GRPC.ProjectStatus.ACTIVE,
//         });

//         const { response } = await grpc?.project.create(request);

//         console.log("create project response", response);

//         // setProjectID(createProjectResponse?.id || "");
//       }
//     );
//   };
// }
