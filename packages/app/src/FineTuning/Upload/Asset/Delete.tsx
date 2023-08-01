import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Delete {
  export const use = (upload?: FineTuning.Upload) => {
    const grpc = GRPC.use();
    const projectID = FineTuning.Project.useID();

    const [enabled, setEnabled] = React.useState(false);
    const execute = useCallback(() => setEnabled(true), []);

    const query = ReactQuery.useQuery({
      enabled: enabled && !!grpc && !!projectID,
      initialData: null,

      queryKey: ["FineTuning.Upload.Asset.Delete", upload?.id],
      queryFn: async () => {
        if (!grpc || !projectID || !upload?.id || !upload.asset?.id)
          return null;

        const { responses } = grpc.generation.generate(
          Stability.GRPC.Request.create({
            engineId: "asset-service",

            params: {
              oneofKind: "asset",
              asset: Stability.GRPC.AssetParameters.create({
                projectId: projectID,
                action: Stability.GRPC.AssetAction.ASSET_DELETE,
                use: Stability.GRPC.AssetUse.INPUT,
              }),
            },

            prompt: [
              Stability.GRPC.Prompt.create({
                prompt: {
                  oneofKind: "artifact",
                  artifact: Stability.GRPC.Artifact.create({
                    uuid: upload.asset.id,
                    type: Stability.GRPC.ArtifactType.ARTIFACT_TEXT,
                    data: {
                      oneofKind: "text",
                      text: upload.asset.id,
                    },
                  }),
                },
              }),
            ],
          })
        );

        for await (const response of responses) {
          for await (const _ of response.artifacts) {
            FineTuning.Uploads.remove(upload.id);
            return true;
          }
        }

        throw new Error("Image deletion failed!");
      },
    });

    return {
      ...query,
      ...(upload?.asset?.id && {
        execute,
      }),
    };
  };
}
