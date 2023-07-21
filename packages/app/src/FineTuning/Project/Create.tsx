import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () =>
    ReactQuery.useMutation({
      mutationKey: ["FineTuning.Project.Create"],
      mutationFn: async ({ name }: Pick<FineTuning.Project, "name">) => {
        if (State.use.getState().inProgress) return;

        const grpc = GRPC.get();
        if (!grpc) return;

        State.use.setState({ inProgress: true });

        const request = GRPC.CreateProjectRequest.create({
          title: name,
          type: Stability.GRPC.ProjectType.TRAINING,
          access: Stability.GRPC.ProjectAccess.PRIVATE,
          status: Stability.GRPC.ProjectStatus.ACTIVE,
        });

        const { response } = await grpc?.project.create(request);

        FineTuning.Project.set({
          id: response.id,
          name: response.title,
        });
      },
    });

  type State = {
    inProgress: boolean;
  };

  namespace State {
    export const use = GlobalState.create<State>(() => ({
      inProgress: false,
    }));
  }
}
