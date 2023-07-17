import { OpenAPI } from "@stability/sdk";
import { Code } from "~/Sandbox/Code";
import { StylePresets } from "~/Sandbox/StylePresets";
import { TextPrompts } from "~/Sandbox/TextPrompts";

import { Theme } from "~/Theme";
import { User } from "~/User";

import { request } from "./OpenAPI";
import * as Samples from "./Samples";

export type MultiPrompting = {
  setOptions: (options: Record<string, unknown>) => void;
};

export type Prompt = {
  text: string;
  weight: number;
};

export function MultiPrompting({ setOptions }: MultiPrompting) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const [engineID, setEngineID] = useState<string>(
    "stable-diffusion-xl-beta-v2-2-2"
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      text: "A painting of a cat",
      weight: 1,
    },
  ]);

  const [style, setStyle] =
    useState<OpenAPI.TextToImageRequestBody["style_preset"]>("enhance");

  const [cfgScale, setCfgScale] = useState<number>(7);
  const [steps, setSteps] = useState<number>(50);

  const generate = useCallback(async () => {
    if (!apiKey) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await request(
      apiKey,
      engineID,
      prompts,
      style,
      cfgScale,
      steps
    );

    setGenerating(false);
    if (error) {
      outOfCreditsHandler(error);
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [outOfCreditsHandler, apiKey, engineID, style, prompts, cfgScale, steps]);

  useEffect(() => {
    setOptions({
      engineID,
      samples: 1,
      height: 512,
      width: 512,
      steps,
      cfg_scale: cfgScale,
      style_preset: style,
      text_prompts: prompts,
    });
  }, [engineID, style, prompts, cfgScale, steps, setOptions]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Theme.Background
        title="Multi-Prompting"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <Theme.Select
              title="Model"
              value={engineID}
              onChange={(value) => value && setEngineID(value)}
              options={[
                {
                  label: "Stable Diffusion XL",
                  value: "stable-diffusion-xl-beta-v2-2-2",
                },
                {
                  label: "Stable Diffusion 1.5",
                  value: "stable-diffusion-v1-5",
                },
                {
                  label: "Stable Diffusion 2.1",
                  value: "stable-diffusion-512-v2-1",
                },
              ]}
            />
            <Theme.Select
              title="Style"
              value={style}
              onChange={(value) =>
                setStyle(
                  value as OpenAPI.TextToImageRequestBody["style_preset"]
                )
              }
              options={StylePresets.options()}
            />
            <Theme.Input
              number
              title="CFG Scale"
              value={cfgScale}
              onNumberChange={setCfgScale}
            />
            <Theme.Input
              title="Steps"
              number
              value={steps}
              onNumberChange={setSteps}
            />
            <p className="select-none text-xs opacity-75">Prompts</p>
            <div className="-mt-2 flex flex-col gap-3">
              {prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded border border-zinc-300 p-3"
                >
                  <Theme.Textarea
                    key={index}
                    autoFocus
                    color={prompt.weight > 0 ? "positive" : "negative"}
                    title={
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm">Prompt {index + 1}</p>
                        <Theme.Icon.X
                          className="h-4 w-4 cursor-pointer text-neutral-500 duration-100 hover:text-neutral-900"
                          onClick={() =>
                            setPrompts((prompts) =>
                              prompts.filter((_, i) => i !== index)
                            )
                          }
                        />
                      </div>
                    }
                    placeholder="Enter prompt"
                    value={prompt.text}
                    onChange={(value) =>
                      setPrompts((prompts) =>
                        prompts.map((prompt, i) =>
                          i === index ? { ...prompt, text: value } : prompt
                        )
                      )
                    }
                  />
                  <Theme.Range
                    max={1}
                    min={-1}
                    step={0.01}
                    title="Weight"
                    value={prompt.weight}
                    onChange={(value) =>
                      setPrompts((prompts) =>
                        prompts.map((prompt, i) =>
                          i === index ? { ...prompt, weight: value } : prompt
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
            {prompts.length < 10 && (
              <Theme.Button
                variant="secondary"
                className="border border-dashed border-zinc-300"
                onClick={() =>
                  setPrompts((prompts) => [
                    ...prompts,
                    {
                      text: "",
                      weight: 1,
                    },
                  ])
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
            className="relative h-16 rounded-none"
            disabled={generating || !prompts.length || !apiKey}
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
                        ? "rounded border border-red-300 p-3 font-mono text-red-500"
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
