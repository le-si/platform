import { FineTuning } from "~/FineTuning";

export namespace Steps {
  export const use = () => {
    const [stepIndex, setStepIndex] = useState(1);

    const onNextStep = useCallback(
      () => setStepIndex((stepIndex) => stepIndex + 1),
      []
    );

    const onPreviousStep = useCallback(
      () => setStepIndex((stepIndex) => Math.max(0, stepIndex - 1)),
      []
    );

    const steps = useMemo(
      () => [
        <FineTuning.Introduction key="1" onGetStarted={onNextStep} />,
        <FineTuning.Modes key="2" onModeSelected={onNextStep} />,
        "3",
        "4",
        "5",
      ],
      [onNextStep]
    );

    const step = useMemo(() => steps[stepIndex], [stepIndex, steps]);

    return {
      step,
      steps,
      stepIndex,
      onNextStep,
      onPreviousStep,
    };
  };
}
