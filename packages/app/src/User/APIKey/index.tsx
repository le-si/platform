import * as ReactQuery from "@tanstack/react-query";

import { SDK } from "~/SDK";
import { User } from "~/User";
import { DateTime } from "~/Utilities";

export * from "./APIKeys";
export type APIKey = {
  key: string;
  created: DateTime;
};

export namespace APIKey {
  export function obscure(apiKey: APIKey) {
    return (
      apiKey.key.slice(0, 6) +
      apiKey.key.slice(6, -3).replace(/./g, "*") +
      apiKey.key.slice(-3)
    );
  }

  export namespace Create {
    export const use = () => {
      const user = User.use();
      const context = SDK.Context.use();
      const execute = ReactQuery.useMutation(async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { response } = await context!.dashboard.createAPIKey({
          isSecret: true,
        });

        user.refetch();

        return {
          key: response.key,
          created: new Date(Number(response.createdAt)),
        };
      });

      return context === undefined ? undefined : execute;
    };
  }

  export namespace Delete {
    export const use = () => {
      const user = User.use();
      const context = SDK.Context.use();
      const execute = ReactQuery.useMutation(
        async ({ key }: Pick<APIKey, "key">) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await context!.dashboard.deleteAPIKey({ id: key });
          user.refetch();
        }
      );

      return context === undefined ? undefined : execute;
    };
  }
}
