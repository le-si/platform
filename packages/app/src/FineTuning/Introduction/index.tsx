import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";
import { User } from "~/User";

import { HeroBanner } from "./HeroBanner";

const ACCEPTABLE_KEY_DATE = new Date("2023-08-08T00:00:00.000Z");

export function Introduction() {
  const { user } = User.use();
  const [showLegal, setShowLegal] = React.useState(false);

  useEffect(() => {
    if (
      showLegal &&
      user?.apiKeys?.some((apiKey) => apiKey.created > ACCEPTABLE_KEY_DATE)
    ) {
      FineTuning.Steps.next();
    }
  }, [showLegal, user?.apiKeys]);

  return (
    <FineTuning.Step className="max-w-[80rem]">
      {showLegal ? (
        <FineTuning.Legal />
      ) : (
        <>
          <div className="5xl:max-h-none flex max-h-[10rem] items-center justify-center overflow-hidden rounded-2xl">
            <HeroBanner className="aspect-[680/211] w-full" />
          </div>
          <Introduction.Section>
            <FineTuning.H1>Fine-tune your own model</FineTuning.H1>
            <p>
              Get more creative control over your generations by fine-tuning a
              model on a style, face or object
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Introduction.Pill>Stable Diffusion XL 1.0</Introduction.Pill>
              <Introduction.Pill>4 - 128 images</Introduction.Pill>
            </div>
          </Introduction.Section>
          <Introduction.Section>
            <p className="max-w-[50rem] text-sm opacity-75">
              Please accept and acknowledge the risks before continuing that
              process we use to fine-tune a model may generate artifacts,
              inaccuracies and defects
            </p>
            <div className="mt-2">
              <Theme.Button
                className="text-base"
                variant="primary"
                onClick={() => setShowLegal(true)}
              >
                <div className="mx-2 flex items-center gap-2">
                  Get Started <ArrowRight />
                </div>
              </Theme.Button>
            </div>
          </Introduction.Section>
        </>
      )}
    </FineTuning.Step>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.75 11L12.75 6L7.75 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.25 6L1.25 6" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

export namespace Introduction {
  export function Section({ children }: React.PropsWithChildren) {
    return <div className="flex grow basis-0 flex-col gap-3">{children}</div>;
  }

  export function List({ children }: React.PropsWithChildren) {
    return <ul className="flex flex-col gap-6">{children}</ul>;
  }

  export namespace List {
    export function Item({ children }: React.PropsWithChildren) {
      return (
        <li className="flex">
          <div className="opacity-muted-extra mr-4 mt-2 h-4 w-4 shrink-0 rounded-full bg-black" />
          <div>{children}</div>
        </li>
      );
    }
  }

  export function Pill({ children }: React.PropsWithChildren) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-xs">
        {children}
      </div>
    );
  }
}
