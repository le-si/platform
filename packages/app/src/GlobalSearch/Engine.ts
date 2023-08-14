import * as FlexSearch from "flexsearch";
import { Documentation } from "~/Documentation";
import { GlobalSearch } from "~/GlobalSearch/index";
import { Pricing } from "~/Pricing";
import { User } from "~/User";

const index = new FlexSearch.Document<GlobalSearch.Candidate, true>({
  tokenize: "forward",
  worker: true,
  document: {
    id: "route",
    store: true,
    index: ["name", "content"],
  },
});

export namespace Engine {
  function customSearchCandidates(): GlobalSearch.Candidate[] {
    return [
      {
        route: "https://status.stability.ai/",
        name: "Status Page",
        content: "API Status Page",
      },
      Pricing.searchCandidate(),
      ...User.Account.Page.searchCandidate(),
    ];
  }

  /** Initialize the search index */
  export function init() {
    const indexRecursively = (group: Documentation.Group) => {
      if (typeof group.content === "string") {
        index.add({
          route: group.route,
          name: group.name,
          content: group.content,
        });
      }

      if (group.children) group.children.forEach(indexRecursively);
    };

    Documentation.createDocs().forEach(indexRecursively);

    customSearchCandidates().forEach((item) => index.add(item));
  }

  /** Add a search candidate to the index on-the-fly */
  export function addToIndex(
    item: GlobalSearch.Candidate
  ): Promise<FlexSearch.Document<GlobalSearch.Candidate, true>> {
    return index.addAsync(item.route, {
      route: item.route,
      name: item.name,
      content: item.content,
    });
  }

  export function search(query: string): GlobalSearch.Result[] {
    return index
      .search(query, 10, { enrich: true })
      .flatMap((result) => result.result)
      .reduce((results: GlobalSearch.Result[], result) => {
        // Prevent duplicates
        if (results.some((r) => r.route === result.doc.route)) return results;

        results.push({
          route: result.doc.route,
          title: result.doc.name,
          matchCount:
            typeof result.doc.content === "string"
              ? countMatches(result.doc.content, query)
              : 1,
        });

        return results;
      }, [])
      .sort((a, b) => b.matchCount - a.matchCount);
  }

  function countMatches(content: string, query: string) {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    return content.match(new RegExp(escapedQuery, "gi"))?.length ?? 1;
  }
}
