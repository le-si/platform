import * as ReactQuery from "@tanstack/react-query";
import { Environment } from "~/Environment";
import { GlobalSearch } from "~/GlobalSearch";

const queryKey = (): ReactQuery.QueryKey => ["rest-api-spec"];

/** Fetches and caches the REST API OpenAPI spec. */
export function useOpenAPISpec(
  options?: ReactQuery.QueryObserverOptions<object | undefined>
) {
  return ReactQuery.useQuery<object | undefined>(
    queryKey(),
    () =>
      fetch(Environment.get("REST_API_SPEC_URL"))
        .then((response) => response.json())
        .then(async (spec) => {
          // Index the REST API spec, so it shows up in the global search.
          await GlobalSearch.Engine.addToIndex({
            route: "/rest-api",
            name: "REST API",
            content: JSON.stringify(spec),
          });

          return spec;
        }),
    { staleTime: Infinity, ...options }
  );
}

useOpenAPISpec.queryKey = queryKey;
