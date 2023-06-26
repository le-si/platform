import { App } from "~/App";
import { REST } from "~/REST";

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

// TODO: Make the "Contact Support" button actually do something.
function FailedToLoadDocumentation() {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <h4 className="text-secondary text-2xl">
        Failed to load the REST documentation.
      </h4>
      <h6 className="text-secondary text-xl">
        If the problem persists please{" "}
        <button className="text-red-600">contact support</button>
      </h6>
    </div>
  );
}
