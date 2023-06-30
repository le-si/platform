import { Engine } from "./Engine";
import { Modal } from "./Modal";
import { Provider } from "./Provider";

export declare namespace GlobalSearch {
  export { Engine, Modal, Provider };
}

export namespace GlobalSearch {
  GlobalSearch.Engine = Engine;
  GlobalSearch.Modal = Modal;
  GlobalSearch.Provider = Provider;

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
