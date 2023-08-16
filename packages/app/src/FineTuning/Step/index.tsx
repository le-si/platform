import { GlobalState } from "~/GlobalState";
import { FineTuning } from "~/FineTuning";

export type Step = number;

export function Step({
  disableNavigation,
  className,
  children,
}: StyleableWithChildren & { disableNavigation?: boolean }) {
  useEffect(
    () => Steps.setIsNavigationDisabled(disableNavigation),
    [disableNavigation]
  );

  return (
    <div className={classes("flex max-w-[100rem] flex-col gap-12", className)}>
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
  export const reset = () => State.use.getState().reset();

  export const setIsNavigationDisabled = (isNavigationDisabled = false) =>
    State.use.getState().setIsNavigationDisabled(isNavigationDisabled);

  export const useIsNavigationDisabled = () =>
    State.use(({ isNavigationDisabled }) => isNavigationDisabled);

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
    reset: () => void;

    isNavigationDisabled: boolean;
    setIsNavigationDisabled: (navigationDisabled?: boolean) => void;
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

      reset: () => {
        set({ active: 1 });
        FineTuning.Uploads.reset();
      },

      isNavigationDisabled: false,
      setIsNavigationDisabled: (isNavigationDisabled = false) =>
        set({ isNavigationDisabled }),
    }));
  }
}
