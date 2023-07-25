// import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Create {
  export const use = () => {
    const project = FineTuning.Project.use();

    const [shouldCreate, setShouldCreate] = React.useState(false);
    const trigger = useCallback(() => setShouldCreate(true), []);

    const query = ReactQuery.useQuery({
      enabled: shouldCreate,
      initialData: null,

      queryKey: ["FineTuning.Training.Create", project?.id],
      queryFn: async () => {
        if (!project?.id) return null;

        const grpc = GRPC.get();
        if (!grpc) return null;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return true;

        // const artifact = Stability.GRPC.Artifact.create({
        //   type: Stability.GRPC.ArtifactType.ARTIFACT_IMAGE,
        //   mime: mimeType,
        //   data: { oneofKind: "binary", binary },
        // });

        // const prompt = [
        //   Stability.GRPC.Prompt.create({
        //     prompt: { oneofKind: "artifact", artifact },
        //   }),
        // ];

        // const asset = Stability.GRPC.AssetParameters.create({
        //   action: Stability.GRPC.AssetAction.ASSET_PUT,
        //   projectId: project.id,
        //   use: Stability.GRPC.AssetUse.INPUT,
        // });

        // const request = Stability.GRPC.Request.create({
        //   engineId: "asset-service",
        //   params: { oneofKind: "asset", asset },
        //   prompt,
        // });

        // const { responses } = grpc?.generation.generate(request);

        // for await (const response of responses) {
        //   for await (const artifact of response.artifacts) {
        //     if (artifact.type === Stability.GRPC.ArtifactType.ARTIFACT_TEXT)
        //       return { id: artifact.uuid };
        //   }
        // }

        // throw new Error("Image upload failed!");
      },
    });

    return { ...query, trigger };
  };
}
