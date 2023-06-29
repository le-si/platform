import { Engine } from "./Engine";

export declare namespace GlobalSearch {
  export { Engine };
}

export namespace GlobalSearch {
  GlobalSearch.Engine = Engine;

  export type Candidate = {
    readonly route: string;
    readonly name: string;
    readonly content: string;
  };

  export type Result = {
    readonly route: string;
    readonly title: string;
    readonly matchCount: number;
  };
}
