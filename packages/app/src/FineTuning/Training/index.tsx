import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";
import { User } from "~/User";

import queueAnim from "./QueueAnimation.json";
import trainAnim from "./TrainingAnimation.json";

export function Training() {
  const { isError, data: model } = FineTuning.Model.Create.use();

  const status = FineTuning.Model.use(model?.id)?.status;
  const percentage = Training.usePercentage();

  useEffect(() => {
    status === "Running" && !State.use.getState().startedAt && Training.start();
  }, [status]);

  useEffect(() => {
    (status === "Completed" || status === "Failed") && Training.stop();
  }, [status]);

  useEffect(() => {
    if (!isError) return;
    Training.stop();
    FineTuning.Steps.previous();
  }, [isError]);

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
      {!status || ["Submitted", "Not Started"].includes(status) ? (
        <div className="flex flex-col items-center gap-8">
          <FineTuning.H1 className="flex items-center justify-center gap-2">
            Queued
          </FineTuning.H1>
          <Lottie animationData={queueAnim} />
          <p className="text-center">
            Your model is in the queue and will start training shortly.
          </p>

          <div className="text-center text-black/50">
            <p>
              You can manage your model on the&nbsp;
              <Link
                className="text-indigo-500 hover:underline"
                to={User.FineTuning.url()}
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
      ) : percentage < 100 ? (
        <>
          <FineTuning.H1 className="flex items-center gap-1">
            Training
          </FineTuning.H1>
          <Lottie animationData={trainAnim} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <Theme.Icon.Check className="-mb-3 h-16 w-16 text-green-500" />
          <FineTuning.H1 className="flex items-center justify-center gap-2">
            Training Complete
          </FineTuning.H1>
          <div className="flex justify-center gap-4">
            <Theme.Button
              variant="tertiary"
              className="px-4"
              onClick={FineTuning.Steps.reset}
            >
              New Model
            </Theme.Button>
            <Theme.Button
              variant="primary"
              className="px-4"
              link={`/sandbox/text-to-image?fine-tune=${model?.id}`}
              noLinkIcon
            >
              Try it Out
              <FineTuning.ArrowRight className="ml-2" />
            </Theme.Button>
          </div>

          <div className="text-center text-black/50">
            <p>
              You can manage your model on the&nbsp;
              <Link
                className="text-indigo-500 hover:underline"
                to={User.FineTuning.url()}
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
      {percentage < 100 && status === "Running" && (
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
