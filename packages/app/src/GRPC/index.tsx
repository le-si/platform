import * as Stability from "@stability/sdk";
import { CustomError } from "ts-custom-error";
import { GlobalState } from "~/GlobalState";

import { User } from "~/User";

export type GRPC = {
  dashboard: Stability.GRPC.DashboardServiceClient;
  engines: Stability.GRPC.DashboardServiceClient;
  fineTuning: Stability.GRPC.FineTuningServiceClient;
  generation: Stability.GRPC.GenerationServiceClient;
  project: Stability.GRPC.ProjectServiceClient;
  organization: {
    get: () => Promise<Stability.GRPC.Organization | GRPC.OrganizationError>;
  };
};

export namespace GRPC {
  export const CreateChargeRequest = Stability.GRPC.CreateChargeRequest;
  export const GetChargesRequest = Stability.GRPC.GetChargesRequest;
  export const CreateProjectRequest = Stability.GRPC.CreateProjectRequest;

  export const get = () => State.use.getState().grpc;

  export const use = () => State.use(({ grpc }) => grpc, GlobalState.shallow);

  export function Provider({ children }: React.PropsWithChildren) {
    const accessToken = User.AccessToken.use();

    useEffect(() => {
      if (!accessToken) return;

      const transport = Stability.GRPC.createWebTransport({
        baseURL: import.meta.env.VITE_API_GRPC_URL,
        apiKey: accessToken,
      });

      const dashboard = new Stability.GRPC.DashboardServiceClient(transport);
      const grpc = {
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

      State.use.setState({ grpc });
    }, [accessToken]);

    return <>{children}</>;
  }

  export class OrganizationError extends CustomError {
    constructor(message: string) {
      super(message);
    }
  }

  type State = {
    grpc?: GRPC;
    setGRPC: (grpc?: GRPC) => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      setGRPC: (grpc) => set({ grpc }),
    }));
  }
}
