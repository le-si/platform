import { OpenAPI } from "@stability/sdk";
import { GRPC as Proto } from "@stability/sdk";
import { useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";

import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";
import { Theme } from "~/Theme";

import { Code } from "./Code";
import { List } from "./List";

export function Sandbox<T extends Record<string, unknown>>({
  SandboxComponent,
  samples,
}: {
  SandboxComponent: React.FC<{
    input: Sandbox.Input;
    setInput: (input: Sandbox.Input) => void;
    setOptions: (options: T) => void;
  }> & {
    formatOptions: (
      options: Omit<T, "engineID">,
      language: Code.Language
    ) => string;
  };
  samples: Record<Code.Language, string>;
}) {
  const [showCode, setShowCode] = useState(true);
  const [codeLanguage, setCodeLanguage] = useState<Code.Language>("javascript");
  const [options, setOptions] = useState<T>({} as T);
  const [input, setInput] = useState<Sandbox.Input>({
    engineID: "stable-diffusion-xl-1024-v1-0",
    prompts: [
      {
        text: "A painting of a cat",
        weight: 1,
      },
      {
        text: "blurry, bad",
        weight: -1,
      },
    ],
    cfgScale: 5,
    steps: 40,
    seed: 0,
    fineTuneEngine: undefined,
    initImage: undefined,
    initStrength: 0.35,
    loraStrength: 1,
    style: undefined,
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const engineID = params.get("engine-id");
    if (engineID) setInput({ ...input, engineID });

    const fineTune = params.get("fine-tune");
    if (fineTune)
      setInput({
        ...input,
        fineTuneEngine: fineTune,
        prompts: [
          {
            text: `A photo of <${fineTune}>`,
            weight: 1,
          },
          {
            text: "blurry, bad",
            weight: -1,
          },
        ],
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const code = useMemo(() => {
    const hasActiveOption = Object.entries(options).find(
      ([_, value]) => value !== undefined
    );

    if (!hasActiveOption) return undefined;
    return samples[codeLanguage]
      .trim()
      .replace("{apiKey}", "YOUR_API_KEY")
      .replace("{engineID}", options.engineID as string)
      .replace(
        "{OPTIONS}",
        SandboxComponent.formatOptions(omitEngineID<T>(options), codeLanguage)
      );
  }, [options, samples, codeLanguage, SandboxComponent]);

  const size = useWindowSize();

  return (
    <div className="flex h-full max-h-full min-h-0 grow flex-col gap-6 p-5 pt-0">
      <div className="flex min-h-0 grow gap-6">
        {size.width > 1024 &&
          (showCode && code ? (
            <Code
              code={code}
              language={codeLanguage}
              setLanguage={setCodeLanguage}
              onClose={() => setShowCode(false)}
              redirect={
                input.fineTuneEngine ? "/docs/features/fine-tuning" : undefined
              }
              redirectReason={
                input.fineTuneEngine
                  ? "Inference of fine-tuned models is not available in the REST api"
                  : undefined
              }
            />
          ) : (
            <div
              className="flex w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-zinc-400 text-center text-xs transition-colors duration-100 hover:bg-zinc-100"
              onClick={() => setShowCode(true)}
            >
              <Theme.Icon.Code />
              View Code
            </div>
          ))}
        <SandboxComponent
          input={input}
          setInput={setInput}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
}

function omitEngineID<T extends Record<string, unknown>>(
  options: T
): Omit<T, "engineID"> {
  const { engineID: _engineID, ...rest } = options;
  return rest;
}

export declare namespace Sandbox {
  export { List };
}

export namespace Sandbox {
  Sandbox.List = List;

  export type Input = {
    engineID: string;
    prompts: OpenAPI.TextToImageRequestBody["text_prompts"];
    style?: OpenAPI.TextToImageRequestBody["style_preset"];
    cfgScale?: OpenAPI.TextToImageRequestBody["cfg_scale"];
    seed?: OpenAPI.TextToImageRequestBody["seed"];
    steps?: OpenAPI.TextToImageRequestBody["steps"];
    fineTuneEngine?: string;
    initStrength?: OpenAPI.ImageToImageRequestBody["image_strength"];
    initImage?: Blob;
    loraStrength?: number;
  };

  export const useModels = () => [
    {
      label: "Stable Diffusion XL 1.0",
      value: "stable-diffusion-xl-1024-v1-0",
      engine: null,
    },
    {
      label: "Stable Diffusion XL 0.9",
      value: "stable-diffusion-xl-1024-v0-9",
      engine: null,
    },
    {
      label: "Stable Diffusion 1.5",
      value: "stable-diffusion-v1-5",
      engine: null,
    },
    {
      label: "Stable Diffusion 2.1",
      value: "stable-diffusion-512-v2-1",
      engine: null,
    },
  ];

  export const useFineTunes = () => {
    const fineTunedModels = FineTuning.Models.use();

    return (
      Object.values(fineTunedModels.data ?? {})
        .filter((model) => model.status === "Completed")
        .map((model) => ({
          label: model.name,
          engine: model.engineID ?? "stable-diffusion-xl-1024-v1-0",
          value: model.id,
        })) ?? []
    );
  };

  export function PositivePrompt(props: Theme.Textarea & { fineTune?: ID }) {
    const needsToken =
      props.fineTune && !props.value?.includes(`<${props.fineTune}>`);

    return (
      <div className="flex flex-col gap-2">
        <Theme.Textarea
          autoFocus
          color="positive"
          title="Positive Prompt"
          placeholder="Description of what you want to generate"
          {...props}
          className={classes(
            needsToken &&
              "ring-1 ring-amber-700 focus:outline-none focus:outline-transparent",
            props.className
          )}
        />
        {needsToken && (
          <div className="flex items-center gap-1">
            <Theme.Icon.AlertTriangle className="h-4 w-4 text-amber-700" />
            <p className="select-none text-xs text-amber-700">
              Prompt is missing the fine-tune token.&nbsp;
              <span
                onClick={() =>
                  props.onChange?.(`${props.value} <${props.fineTune}>`)
                }
                className="cursor-pointer font-semibold hover:text-amber-800 hover:underline"
              >
                Add it.
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  export const useCreateImage = () => {
    const grpc = GRPC.use();

    return useCallback(
      async ({
        engineID,
        prompts,
        style,
        cfgScale,
        seed,
        steps,
        fineTuneEngine,
        initStrength,
        initImage,
        loraStrength,
      }: Sandbox.Input): Promise<[string | undefined, Error | undefined]> => {
        const dims = engineID.includes("1024")
          ? 1024
          : engineID.includes("768")
          ? 768
          : 512;

        const prompt =
          prompts
            ?.filter((prompt) => prompt.text)
            .map(({ text, weight }) =>
              Proto.Prompt.create({
                prompt: { oneofKind: "text", text },
                parameters: { weight },
              })
            ) ?? [];

        if (initImage) {
          prompt.push(
            Proto.Prompt.create({
              parameters: { init: true, weight: initStrength ?? 0.35 },
              prompt: {
                oneofKind: "artifact",
                artifact: Proto.Artifact.create({
                  type: Proto.ArtifactType.ARTIFACT_IMAGE,
                  mime: "image/png",
                  data: {
                    oneofKind: "binary",
                    binary: new Uint8Array(await initImage.arrayBuffer()),
                  },
                }),
              },
            })
          );
        }

        const imageParams = Proto.ImageParameters.create({
          width: BigInt(dims),
          height: BigInt(dims),

          steps: BigInt(steps ?? 50),
          samples: BigInt(1),
          seed: [seed ?? 0],

          transform: Proto.TransformType.create({
            type: {
              oneofKind: "diffusion",
              diffusion: 0,
            },
          }),

          ...(fineTuneEngine && {
            fineTuningParameters: [
              Proto.FineTuningParameters.create({
                modelId: fineTuneEngine,
                weight: loraStrength ?? 1,
              }),
            ],
          }),

          parameters: [
            Proto.StepParameter.create({
              sampler: Proto.SamplerParameters.create({
                cfgScale: cfgScale,
              }),

              scaledStep: 0,
              schedule: Proto.ScheduleParameters.create({
                start: initImage ? 1 - (initStrength ?? 0) : 1,
              }),
            }),
          ],
        });

        const extras = style && {
          extras: Proto.Struct.fromJson({
            $IPC: {
              preset: style,
              ...(engineID.includes("-xl-") && { sdxl_size: [4096, 4096] }),
            },
          }),
        };

        const request = grpc?.generation.generate(
          spy(
            Proto.Request.create({
              prompt,

              engineId: engineID,
              requestedType: Proto.ArtifactType.ARTIFACT_IMAGE,
              params: { oneofKind: "image", image: imageParams },

              ...extras,
            })
          )
        );

        if (!request) return [undefined, new Error("GRPC not initialized")];

        console.log("request", request);

        for await (const response of request.responses) {
          for (const artifact of response.artifacts) {
            if (
              artifact.type === Proto.ArtifactType.ARTIFACT_TEXT &&
              artifact.finishReason === Proto.FinishReason.FILTER
            )
              return [undefined, new Error("banned word detected")];

            if (
              artifact.type === Proto.ArtifactType.ARTIFACT_IMAGE &&
              artifact.data.oneofKind === "binary"
            ) {
              const image = new Blob([artifact.data.binary]);
              const url = URL.createObjectURL(image);

              return [url, undefined];
            }
          }
        }

        return [undefined, new Error("GRPC request failed")];
      },
      [grpc]
    );
  };
}
