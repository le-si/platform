import * as ReactQuery from "@tanstack/react-query";

import { SDK, Stability } from "~/SDK";

export type Organization = {
  id: string;
  name: string;
};

export namespace Organization {
  export const use = () => {
    const context = SDK.Context.use();
    return ReactQuery.useQuery({
      enabled: context !== undefined,

      queryKey: ["Organization.use"],
      queryFn: async (): Promise<Organization> => {
        // await waitForFirstRequest();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const organization = await Stability.Sandbox.getOrganization(context!);
        if (organization instanceof Error) throw organization;

        return {
          id: organization.id,
          name: organization.name,
        };
      },
    });
  };
}
