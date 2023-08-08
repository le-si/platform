import * as Stability from "@stability/sdk";
import * as ReactQuery from "@tanstack/react-query";
import throttle from "lodash.throttle";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";

export namespace Update {
  const throttled = throttle((fn: () => void) => fn(), 3000, {
    trailing: true,
  });

  export const use = ({ name }: Partial<FineTuning.Project>) => {
    const grpc = GRPC.use();
    const projectID = FineTuning.Project.useID();

    const projectNamePlaceholder = FineTuning.Project.Name.Placeholder.use();
    const [projectNameUpdated, setProjectNameUpdated] = useState<
      string | undefined
    >();

    useEffect(
      () => throttled(() => setProjectNameUpdated(!!name ? name : undefined)),
      [name]
    );

    return ReactQuery.useQuery({
      enabled: !!grpc && !!projectID,
      initialData: null,

      queryKey: ["FineTuning.Project.Update", projectNameUpdated],
      queryFn: async () => {
        if (!grpc || !projectID) return null;

        const { response } = await grpc.project.update(
          Stability.GRPC.UpdateProjectRequest.create({
            id: projectID,
            title: projectNameUpdated ?? projectNamePlaceholder,
          })
        );

        return response;
      },
    });
  };
}
