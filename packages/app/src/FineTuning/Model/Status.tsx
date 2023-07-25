export type Status = "Not Started" | "Started" | "Finished" | "Failed";
export namespace Status {
  export const fromGRPC = (grpc: number): Status | undefined =>
    ((
      {
        0: "Not Started",
        1: "Started",
        2: "Finished",
        3: "Failed",
      } as const
    )[grpc]);
}
