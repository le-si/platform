import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";

export type Input = {
  mode?: FineTuning.Mode;
};

export namespace Input {
  export const get = () => State.use.getState().input;
  export const set = (setInput: React.SetStateAction<Input | undefined>) =>
    State.use.getState().setInput(setInput);

  export const use = () => State.use(({ input }) => input);

  type State = {
    input?: Input;
    setInput: (setInput: React.SetStateAction<Input | undefined>) => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      setInput: (setInput) =>
        set((state) => ({
          ...state,
          input:
            typeof setInput === "function" ? setInput(state.input) : setInput,
        })),
    }));
  }
}
