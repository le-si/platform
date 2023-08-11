import { OpenAPI } from "@stability/sdk";
import { Code } from "~/Sandbox/Code";
import { StylePresets } from "~/Sandbox/StylePresets";
import { TextPrompts } from "~/Sandbox/TextPrompts";

import { Theme } from "~/Theme";
import { User } from "~/User";

import { Sandbox } from "..";

import * as Samples from "./Samples";

export type MultiPrompting = {
  input: Sandbox.Input;
  setInput: (input: Sandbox.Input) => void;
  setOptions: (options: Record<string, unknown>) => void;
};

export type Prompt = {
  text: string;
  weight: number;
};

export function MultiPrompting({
  setOptions,
  input,
  setInput,
}: MultiPrompting) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const models = Sandbox.useModels();
  const finetunes = Sandbox.useFinetunes();
  const [error, setError] = useState<string | undefined>(undefined);

  const dims = input.engineID.includes("1024")
    ? 1024
    : input.engineID.includes("768")
    ? 768
    : 512;

  const createImage = Sandbox.useCreateImage();

  const generate = useCallback(async () => {
    if (!apiKey) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await createImage(input);

    setGenerating(false);
    if (error) {
      outOfCreditsHandler(error);
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [apiKey, createImage, input, outOfCreditsHandler]);

  useEffect(() => {
    setOptions({
      engineID: input.engineID,
      samples: 1,
      height: dims,
      width: dims,
      steps: input.steps,
      cfg_scale: input.cfgScale,
      style_preset: input.style,
      text_prompts: input.prompts,
    });
  }, [
    setOptions,
    dims,
    input.engineID,
    input.steps,
    input.cfgScale,
    input.style,
    input.prompts,
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Theme.Background
        title="Multi-Prompting"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <Theme.Select
              title="Model"
              value={input.engineID}
              onChange={(value) => {
                if (!value) return;
                setInput({ ...input, engineID: value });
              }}
              options={models}
            />
            {finetunes.length > 0 && (
              <Theme.Select
                title="Finetune"
                value={input.fineTuneEngine ?? undefined}
                onChange={(value) => {
                  const finetune = finetunes.find((f) => f.value === value);

                  setInput({
                    ...input,
                    fineTuneEngine: value,
                    engineID: finetune?.engine ?? input.engineID,
                  });
                }}
                options={[
                  {
                    label: "None",
                    value: undefined,
                  },
                  ...finetunes,
                ]}
              />
            )}
            {input.fineTuneEngine && (
              <Theme.Range
                title="Finetune Strength"
                max={1}
                min={0}
                step={0.01}
                value={input.loraStrength}
                onChange={(value) =>
                  setInput({ ...input, loraStrength: value })
                }
              />
            )}
            <Theme.Select
              title="Style"
              value={input.style}
              onChange={(value) =>
                setInput({
                  ...input,
                  style:
                    value as OpenAPI.TextToImageRequestBody["style_preset"],
                })
              }
              options={StylePresets.options()}
            />
            <Theme.Input
              number
              title="CFG Scale"
              value={input.cfgScale}
              onNumberChange={(value) =>
                setInput({ ...input, cfgScale: value })
              }
            />
            <Theme.Input
              title="Steps"
              number
              value={input.steps}
              onNumberChange={(value) => setInput({ ...input, steps: value })}
            />
            <p className="select-none text-xs opacity-75">Prompts</p>
            <div className="-mt-2 flex flex-col gap-3">
              {input.prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="bg-brand-amber-1 flex flex-col gap-2 rounded border border-zinc-300 p-3"
                >
                  <Sandbox.PositivePrompt
                    key={index}
                    autoFocus
                    color={(prompt.weight ?? 1) > 0 ? "positive" : "negative"}
                    title={
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm">Prompt {index + 1}</p>
                        {input.prompts.length > 1 && (
                          <Theme.Icon.X
                            className="h-4 w-4 cursor-pointer text-neutral-500 duration-100 hover:text-neutral-900"
                            onClick={() =>
                              setInput({
                                ...input,
                                prompts: input.prompts.filter(
                                  (_, i) => i !== index
                                ),
                              })
                            }
                          />
                        )}
                      </div>
                    }
                    placeholder="Enter prompt"
                    value={prompt.text}
                    className="min-h-[6rem] border-transparent p-0 focus:border-transparent"
                    onChange={(value) =>
                      setInput({
                        ...input,
                        prompts: input.prompts.map((prompt, i) =>
                          i === index ? { ...prompt, text: value } : prompt
                        ),
                      })
                    }
                  />
                  <Theme.Range
                    max={1}
                    min={-1}
                    step={0.01}
                    title="Weight"
                    value={prompt.weight}
                    onChange={(value) =>
                      setInput({
                        ...input,
                        prompts: input.prompts.map((prompt, i) =>
                          i === index ? { ...prompt, weight: value } : prompt
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            {input.prompts.length < 10 && (
              <Theme.Button
                variant="secondary"
                className="w-full border border-dashed border-zinc-300"
                onClick={() =>
                  setInput({
                    ...input,
                    prompts: input.prompts.concat({
                      text: "",
                      weight: 1,
                    }),
                  })
                }
              >
                Add Prompt
              </Theme.Button>
            )}
          </div>
        }
        sidebarBottom={
          <Theme.Button
            variant="primary"
            className="relative h-16 w-full rounded-none"
            disabled={generating || !input.prompts.length || !apiKey}
            onClick={generate}
          >
            Generate
            <Theme.Icon.Spinner
              className={classes(
                "absolute right-[30%] text-white",
                !generating && "hidden"
              )}
            />
          </Theme.Button>
        }
      >
        <div className=" flex h-full grow gap-3 overflow-y-auto overflow-x-hidden">
          <div className="flex grow items-center justify-center">
            {apiKey ? (
              imageURL ? (
                <Theme.ImageContainer
                  src={imageURL}
                  title="Output Image"
                  onClear={() => setImageURL(undefined)}
                />
              ) : (
                <div className="flex w-full shrink-0 flex-col items-center justify-center">
                  <pre
                    className={classes(
                      error
                        ? "whitespace-pre-wrap rounded border border-red-300 p-3 font-mono text-sm text-red-500"
                        : "text-brand-orange select-none font-sans"
                    )}
                  >
                    {generating
                      ? "Generating..."
                      : error
                      ? error
                      : "No image generated"}
                  </pre>
                </div>
              )
            ) : (
              <div className="flex w-full shrink-0 flex-col items-center justify-center">
                <User.Login.CTA />
              </div>
            )}
          </div>
        </div>
      </Theme.Background>
      <div className="flex min-h-0 shrink-0 flex-wrap gap-6">
        <Buttons />
      </div>
    </div>
  );
}

export function Buttons() {
  return (
    <>
      <Theme.Button link="/docs/features/multi-prompting" variant="secondary">
        View Documentation
      </Theme.Button>
      <Theme.Button
        link="https://github.com/Stability-AI/platform/blob/main/packages/app/src/Sandbox/MultiPrompting/index.tsx"
        variant="secondary"
      >
        View on GitHub
      </Theme.Button>
    </>
  );
}

MultiPrompting.Samples = Samples;
MultiPrompting.Buttons = Buttons;
MultiPrompting.formatOptions = (
  options: Record<string, unknown>,
  codeLanguage: Code.Language
) => {
  const formatKey = (key: string) =>
    codeLanguage === "python" ? `  "${key}": ` : `\t${key}: `;

  return Object.entries(options)
    .reduce((acc, [key, value]) => {
      if (value === undefined) return acc;

      if (typeof value === "string") {
        value = `"${value}"`;
      } else if (typeof value === "number") {
        value = `${value}`;
      }

      if (key === "text_prompts") {
        return acc.concat(
          formatKey(key),
          TextPrompts.toJSON(value, codeLanguage),
          ",\n"
        );
      }

      return acc.concat(formatKey(key), `${value},\n`);
    }, "")
    .trim();
};
