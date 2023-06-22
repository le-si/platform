import { CustomError } from "ts-custom-error";

import { Provider } from "./Provider";

/**
 * To add a new environment variable:
 *  - Add variable to ImportMetaEnv
 *  - Add variable to Environment.variables
 *  - Add variable to each of the .env files
 */

declare global {
  // Augment ImportMetaEnv & add our env variables
  interface ImportMetaEnv {
    readonly VITE_AUTH0_DOMAIN: string;
    readonly VITE_AUTH0_AUDIENCE: string;
    readonly VITE_AUTH0_CLIENT_ID: string;
    readonly VITE_API_GRPC_URL: string;
    readonly VITE_API_REST_URL: string;
  }

  // Augment import.meta.env so it references the ImportMetaEnv above
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export declare namespace Environment {
  export { Provider };
}

export namespace Environment {
  Environment.Provider = Provider;

  export type VariableName = keyof typeof variables extends `VITE_${infer K}`
    ? K
    : never;

  export const variables = {
    VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
    VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
    VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
    VITE_API_GRPC_URL: import.meta.env.VITE_API_GRPC_URL,
    VITE_API_REST_URL: import.meta.env.VITE_API_REST_URL,
  } as const;

  export function validate() {
    for (const [key, value] of Object.entries(Environment.variables)) {
      if (!value) {
        throw new EnvironmentVariableError(`'${key}' is undefined`);
      }
    }
  }

  export function get(key: VariableName): string {
    return variables[`VITE_${key}` as const];
  }
}

class EnvironmentVariableError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
