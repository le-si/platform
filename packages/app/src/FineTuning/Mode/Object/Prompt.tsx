import { GlobalState } from "~/GlobalState";

export type Prompt = string;

export function Prompt() {
  return <></>;
}

export namespace Prompt {
  export const get = () => State.use.getState().prompt;
  export const set = (prompt: Prompt) => State.use.setState({ prompt });
  export const use = () => State.use(({ prompt }) => prompt);

  type State = { prompt: Prompt };
  namespace State {
    export const use = GlobalState.create<State>(() => ({
      prompt: "",
    }));
  }
}
