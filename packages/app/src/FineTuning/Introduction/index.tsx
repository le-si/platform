import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

import { HeroBanner } from "./HeroBanner";

export function Introduction() {
  return (
    <FineTuning.Step className="max-w-[80rem]">
      <HeroBanner className="aspect-[680/211] w-full" />
      <Introduction.Section>
        <FineTuning.H1>Fine-tune your own model</FineTuning.H1>
        <div>
          Get more creative control over your generations by fine-tuning a model
          on a style, face or object
        </div>
      </Introduction.Section>
      <FineTuning.Card className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <Introduction.Section>
            <FineTuning.H2>Instructions</FineTuning.H2>
            <Introduction.List>
              <Introduction.List.Item>
                You will need to upload 4-128 images in varying angles or styles
                examples for the best fine-tune result
              </Introduction.List.Item>
              <Introduction.List.Item>
                Please accept and acknowledge the risks before continuing that
                process we use to fine-tune a model may generate artifacts,
                inaccuracies and defects
              </Introduction.List.Item>
            </Introduction.List>
          </Introduction.Section>
          <Introduction.Section>
            <FineTuning.H2>Overview</FineTuning.H2>
            <Introduction.List>
              <Introduction.List.Item>
                This fine-tune will be created from the most up-to-date Stable
                Diffusion model
              </Introduction.List.Item>
              <Introduction.List.Item>
                The fine-tune model will be hosted by us and have access to our
                super fast GPUs. For now, you won&apos;t be able to download the
                model
              </Introduction.List.Item>
            </Introduction.List>
          </Introduction.Section>
        </div>
        <div className="flex justify-center">
          <Theme.Button
            className="text-base"
            variant="primary"
            onClick={FineTuning.Steps.next}
          >
            <div className="mx-2 flex items-center gap-2">
              Get Started <ArrowRight />
            </div>
          </Theme.Button>
        </div>
      </FineTuning.Card>
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
    return <div className="flex grow basis-0 flex-col gap-8">{children}</div>;
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
}
