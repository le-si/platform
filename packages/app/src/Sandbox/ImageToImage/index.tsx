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
import { DropZone } from "~/Theme/DropZone";

import { User } from "~/User";

import { Sandbox } from "..";

import * as Samples from "./Samples";

export type ImageToImage = {
  input: Sandbox.Input;
  setInput: (input: Sandbox.Input) => void;
  setOptions: (options: Record<string, unknown>) => void;
};

export function ImageToImage({ setOptions, input, setInput }: ImageToImage) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const models = Sandbox.useModels();
  const finetunes = Sandbox.useFinetunes();
  const [error, setError] = useState<string | undefined>(undefined);

  const [init, setInit] = useState<
    | {
        file: Blob;
        url: string;
      }
    | undefined
  >();

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
      init_image_mode: "IMAGE_STRENGTH",
      image_strength: input.initStrength,
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
    input.initStrength,
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Background
        title="Image-to-Image"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <Textarea
              autoFocus
              color="positive"
              title="Positive Prompt"
              placeholder="Description of what you want to generate"
              value={positivePrompt}
              onChange={setPositivePrompt}
            />
            <Textarea
              color="negative"
              title="Negative Prompt"
              placeholder="What you want to avoid generating"
              value={negativePrompt}
              onChange={setNegativePrompt}
            />
            <DropZone
              title="Input Image"
              onDrop={(file: File) => {
                const blob = new Blob([file], { type: "image/png" });
                setInit({
                  file: blob,
                  url: URL.createObjectURL(blob),
                });
                setInput({
                  ...input,
                  initImage: blob,
                });
              }}
              imageStyle={{
                opacity: input.initStrength,
              }}
              onClear={() => setInit(undefined)}
            >
              {init && (
                <Input
                  title="Strength"
                  number
                  percentage
                  value={(input.initStrength ?? 0.35) * 100}
                  onNumberChange={(value) =>
                    setInput({ ...input, initStrength: value / 100 })
                  }
                />
              )}
            </DropZone>
            <Select
              title="Model"
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
            {finetunes.length > 0 && (
              <Select
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
            disabled={generating || !positivePrompt || !apiKey || !init}
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
      <Button link="/docs/features/image-to-image" variant="secondary">
        View Documentation
      </Button>
      <Button
        link="https://github.com/Stability-AI/platform/blob/main/packages/app/src/Sandbox/ImageToImage/index.tsx"
        variant="secondary"
      >
        View on GitHub
      </Button>
    </>
  );
}

ImageToImage.Samples = Samples;
ImageToImage.Buttons = Buttons;
ImageToImage.formatOptions = (
  options: Record<string, unknown>,
  codeLanguage: Code.Language
) => {
  return Object.entries(options)
    .reduce((acc, [key, value]) => {
      if (value === undefined) return acc;

      if (key === "text_prompts") {
        return acc.concat(...TextPrompts.toFormData(value, codeLanguage));
      }

      if (typeof value === "string") {
        value = `"${value}"`;
      } else {
        value = `${value}`;
      }

      return codeLanguage === "python"
        ? acc.concat(`\t\t"${key}": ${value},\n`)
        : acc.concat(`formData.append('${key}', ${value});\n`);
    }, "")
    .trim();
};
