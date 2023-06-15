import { Credits } from "./Credits";
import { Danger } from "./Danger";
import { Overview } from "./Overview";
import { Page } from "./Page";

export declare namespace Account {
  export { Page, Credits, Danger, Overview };
}

export namespace Account {
  Account.Page = Page;
  Account.Credits = Credits;
  Account.Danger = Danger;
  Account.Overview = Overview;
}
