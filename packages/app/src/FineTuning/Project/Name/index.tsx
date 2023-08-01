import { Input } from "./Input";
import { Placeholder } from "./Placeholder";

export type Name = string;

export declare namespace Name {
  export { Input, Placeholder };
}

export namespace Name {
  Name.Input = Input;
  Name.Placeholder = Placeholder;
}
