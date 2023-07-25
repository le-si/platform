import { FineTuning } from "~/FineTuning";

export function Progress() {
  const percentage = FineTuning.Training.usePercentage();
  return (
    <div className="flex w-full grow items-center px-8">
      <div className="relative h-2 flex-grow overflow-hidden rounded-full">
        <div
          className="h-full min-w-[0.5em] rounded-full"
          style={{ width: `${percentage}%` }}
          css={styles()}
        />
        <div
          className="absolute bottom-0 left-0 right-0 top-0 opacity-10"
          css={styles()}
        />
      </div>
    </div>
  );
}

const animation = keyframes`
  0% {
    background-position: -1000px;
  }

  100% {
    background-position: 1000px;
  }
`;

const styles = () => css`
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

  animation: ${animation} 10s linear infinite;
`;
