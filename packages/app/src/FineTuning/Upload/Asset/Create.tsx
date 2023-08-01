import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = (upload?: FineTuning.Upload) => {
    const grpc = GRPC.use();
    const projectID = FineTuning.Project.useID();

    return ReactQuery.useQuery({
      enabled: !!grpc && !!projectID,

      queryKey: ["FineTuning.Upload.Asset.Create", upload?.id],
      queryFn: async () => {
        if (!grpc || !projectID || !upload?.url) return null;

        const image = await fetch(upload.url);
        const binary = new Uint8Array(await image.arrayBuffer());
        const mimeType = image.headers.get("content-type") ?? undefined;

        const { responses } = grpc.generation.generate(
          Stability.GRPC.Request.create({
            engineId: "asset-service",

            params: {
              oneofKind: "asset",
              asset: Stability.GRPC.AssetParameters.create({
                projectId: projectID,
                action: Stability.GRPC.AssetAction.ASSET_PUT,
                use: Stability.GRPC.AssetUse.INPUT,
              }),
            },

            prompt: [
              Stability.GRPC.Prompt.create({
                prompt: {
                  oneofKind: "artifact",
                  artifact: Stability.GRPC.Artifact.create({
                    type: Stability.GRPC.ArtifactType.ARTIFACT_IMAGE,
                    mime: mimeType,
                    data: {
                      oneofKind: "binary",
                      binary,
                    },
                  }),
                },
              }),
            ],
          })
        );

        for await (const response of responses) {
          for await (const artifact of response.artifacts) {
            if (artifact.type === Stability.GRPC.ArtifactType.ARTIFACT_TEXT) {
              const asset = { id: artifact.uuid };
              FineTuning.Uploads.addAssetToUpload(upload, asset);
              return asset;
            }
          }
        }

        throw new Error("Image upload failed!");
      },
    });
  };
}
