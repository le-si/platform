import * as Stability from "@stability/sdk";

import { User } from "~/User";

export namespace GRPC {
  export const use = () => {
    const accessToken = User.AccessToken.use();

    return useMemo(() => {
      if (!accessToken) return;

      const transport = Stability.GRPC.createWebTransport({
        baseURL: import.meta.env.VITE_API_GRPC_URL,
        apiKey: accessToken,
      });

      return {
        dashboard: new Stability.GRPC.DashboardServiceClient(transport),
        generation: new Stability.GRPC.GenerationServiceClient(transport),
        engines: new Stability.GRPC.DashboardServiceClient(transport),
        project: new Stability.GRPC.ProjectServiceClient(transport),
      };
    }, [accessToken]);
  };
}
