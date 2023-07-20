import { GlobalState } from "~/GlobalState";

export type Step = number;

export function Step({ className, children }: StyleableWithChildren) {
  return (
    <div
      className={classes(
        "flex max-w-[100rem] flex-col gap-12 p-4 sm:p-4 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export type Steps = {
  active: Step;
  max?: Step;
};

export namespace Steps {
  export const next = () => State.use.getState().next();
  export const previous = () => State.use.getState().previous();

  export const use = (initial: Steps) => {
    useEffect(
      () =>
        State.use.setState({
          active: initial.active,
          max: initial.max,
        }),
      [initial.active, initial.max]
    );

    return State.use((state) => state, GlobalState.shallow);
  };

  type State = Steps & {
    next: () => void;
    previous: () => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      active: 1,

      next: () =>
        set(({ active, max }) => ({
          active: Math.min(active + 1, max ?? Infinity),
        })),

      previous: () =>
        set(({ active }) => ({
          active: Math.max(1, active - 1),
        })),
    }));
  }
}
