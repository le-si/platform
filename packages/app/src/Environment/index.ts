declare global {
  interface ImportMeta {
    env: {
      VITE_API_GRPC_URL: string;
      VITE_API_REST_URL: string;

      VITE_AUTH0_DOMAIN: string;
      VITE_AUTH0_AUDIENCE: string;
      VITE_AUTH0_CLIENT_ID: string;
    };
  }
}

export {};
