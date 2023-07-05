import { useNavigate } from "react-router-dom";
import { REST } from "~/REST";
import { Support } from "~/Support";

import { RedocContainer } from "./Redoc";

export function Page() {
  const { data, isError } = REST.useOpenAPISpec();

  return isError ? (
    <FailedToLoadDocumentation />
  ) : (
    <RedocContainer spec={data} />
  );
}

export namespace Page {
  export const url = () => "/docs/api-reference" as const;
}

function FailedToLoadDocumentation() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-20rem)] flex-col items-center justify-center gap-4 space-y-2 text-center">
      <h4 className="text-2xl font-bold">
        Failed to load the REST documentation.
      </h4>
      <p className="flex items-center text-xl">
        If the problem persists please{" "}
        <button
          className="btn btn-sm btn-accent ml-2"
          onClick={() => navigate(Support.Page.url())}
        >
          contact support
        </button>
      </p>
    </div>
  );
}
