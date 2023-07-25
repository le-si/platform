import * as ReactQuery from "@tanstack/react-query";

export namespace Update {
  export const use = () => {
    const query = ReactQuery.useQuery({
      enabled: false,
      initialData: null,

      queryKey: ["FineTuning.Project.Update"],
      queryFn: async () => {
        return null;
      },
    });

    return {
      ...query,
    };
  };
}
