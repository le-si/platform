import { vitest } from "vitest";

// Inform vitest of all of our Global Variables
import "~/GlobalVariables";

vitest.stubEnv("VITE_AUTH0_AUDIENCE", "VITE_AUTH0_AUDIENCE");
