import * as Stability from "@stability/sdk";

export type Status = ReturnType<typeof Status.GRPC.decode>;
export namespace Status {
  export type GRPC = Stability.GRPC.FineTuningStatus;
  export namespace GRPC {
    export const decode = (grpc: GRPC) =>
      ((
        {
          0: "Not Started",
          1: "Not Started",
          2: "Started",
          3: "Finished",
          4: "Failed",
        } as const
      )[grpc]);

    export const encode = (status: Status): GRPC =>
      ((
        {
          "Not Started": 1,
          Started: 2,
          Finished: 3,
          Failed: 4,
        } as const
      )[status]);
  }
}
