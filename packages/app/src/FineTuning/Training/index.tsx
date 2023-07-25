import { keyframes } from "@emotion/react";

import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";

export function Training() {
  const percentage = Training.usePercentage();

  const { minMilliseconds, maxMilliseconds } =
    FineTuning.Mode.Duration.use() ?? {
      minMilliseconds: 0,
      maxMilliseconds: 0,
    };

  return (
    <FineTuning.Step
      disableNavigation
      className="max-w-[800px] grow items-center"
    >
      <FineTuning.H1 className="w-[">
        Training&nbsp;
        <span className="opacity-muted ml-1 font-light">
          {Math.round(percentage)}%
        </span>
      </FineTuning.H1>
      <Training.Progress />
      <div className="text-center">
        <p>We&apos;re fine-tuning your model now.</p>
        <p>
          This usually takes between {minMilliseconds / 1000 / 60} to&nbsp;
          {maxMilliseconds / 1000 / 60} minutes.
        </p>
      </div>
    </FineTuning.Step>
  );
}

export namespace Training {
  export const useStartedAt = () => State.use(({ startedAt }) => startedAt);
  export const useStoppedAt = () => State.use(({ startedAt }) => startedAt);

  export const usePercentage = () => {
    const [now, setNow] = useState(new Date());

    const { maxMilliseconds } = FineTuning.Mode.Duration.use() ?? {
      maxMilliseconds: Infinity,
    };

    const startedAt = useStartedAt();
    const elapsedMilliseconds = startedAt
      ? now.valueOf() - startedAt.valueOf()
      : 0;

    const percentage = Math.min(
      maxMilliseconds > 0 ? (elapsedMilliseconds / maxMilliseconds) * 100 : 0,
      100
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 250);

      return () => clearInterval(interval);
    }, [percentage]);

    return percentage;
  };

  export function Progress() {
    const percentage = usePercentage();
    return (
      <div className="flex w-full grow items-center px-8">
        <div className="relative h-2 flex-grow overflow-hidden rounded-full">
          <div
            className="h-full min-w-[0.5em] rounded-full"
            style={{ width: `${percentage}%` }}
            css={Progress.styles()}
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 opacity-10"
            css={Progress.styles()}
          />
        </div>
      </div>
    );
  }

  export namespace Progress {
    export const animation = keyframes`
      0% {
        background-position: -1000px;
      }

      100% {
        background-position: 1000px;
      }
    `;

    export const styles = () => css`
      background-size: 1000px;
      background-repeat: repeat;
      background-image: linear-gradient(
        120deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%
      );

      animation: ${Progress.animation} 10s linear infinite;
    `;
  }
}

type State = {
  startedAt?: Date;
  stoppedAt?: Date;

  start: () => void;
  stop: () => void;
};

namespace State {
  export const use = GlobalState.create<State>((set) => ({
    startedAt: new Date(),

    start: () => set({ startedAt: new Date(), stoppedAt: undefined }),
    stop: () => set({ startedAt: new Date() }),
  }));
}
