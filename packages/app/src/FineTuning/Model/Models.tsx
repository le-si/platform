import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";
import { User } from "~/User";

export type Models = FineTuning.Model[];
export namespace Models {
  export const use = () => {
    const grpc = GRPC.use();
    const user = User.use();

    return ReactQuery.useQuery({
      enabled: !!grpc && !!user.data?.id,
      initialData: [],

      refetchInterval: 5 * 1000,

      queryKey: ["FineTuning.Models"],
      queryFn: async (): Promise<Models> => {
        spy({
          "FineTuning.Models": {
            grpc: grpc,
            user: user.data?.id,
          },
        });

        if (!grpc || !user.data?.id) return [];

        const { response } = await grpc?.fineTuning.listModels(
          Stability.GRPC.ListModelsRequest.create({
            id: {
              oneofKind: "userId",
              userId: user.data.id,
            },
          })
        );

        return spy(
          (response?.models ?? []).map((model) => ({
            id: model.id,
            engineID: model.engineId,

            name: model.name,
            mode: FineTuning.Mode.fromGRPC(model.mode),
            objectPrompt: model.objectPrompt,

            status: FineTuning.Model.Status.fromGRPC(model.status),
            failureReason: model.failureReason,
          }))
        );
      },
    });
  };
}
