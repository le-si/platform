import { GlobalState } from "~/GlobalState";

export namespace Steps {
  export const use = () => State.use(({ index }) => index);

  export const next = () => State.use.getState().next();
  export const previous = () => State.use.getState().previous();

  type State = {
    index: number;

    next: () => void;
    previous: () => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      index: 2,

      next: () =>
        set((state) => ({
          ...state,
          index: state.index + 1,
        })),

      previous: () =>
        set((state) => ({
          ...state,
          index: Math.max(0, state.index - 1),
        })),
    }));
  }
}
