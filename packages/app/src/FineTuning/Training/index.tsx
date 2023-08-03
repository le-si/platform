import { Link } from "react-router-dom";

import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";
import { User } from "~/User";

import { Progress } from "./Progress";

export function Training() {
  FineTuning.Model.Create.use();

  const { data: model } = FineTuning.Model.Create.use();

  const status = FineTuning.Model.use(model?.id)?.status;
  const percentage = Training.usePercentage();

  useEffect(() => {
    FineTuning.Training.start();
  }, []);

  useEffect(() => {
    (status === "Completed" || status === "Failed") && Training.stop();
  }, [status]);

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
      {percentage < 100 ? (
        <>
          <FineTuning.H1 className="flex items-center gap-1">
            Training&nbsp;
            <span className="opacity-muted font-light">
              {Math.round(percentage)}%
            </span>
          </FineTuning.H1>
          <Progress />
        </>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <FineTuning.H1 className="flex items-center justify-center gap-2">
            <Theme.Icon.Check className="-ml-4 h-12 w-12 text-green-500" />
            Training Complete
          </FineTuning.H1>
          <div className="flex justify-center gap-8">
            <Theme.Button className="px-4" onClick={FineTuning.Steps.next}>
              New Model
            </Theme.Button>
            <Theme.Button
              variant="primary"
              className="px-4"
              link="/sandbox/text-to-image"
              noLinkIcon
            >
              Try it out
              <FineTuning.ArrowRight className="ml-2" />
            </Theme.Button>
          </div>

          <div className="text-center text-black/50">
            <p>
              You can manage your model on the&nbsp;
              <Link
                className="text-indigo-500 hover:underline"
                to={User.Account.Page.url()}
              >
                account page
              </Link>
              .
            </p>
            <p>
              Check out the&nbsp;
              <Link
                className="text-indigo-500 hover:underline"
                to={User.Account.Page.url()}
              >
                documentation
              </Link>
              &nbsp;for how to use your model through the API.
            </p>
          </div>
        </div>
      )}
      {percentage < 100 && (
        <div className="text-center">
          <p>We&apos;re fine-tuning your model now.</p>
          <p>
            This usually takes between {minMilliseconds / 1000 / 60} to&nbsp;
            {maxMilliseconds / 1000 / 60} minutes.
          </p>
        </div>
      )}
    </FineTuning.Step>
  );
}

export namespace Training {
  export const start = () => State.use.getState().start();
  export const stop = () => State.use.getState().stop();

  export const useStartedAt = () => State.use(({ startedAt }) => startedAt);
  export const useStoppedAt = () => State.use(({ stoppedAt }) => stoppedAt);

  export const usePercentage = () => {
    const [now, setNow] = useState(new Date());

    const { maxMilliseconds } = FineTuning.Mode.Duration.use() ?? {
      maxMilliseconds: Infinity,
    };

    const startedAt = useStartedAt();
    const stoppedAt = useStoppedAt();

    const elapsedMilliseconds = startedAt
      ? now.valueOf() - startedAt.valueOf()
      : 0;

    const percentageActual = Math.max(
      stoppedAt ? 100 : 0,
      Math.min(
        maxMilliseconds > 0 ? (elapsedMilliseconds / maxMilliseconds) * 100 : 0,
        100
      )
    );

    const percentageDisplayed = stoppedAt
      ? 100
      : Math.min(
          98,
          100 * Math.sqrt(1 - Math.pow(percentageActual / 100 - 1, 2))
        );

    useEffect(() => {
      if (percentageActual === 100) return;
      const interval = setInterval(() => setNow(new Date()), 100);
      return () => clearInterval(interval);
    }, [percentageActual]);

    return percentageDisplayed;
  };
}

type State = {
  startedAt?: Date;
  stoppedAt?: Date;

  start: () => void;
  stop: () => void;
};

namespace State {
  export const use = GlobalState.create<State>((set) => ({
    start: () => set({ startedAt: new Date(), stoppedAt: undefined }),
    stop: () => set({ stoppedAt: new Date() }),
  }));
}
