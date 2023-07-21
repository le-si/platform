// import * as Stability from "@stability/sdk";
// import * as ReactQuery from "@tanstack/react-query";

// import { FineTuning } from "~/FineTuning";
// import { GRPC } from "~/GRPC";
// import { User } from "~/User";

// export namespace Models {
//   export const use = () => {
//     const grpc = GRPC.use();
//     const user = User.use();
//     const query = ReactQuery.useQuery({
//       queryKey: ["FineTuning.Models", user.data?.id],
//       queryFn: async () => {
//         if (!grpc || !user.data?.id) return [];

//         const projects = await grpc.project.list({});

//         spy({ projects });

//         return projects;
//       },
//     });

//     return query;
//   };
// }
