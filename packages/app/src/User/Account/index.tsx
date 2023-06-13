import { Credits } from "./Credits";
import { Danger } from "./Danger";
import { Page } from "./Page";
import { Panel } from "./Panel";
import { Support } from "./Support";

export declare namespace Account {
  export { Page, Credits, Support, Danger, Panel };
}

export namespace Account {
  Account.Page = Page;
  Account.Credits = Credits;
  Account.Support = Support;
  Account.Danger = Danger;
  Account.Panel = Panel;
}
