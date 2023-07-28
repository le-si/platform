import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const grpc = GRPC.use();
    const project = FineTuning.Project.use();
    const mode = FineTuning.Mode.use();

    return ReactQuery.useQuery({
      enabled: !!grpc && !!project?.id && !!mode,
      initialData: null,

      queryKey: ["FineTuning.Training.Create", project?.id],
      queryFn: async () => {
        if (!grpc || !project?.id || !mode) return null;

        FineTuning.Training.start();

        const { response } = await grpc?.fineTuning.createModel(
          Stability.GRPC.CreateModelRequest.create({
            projectId: project.id,
            name: project.name,
            mode: FineTuning.Mode.toGRPC(mode),
            engineId: "stable-diffusion-xl-1024-v0-9",
          })
        );

        const { model } = response;
        if (!model) return null;

        return {
          id: model.id,
          engineID: model.engineId,

          name: model.name,
          mode: FineTuning.Mode.fromGRPC(model.mode),
          objectPrompt: model.objectPrompt,

          status: FineTuning.Model.Status.fromGRPC(model.status),
          failureReason: model.failureReason,
        } satisfies FineTuning.Model;
      },
    });
  };
}
