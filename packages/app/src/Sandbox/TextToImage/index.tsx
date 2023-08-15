import { OpenAPI } from "@stability/sdk";
import { Code } from "~/Sandbox/Code";
import { StylePresets } from "~/Sandbox/StylePresets";
import { TextPrompts } from "~/Sandbox/TextPrompts";

import {
  Background,
  Button,
  ImageContainer,
  Input,
  Select,
  Textarea,
  Theme,
} from "~/Theme";

import { User } from "~/User";

import { Sandbox } from "..";

import * as Samples from "./Samples";

export type TextToImage = {
  input: Sandbox.Input;
  setInput: (input: Sandbox.Input) => void;
  setOptions: (options: Record<string, unknown>) => void;
};

export function TextToImage({ setOptions, input, setInput }: TextToImage) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const models = Sandbox.useModels();
  const fineTunes = Sandbox.useFineTunes();
  const [error, setError] = useState<string | undefined>(undefined);

  const positivePrompt = input.prompts[0]?.text ?? "";
  const negativePrompt = input.prompts[1]?.text ?? "";
  const setPositivePrompt = (value: string) =>
    setInput({
      ...input,
      prompts: [
        {
          text: value,
          weight: 1,
        },
        {
          text: negativePrompt,
          weight: -1,
        },
      ],
    });

  const setNegativePrompt = (value: string) =>
    setInput({
      ...input,
      prompts: [
        {
          text: positivePrompt,
          weight: 1,
        },
        {
          text: value,
          weight: -1,
        },
      ],
    });

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
      steps: input.steps,
      width: dims,
      height: dims,
      seed: input.seed,
      cfg_scale: input.cfgScale,
      samples: 1,
      style_preset: input.style,
      text_prompts: input.prompts,
    });
  }, [
    setOptions,
    dims,
    input.engineID,
    input.steps,
    input.seed,
    input.cfgScale,
    input.style,
    input.prompts,
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Background
        title="Text-to-Image"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <Sandbox.PositivePrompt
              value={positivePrompt}
              onChange={setPositivePrompt}
              fineTune={input.fineTuneEngine}
            />
            <Textarea
              color="negative"
              title="Negative Prompt"
              placeholder="What you want to avoid generating"
              value={negativePrompt}
              onChange={setNegativePrompt}
            />
            <Select
              title="Model"
              disabled={!!input.fineTuneEngine}
              value={input.engineID}
              onChange={(value) => {
                if (!value) return;
                setInput({
                  ...input,
                  engineID: value,
                });
              }}
              options={models}
            />
            {fineTunes.length > 0 && (
              <Select
                title="Fine-Tune"
                value={input.fineTuneEngine ?? undefined}
                onChange={(value) => {
                  const fineTune = fineTunes.find((f) => f.value === value);
                  setInput({
                    ...input,
                    fineTuneEngine: value,
                    engineID: fineTune?.engine ?? input.engineID,
                  });
                }}
                options={[
                  {
                    label: "None",
                    value: undefined,
                  },
                  ...fineTunes,
                ]}
              />
            )}
            {input.fineTuneEngine && (
              <Theme.Range
                title="Fine-Tune Strength"
                max={1}
                min={0}
                step={0.01}
                value={input.loraStrength}
                onChange={(value) =>
                  setInput({ ...input, loraStrength: value })
                }
              />
            )}
            <Select
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
            <Input
              number
              title="CFG Scale"
              value={input.cfgScale}
              onNumberChange={(value) =>
                setInput({ ...input, cfgScale: value })
              }
            />
            <Input
              title="Steps"
              number
              value={input.steps}
              onNumberChange={(value) => setInput({ ...input, steps: value })}
            />
          </div>
        }
        sidebarBottom={
          <Button
            variant="primary"
            className="relative h-16 w-full rounded-none"
            disabled={generating || !positivePrompt || !apiKey}
            onClick={generate}
          >
            Generate
            <Theme.Icon.Spinner
              className={classes(
                "absolute right-[30%] text-white",
                !generating && "hidden"
              )}
            />
          </Button>
        }
      >
        <div className=" flex h-full grow gap-3 overflow-y-auto overflow-x-hidden">
          <div className="flex grow items-center justify-center">
            {apiKey ? (
              imageURL ? (
                <ImageContainer
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
      </Background>
      <div className="flex min-h-0 shrink-0 flex-wrap gap-6">
        <Buttons />
      </div>
    </div>
  );
}

export function Buttons() {
  return (
    <>
      <Button link="/docs/features/text-to-image" variant="secondary">
        View Documentation
      </Button>
      <Button
        link="https://github.com/Stability-AI/platform/blob/main/packages/app/src/Sandbox/TextToImage/index.tsx"
        variant="secondary"
      >
        View on GitHub
      </Button>
    </>
  );
}

TextToImage.Samples = Samples;
TextToImage.Buttons = Buttons;
TextToImage.formatOptions = (
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
