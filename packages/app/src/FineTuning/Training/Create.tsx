// import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const project = FineTuning.Project.use();
    const grpc = GRPC.use();

    const [enabled, setEnabled] = React.useState(true);
    const enable = useCallback(() => setEnabled(true), []);

    const query = ReactQuery.useQuery({
      enabled: enabled && !!grpc,
      initialData: null,

      queryKey: ["FineTuning.Training.Create", project?.id],
      queryFn: async () => {
        if (!project?.id) return null;

        const grpc = GRPC.get();

        spy({ project, grpc });

        if (!grpc) return null;

        FineTuning.Training.start();

        await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

        FineTuning.Training.stop();

        return true;

        // const request = Stability.GRPC.CreateModelRequest.create({
        //   name: "test",
        //   mode: Stability.GRPC.FineTuningMode.OBJECT,
        //   objectPrompt: "dog",
        //   projectId: project.id,
        //   engineId: "stable-diffusion-xl-1024-v0-9",
        // });

        // const createModelResponse = await grpc?.fineTuning.createModel(request);
      },
    });

    return { ...query, enable };
  };
}
