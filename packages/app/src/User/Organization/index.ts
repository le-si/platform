import * as ReactQuery from "@tanstack/react-query";
import { GRPC } from "~/GRPC";

export type Organization = {
  id: string;
  name: string;
};

export namespace Organization {
  export const use = () => {
    const grpc = GRPC.use();
    return ReactQuery.useQuery({
      enabled: grpc !== undefined,

      queryKey: ["Organization.use"],
      queryFn: async (): Promise<Organization> => {
        // await waitForFirstRequest();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const organization = await grpc!.organization.get();
        if (organization instanceof Error) throw organization;

        return {
          id: organization.id,
          name: organization.name,
        };
      },
    });
  };
}
