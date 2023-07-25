import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const grpc = GRPC.use();
    const query = ReactQuery.useQuery({
      enabled: !!grpc,
      initialData: null,

      queryKey: ["FineTuning.Project.Create"],
      queryFn: async () => {
        if (!grpc) return null;

        const request = await grpc?.project.create(
          GRPC.CreateProjectRequest.create({
            title: FineTuning.Project.Name.getPlaceholder(),
            type: Stability.GRPC.ProjectType.TRAINING,
            access: Stability.GRPC.ProjectAccess.PRIVATE,
            status: Stability.GRPC.ProjectStatus.ACTIVE,
          })
        );

        if (!request) return null;

        const { response } = request;
        return {
          id: response.id,
          name: response.title,
        };
      },
    });

    return query;
  };
}
