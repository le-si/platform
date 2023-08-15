import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

export type Prompt = string;

export function Prompt(props: Theme.Input) {
  const prompt = Prompt.use();
  return (
    <Theme.Input
      value={prompt}
      onChange={Prompt.set}
      placeholder={
        "Word for the object you're fine-tuning on, e.g. 'car', 'dog', 'cat'"
      }
      {...props}
    />
  );
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
