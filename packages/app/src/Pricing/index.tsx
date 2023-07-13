import { Link } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";
import { Theme } from "~/Theme";

type State = {
  width: number;
  height: number;
  steps: number;
};

const MODELS = [
  {
    name: "Stable Diffusion XL 0.9",
    id: `stable-diffusion-xl-1024-v0-9`,
    description: `Consists of a two-step pipeline for latent diffusion: First, we use a base model to generate latents of the desired output size. In the second step, we use a specialized high-resolution model and apply a technique called SDEdit (https://arxiv.org/abs/2108.01073, also known as "img2img") to the latents generated in the first step, using the same prompt.`,
    modality: "image",
    formula: (state: State): number =>
      100 *
      (state.steps === 30
        ? 0.016
        : state.steps === 50
        ? 0.02
        : 0.0122 +
          0.000127 * state.steps +
          0.000000623 * state.steps * state.steps),
    formulaStylized:
      "100 * (steps === 30 ? 0.016 : steps === 50 ? 0.02 : 0.0122 + 0.000127 * steps + 0.000000623 * steps * steps)",
    variables: [
      {
        name: "steps",
        description: "Number of steps to run the model for",
        type: "number",
        min: 10,
        max: 150,
      },
    ],
    static: false,
  },
  {
    name: "Stable Diffusion 1.5",
    id: `stable-diffusion-v1.5`,
    description: `Initialized with the weights of the Stable-Diffusion-v1-2 checkpoint and subsequently fine-tuned on 595k steps at resolution 512x512 on "laion-aesthetics v2 5+" and 10% dropping of the text-conditioning to improve classifier-free guidance sampling.`,
    modality: "image",
    formula: (state: State): number =>
      (((state.width * state.height - 169527) * state.steps) / 30) *
      2.16e-8 *
      100,
    formulaStylized: "((width * height - 169527) * steps / 30) * 2.16e-8 * 100",
    variables: [
      {
        name: "width",
        description: "Width of the image in pixels",
        type: "number",
        min: 512,
        max: 1024,
        step: 1,
      },
      {
        name: "height",
        description: "Height of the image in pixels",
        type: "number",
        min: 512,
        max: 1024,
        step: 1,
      },
      {
        name: "steps",
        description: "Number of steps to run the model for",
        type: "number",
        min: 10,
        max: 150,
      },
    ],
    static: false,
  },
  {
    name: "Stable Diffusion 2.1",
    id: `stable-diffusion-512-v2-1`,
    description: `Fine-tuned from Stable Diffusion 2.0 (768-v-ema.ckpt) with an additional 55k steps on the same dataset (with punsafe=0.1), and then fine-tuned for another 155k extra steps with punsafe=0.98.`,
    modality: "image",
    formula: (state: State): number =>
      (((state.width * state.height - 169527) * state.steps) / 30) *
      2.16e-8 *
      100,
    formulaStylized: "((width * height - 169527) * steps / 30) * 2.16e-8 * 100",
    variables: [
      {
        name: "width",
        description: "Width of the image in pixels",
        type: "number",
        min: 512,
        max: 1024,
        step: 1,
      },
      {
        name: "height",
        description: "Height of the image in pixels",
        type: "number",
        min: 512,
        max: 1024,
        step: 1,
      },
      {
        name: "steps",
        description: "Number of steps to run the model for",
        type: "number",
        min: 10,
        max: 150,
      },
    ],
    static: false,
  },
  {
    name: "Stable Diffusion x4 Latent Upscaler",
    id: `stable-diffusion-x4-latent-upscaler`,
    description: `Trained for 1.25M steps on a 10M subset of LAION containing images >2048x2048. The model was trained on crops of size 512x512 and is a text-guided latent upscaling diffusion model. In addition to the textual input, it receives a noise_level as an input parameter, which can be used to add noise to the low-resolution input according to a predefined diffusion schedule.`,
    modality: "upscaling",
    formula: (state: State): number =>
      state.width * state.height > 512 * 512 ? 12 : 8,
    formulaStylized: "(width * height) > 512 * 512 ? 12 : 8",
    variables: [
      {
        name: "width",
        description: "Width of the image in pixels",
        type: "number",
        min: 256,
        max: 1024,
      },
      {
        name: "height",
        description: "Height of the image in pixels",
        type: "number",
        min: 256,
        max: 1024,
      },
    ],
  },
  {
    name: "Real-ESRGAN x2",
    id: `esrgan-v1-x2plus`,
    description: `An upgraded ESRGAN trained with pure synthetic data is capable of enhancing details while removing annoying artifacts for common real-world images.`,
    modality: "upscaling",
    formula: (_state: State): number => 0.2,
    formulaStylized: "0.2",
    variables: [],
    static: true,
  },
];

function Code({ children, className }: StyleableWithChildren) {
  return (
    <code
      className={classes(
        "bg-brand-amber-1 h-fit w-fit rounded-md px-1.5 py-0.5 font-mono font-light",
        className
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // select the text inside the code element
        const range = document.createRange();
        range.selectNodeContents(e.target as Node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }}
    >
      {children}
    </code>
  );
}

function Model({ model }: { model: (typeof MODELS)[number] }) {
  return (
    <div className="grid justify-between gap-2 border-t border-zinc-300 pt-12 last:pb-0 sm:grid-cols-2 md:flex-row md:gap-2">
      <div className="flex flex-col gap-3">
        <h4 className="text-3xl font-light">{model.name}</h4>
        <Code className="border border-zinc-200 text-sm">{model.id}</Code>
      </div>
      <div className="flex flex-col gap-8 md:items-end">
        <p className="text-lg">{model.description}</p>
        <hr className="border-px w-full border-zinc-100" />
        <Pricing.Widget model={model} />
      </div>
    </div>
  );
}

function ModelList({
  category,
  image,
  description,
}: {
  category: "image" | "video" | "audio" | "text" | "upscaling";
  image: string;
  description: string;
}) {
  return (
    <div className="mb-24 flex flex-col gap-12">
      <div className="grid justify-between gap-2 border-t border-zinc-500 bg-white py-4 sm:grid-cols-2">
        <div>
          <img className="h-80 rounded-3xl" src={image} alt={category} />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="w-full text-left text-5xl font-extralight">
            {category.replace(/^\w/, (c) => c.toUpperCase())}
          </h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {MODELS.filter((model) => model.modality === category).map((model) => (
          <Model key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <div className="mx-auto mb-24 flex min-h-screen flex-col gap-32 px-5 2xl:max-w-[93rem] 2xl:px-0">
      <div className="flex flex-col gap-6">
        <div className="bg-brand-amber-1 relative mt-6 flex w-full flex-col items-center gap-4 rounded-3xl py-32">
          <img src="/svg/pricing-header.svg" alt="header" />
          <h1 className="mt-2 text-center text-5xl font-extralight">Pricing</h1>
          <h2 className="text-lg font-light">
            Open-Source Power, Priced for Everyone.
          </h2>
          <img
            className="absolute bottom-0 right-0 w-[40%]"
            src="/pricing-banner.webp"
            alt="header"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-brand-amber-1 flex flex-col gap-3 rounded-3xl p-6">
            <h2 className="text-2xl">How does pricing work?</h2>
            <p>
              To start using our APIs you will need need to purchase credits. 25
              free credits are issued to all new signups to allow a limited
              trial of our platform before committing to a purchase.
              <br />
              <br /> A credit is a unit of currency expended while using our
              APIs. Credit usage scales according to the compute required to
              complete your request.
            </p>
          </div>
          <div className="bg-brand-amber-1 flex flex-col gap-3 rounded-3xl p-6">
            <h2 className="text-2xl">Buying Credits</h2>
            <p>
              After depleting your free credits, additional credits can be
              purchased via the{" "}
              <span>
                <Link
                  className="prose text-indigo-500 hover:underline"
                  to="/account/billing"
                >
                  account page
                </Link>
              </span>
              .
              <br />
              <br />
              Credit purchases are currently a pay-as-you-go type system.
              Credits can be purchased via the account page, starting with a
              minimum purchase amount of $10 for 1000 credits.
            </p>
          </div>
        </div>
      </div>
      <ModelList
        category="image"
        image="/image-pricing.webp"
        description="Start using our generative image models like Stable Diffusion within your apps to create and edit images and artwork. We offer a range of image generation models, with different price points."
      />
      <ModelList
        category="upscaling"
        image="/upscaling-pricing.webp"
        description="Increase the size of your images by 4x using our Latent Upscaler or by 2x via ESRGAN."
      />
    </div>
  );
}

export namespace Pricing {
  export const url = () => "/pricing" as const;

  export const searchCandidate = (): GlobalSearch.Candidate => ({
    route: Pricing.url(),
    name: "Pricing",
    content:
      "Model pricing, image pricing, price-per-image, price calculator, Stable Diffusion 1.5, Stable Diffusion 2.1, Stable Diffusion XL 0.9, Stable Diffusion x4 Latent Upscaler, Real-ESRGAN x2",
  });

  export function Widget({ model }: { model: (typeof MODELS)[number] }) {
    const [state, setState] = React.useState<State>({
      width: 512,
      height: 512,
      steps: 50,
    });
    const [revealCalculator, setRevealCalculator] = React.useState(false);

    const price = model.formula(state);

    return (
      <div className="flex w-full flex-col gap-6">
        <p>Credit Calculator</p>
        {model.variables.length > 0 && (
          <div className="flex flex-wrap justify-start gap-3">
            {model.variables.map((variable) => (
              <Theme.Input
                key={variable.name}
                number={variable.type === "number"}
                title={variable.name}
                value={
                  state[variable.name as keyof typeof state] ?? variable.min
                }
                onChange={(value) =>
                  variable.type !== "number" &&
                  setState({ ...state, [variable.name]: value })
                }
                onNumberChange={(value) =>
                  variable.type === "number" &&
                  value >= variable.min &&
                  value <= variable.max &&
                  setState({ ...state, [variable.name]: value })
                }
              />
            ))}
          </div>
        )}
        <div className="flex flex-col gap-1 rounded-xl bg-zinc-100 p-3">
          <p className="text-sm">Credit Cost</p>
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              <Theme.Icon.Token className="-mr-1 h-5 w-5 text-black" />
              <span className="text-xl font-bold">{price.toFixed(2)}</span>
              <p className="text-sm italic opacity-50">
                ${(price / 100).toFixed(3)}
              </p>
            </div>
            {false && !model.static && (
              <button
                onClick={() => setRevealCalculator(!revealCalculator)}
                className="flex gap-1 text-sm opacity-80 hover:opacity-100"
              >
                {revealCalculator ? "Hide" : "Show"} Calculation{" "}
                <Theme.Icon.ChevronRight
                  className={classes(
                    "h-5 w-5 duration-100",
                    revealCalculator ? "rotate-180 transform" : ""
                  )}
                />
              </button>
            )}
          </div>
          {false && revealCalculator && (
            <p className="mt-6 flex items-center gap-2 font-mono">
              <Code className="bg-transparent p-0 text-xs opacity-75">
                {model.formulaStylized}
              </Code>
            </p>
          )}
        </div>
        {model.static && (
          <p className="text-sm italic opacity-75">
            Credit cost is static for this model.
          </p>
        )}
      </div>
    );
  }
}
