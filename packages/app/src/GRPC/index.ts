import * as Stability from "@stability/sdk";
import { CustomError } from "ts-custom-error";

import { User } from "~/User";

export namespace GRPC {
  export const CreateChargeRequest = Stability.GRPC.CreateChargeRequest;
  export const GetChargesRequest = Stability.GRPC.GetChargesRequest;
  export const CreateProjectRequest = Stability.GRPC.CreateProjectRequest;

  export const use = () => {
    const accessToken = User.AccessToken.use();

    return useMemo(() => {
      if (!accessToken) return;

      const transport = Stability.GRPC.createWebTransport({
        baseURL: import.meta.env.VITE_API_GRPC_URL,
        apiKey: accessToken,
      });

      const dashboard = new Stability.GRPC.DashboardServiceClient(transport);
      return {
        dashboard,
        engines: new Stability.GRPC.DashboardServiceClient(transport),
        fineTuning: new Stability.GRPC.FineTuningServiceClient(transport),
        generation: new Stability.GRPC.GenerationServiceClient(transport),
        project: new Stability.GRPC.ProjectServiceClient(transport),
        organization: {
          get: async (): Promise<
            Stability.GRPC.Organization | OrganizationError
          > => {
            const { response: getMeResponse } = await dashboard.getMe({});
            const defaultOrganization = getMeResponse.organizations.find(
              ({ isDefault }) => isDefault
            );

            if (!defaultOrganization)
              return new OrganizationError("No default organization found!");

            const { organization } = defaultOrganization;
            if (!organization)
              return new OrganizationError("No organization found!");

            return organization;
          },
        },
      };
    }, [accessToken]);
  };

  export class OrganizationError extends CustomError {
    constructor(message: string) {
      super(message);
    }
  }
}
