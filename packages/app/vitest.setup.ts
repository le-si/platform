import { vitest } from "vitest";

// Inform vitest of all of our Global Variables
import "~/GlobalVariables";

// Stub Environment domain to always return environment
// variable names instead of their values
vitest.mock("~/Environment", () => ({
  Environment: {
    get: (envVarName: string) => `VITE_${envVarName}`,
  },
}));
