import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = (upload?: FineTuning.Upload) => {
    const query = ReactQuery.useQuery({
      queryKey: ["FineTuning.Upload.Asset.Create", upload?.id],
      queryFn: async () => {
        if (!upload?.url) return null;

        const grpc = GRPC.get();
        if (!grpc) return null;

        const project = FineTuning.Project.get();
        if (!project) return null;

        const image = await fetch(upload.url);
        const binary = new Uint8Array(await image.arrayBuffer());
        const mimeType = image.headers.get("content-type") ?? undefined;

        const { responses } = grpc.generation.generate(
          Stability.GRPC.Request.create({
            engineId: "asset-service",

            params: {
              oneofKind: "asset",
              asset: Stability.GRPC.AssetParameters.create({
                projectId: project.id,
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
            if (artifact.type === Stability.GRPC.ArtifactType.ARTIFACT_TEXT)
              return artifact;
          }
        }

        throw new Error("Image upload failed!");
      },
    });

    return {
      ...query,
      ...(query.data?.uuid && {
        asset: {
          id: query.data.uuid,
        },
      }),
    };
  };
}
