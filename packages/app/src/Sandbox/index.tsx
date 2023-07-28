import { OpenAPI } from "@stability/sdk";
import { GRPC as Proto } from "@stability/sdk";
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
        <SandboxComponent setOptions={setOptions} />
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

  export const useModels = () => {
    const finetunedModels = FineTuning.Models.use();

    return [
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
      ...(Object.values(finetunedModels.data ?? {}).map((model) => ({
        label: model.name,
        engine: model.engineID ?? "stable-diffusion-xl-1024-v1-0",
        value: model.id,
      })) ?? []),
    ];
  };

  export const useCreateImage = () => {
    const grpc = GRPC.use();

    return useCallback(
      async (
        engineID: string,
        prompts: OpenAPI.TextToImageRequestBody["text_prompts"],
        style?: OpenAPI.TextToImageRequestBody["style_preset"],
        cfgScale?: OpenAPI.TextToImageRequestBody["cfg_scale"],
        seed?: OpenAPI.TextToImageRequestBody["seed"],
        steps?: OpenAPI.TextToImageRequestBody["steps"],
        fineTuneEngine?: string,
        initStrength?: OpenAPI.ImageToImageRequestBody["image_strength"],
        initImage?: Blob
      ): Promise<[string | undefined, Error | undefined]> => {
        // in the case of a finetuned model being used, the engineID is the finetuned model ID & the fineTuneEngine is the base model ID
        [engineID, fineTuneEngine] = fineTuneEngine
          ? [fineTuneEngine, engineID]
          : [engineID, undefined];

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
                weight: 1,
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
            },
          }),
        };

        const request = grpc?.generation.chainGenerate(
          spy({
            requestId: "",
            stage: [
              {
                id: "Main",

                request: Proto.Request.create({
                  prompt,

                  engineId: engineID,
                  requestedType: Proto.ArtifactType.ARTIFACT_IMAGE,
                  params: { oneofKind: "image", image: imageParams },

                  ...extras,
                }),

                onStatus: [{ action: [Proto.StageAction.RETURN], reason: [] }],
              },
            ],
          })
        );

        if (!request) return [undefined, new Error("GRPC not initialized")];

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
