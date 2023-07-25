import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const grpc = GRPC.use();
    const project = FineTuning.Project.use();
    const mode = FineTuning.Mode.use();

    const [enabled, setEnabled] = React.useState(true);
    const enable = useCallback(() => setEnabled(true), []);

    const query = ReactQuery.useQuery({
      enabled: enabled && !!grpc && !!project?.id && !!mode,
      initialData: null,

      queryKey: ["FineTuning.Training.Create", project?.id],
      queryFn: async () => {
        if (!grpc || !project?.id || !mode) return null;

        // if (1) return null;

        FineTuning.Training.start();

        const { response } = await grpc?.fineTuning.createModel(
          spy(
            Stability.GRPC.CreateModelRequest.create({
              name: "Testy test",
              mode: Stability.GRPC.FineTuningMode.STYLE,
              projectId: project.id,
              engineId: "stable-diffusion-xl-1024-v0-9",
            })
          )
        );

        return spy(response);
      },
    });

    return { ...query, enable };
  };
}
