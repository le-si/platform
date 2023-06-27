type State = {
  width: number;
  height: number;
  steps: number;
};

const MODELS = [
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
  },
  {
    name: "Stable Diffusion XL 0.9",
    id: `stable-diffusion-xl-1024-v0-9`,
    description: `Consists of a two-step pipeline for latent diffusion: First, we use a base model to generate latents of the desired output size. In the second step, we use a specialized high-resolution model and apply a technique called SDEdit (https://arxiv.org/abs/2108.01073, also known as "img2img") to the latents generated in the first step, using the same prompt.`,
    modality: "image",
    formula: (state: State): number =>
      (((state.width * state.height - 169527) * state.steps) / 30) *
      5.4e-8 *
      100,
    formulaStylized: "((width * height - 169527) * steps / 30) * 5.4e-8 * 100",
  },
  {
    name: "Stable Diffusion x4 Latent Upscaler",
    id: `stable-diffusion-x4-latent-upscaler`,
    description: `Trained for 1.25M steps on a 10M subset of LAION containing images >2048x2048. The model was trained on crops of size 512x512 and is a text-guided latent upscaling diffusion model. In addition to the textual input, it receives a noise_level as an input parameter, which can be used to add noise to the low-resolution input according to a predefined diffusion schedule.`,
    modality: "upscaling",
    formula: (_state: State): number => 0.2,
    formulaStylized: "0.2",
  },
  {
    name: "Real-ESRGAN x2",
    id: `esrgan-v1-x2plus`,
    description: `An upgraded ESRGAN trained with pure synthetic data is capable of enhancing details while removing annoying artifacts for common real-world images.`,
    modality: "upscaling",
    formula: (_state: State): number => 0.2,
    formulaStylized: "0.2",
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
    <div className="flex flex-col justify-between gap-8 border-b border-zinc-100 pb-12 last:border-transparent last:pb-0 md:flex-row md:gap-2">
      <div className="flex flex-col justify-between gap-3 md:w-1/2">
        <Code className="bg-transparent p-0 text-sm">{model.id}</Code>
        <h4 className="text-3xl font-light">{model.name}</h4>
        <p className="text-base font-light">{model.description}</p>
      </div>
      <div className="flex w-fit flex-col gap-1 md:items-end">
        <Code>{model.formulaStylized}</Code>
        <h5 className="text-base font-light opacity-70">Pricing formula</h5>

        {/* TODO: little pricing examples */}
      </div>
    </div>
  );
}

function ModelList({
  category,
}: {
  category: "image" | "video" | "audio" | "text" | "upscaling";
}) {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="sticky top-16 z-10 border-b border-zinc-300 bg-white py-4 text-4xl font-light">
        {category.replace(/^\w/, (c) => c.toUpperCase())}
      </h2>
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
      <div className="mt-24 flex w-full flex-col items-center gap-4">
        <img src="/svg/sai-header.svg" />
        <h1 className="mt-2 text-center text-5xl font-extralight">
          Platform Pricing
        </h1>
        <h2 className="text-lg font-light">
          Open-Source Power, Priced for Everyone.
        </h2>
      </div>

      <ModelList category="image" />
      <ModelList category="upscaling" />
    </div>
  );
}
