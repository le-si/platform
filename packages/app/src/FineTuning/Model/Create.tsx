import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const grpc = GRPC.use();

    const projectID = FineTuning.Project.useID();
    const projectName = FineTuning.Project.Name.use();
    const projectNamePlaceholder = FineTuning.Project.Name.Placeholder.use();

    const mode = FineTuning.Mode.use();

    return ReactQuery.useQuery({
      enabled: !!grpc && !!projectID && !!mode,
      initialData: null,

      queryKey: ["FineTuning.Training.Create", projectID],
      queryFn: async () => {
        if (!grpc || !projectID || !mode) return null;

        const { response } = await grpc?.fineTuning.createModel(
          Stability.GRPC.CreateModelRequest.create({
            projectId: projectID,
            name: !!projectName ? projectName : projectNamePlaceholder,
            mode: FineTuning.Mode.toGRPC(mode),
            engineId: "stable-diffusion-xl-1024-v1-0",
            objectPrompt: FineTuning.Mode.Object.Prompt.get(),
          })
        );

        const { model } = response;
        if (!model) return null;

        return FineTuning.Model.GRPC.decode(model);
      },
    });
  };
}
