import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = (upload?: FineTuning.Upload) =>
    ReactQuery.useQuery({
      queryKey: ["FineTuning.Upload.Asset.Create", upload?.id],
      queryFn: async () => {
        if (!upload?.url) return {};

        const grpc = GRPC.get();
        if (!grpc) return {};

        const project = FineTuning.Project.get();
        if (!project) return {};

        const image = await fetch(upload.url);
        const binary = new Uint8Array(await image.arrayBuffer());
        const mimeType = image.headers.get("content-type") ?? undefined;

        const artifact = Stability.GRPC.Artifact.create({
          type: Stability.GRPC.ArtifactType.ARTIFACT_IMAGE,
          mime: mimeType,
          data: { oneofKind: "binary", binary },
        });

        const prompt = [
          Stability.GRPC.Prompt.create({
            prompt: { oneofKind: "artifact", artifact },
          }),
        ];

        const asset = Stability.GRPC.AssetParameters.create({
          action: Stability.GRPC.AssetAction.ASSET_PUT,
          projectId: project.id,
          use: Stability.GRPC.AssetUse.INPUT,
        });

        const request = Stability.GRPC.Request.create({
          engineId: "asset-service",
          params: { oneofKind: "asset", asset },
          prompt,
        });

        const response = await grpc?.generation.generate(request);

        return spy(response);
      },
    });
}
