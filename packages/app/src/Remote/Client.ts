import * as ReactQuery from "@tanstack/react-query";

import { Theme } from "~/Theme";

let client: Client;

export type Client = ReactQuery.QueryClient;
export namespace Client {
  export const get = () => client;
  export const create = () =>
    (client ||= new ReactQuery.QueryClient({
      defaultOptions: {
        mutations: {
          cacheTime: 0,
          onError,
        },

        queries: {
          cacheTime: 24 * 60 * 60 * 1000,
          refetchOnWindowFocus: false,
          retry: 1,
          onError,
        },
      },
    }));

  export const onError = (error: unknown) => {
    const message = "Something went wrong!";
    const messageWithDetails =
      error instanceof Error ? `${message} ${error.message}` : message;

    Theme.Snackbar.enqueueSnackbar(messageWithDetails, {
      variant: "error",
      preventDuplicate: true,
    });
  };
}
