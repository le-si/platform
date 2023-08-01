import { GlobalState } from "~/GlobalState";

import { Input } from "./Input";
import { Placeholder } from "./Placeholder";

export type Name = string;

export declare namespace Name {
  export { Input, Placeholder };
}

export namespace Name {
  Name.Input = Input;
  Name.Placeholder = Placeholder;

  export const get = () => State.use.getState().name;
  export const set = (name: Name) => State.use.setState({ name });

  export const use = () => State.use(({ name }) => name);

  type State = { name: Name };
  namespace State {
    export const use = GlobalState.create<State>(() => ({
      name: "",
    }));
  }
}
