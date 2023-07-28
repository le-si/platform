import * as Stability from "@stability/sdk";

export type Status = ReturnType<typeof Status.GRPC.decode>;
export namespace Status {
  export type GRPC = Stability.GRPC.FineTuningStatus;
  export namespace GRPC {
    export const decode = (grpc: GRPC) =>
      ((
        {
          0: "Not Started",
          1: "Running",
          2: "Completed",
          3: "Failed",
          4: "Submitted",
        } as const
      )[grpc]);

    export const encode = (status: Status): GRPC =>
      ((
        {
          "Not Started": 0,
          Running: 1,
          Completed: 2,
          Failed: 3,
          Submitted: 4,
        } as const
      )[status]);
  }
}
