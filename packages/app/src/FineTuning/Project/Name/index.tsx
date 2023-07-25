import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

import { Random } from "./Random";

export type Name = string;
export namespace Name {
  export const set = (name: Name) => State.use.getState().setName(name);

  export const get = () => State.use.getState().name;
  export const getPlaceholder = () => State.use.getState().placeholder;

  export const use = () => State.use(({ name }) => name, GlobalState.shallow);
  export const usePlaceholder = () =>
    State.use(({ placeholder }) => placeholder, GlobalState.shallow);

  export function Input(props: Theme.Input) {
    const name = use();
    const placeholder = usePlaceholder();
    return (
      <Theme.Input
        value={name}
        onChange={set}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  type State = {
    placeholder: Name;
    name?: Name;
    setName: (name?: Name) => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      placeholder: Random.get(),
      setName: (name) => set({ name }),
    }));
  }
}
