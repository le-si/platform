import { OpenAPI } from "@stability/sdk";
import { Code } from "~/Sandbox/Code";
import { StylePresets } from "~/Sandbox/StylePresets";
import { TextPrompts } from "~/Sandbox/TextPrompts";

import {
  Background,
  Button,
  ImageContainer,
  Input,
  Range,
  Select,
  Textarea,
  Theme,
} from "~/Theme";

import { User } from "~/User";

import { Sandbox } from "..";

import * as Samples from "./Samples";

export type TextToImage = {
  setOptions: (options: Record<string, unknown>) => void;
};

export function TextToImage({ setOptions }: TextToImage) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const models = Sandbox.useModels();
  const [engineID, setEngineID] = useState<string>(
    "stable-diffusion-xl-1024-v1-0"
  );
  const [fineTuneEngine, setFineTuneEngine] = useState<string | undefined>();
  const [fineTuneStrength, setFineTuneStrength] = useState<number>(1);
  const [error, setError] = useState<string | undefined>(undefined);

  const [positivePrompt, setPositivePrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [style, setStyle] =
    useState<OpenAPI.TextToImageRequestBody["style_preset"]>("enhance");

  const [cfgScale, setCfgScale] = useState<number>(5);
  const [steps, setSteps] = useState<number>(40);
  const [seed] = useState<number>(0);

  const dims = engineID.includes("1024")
    ? 1024
    : engineID.includes("768")
    ? 768
    : 512;

  const createImage = Sandbox.useCreateImage();

  const generate = useCallback(async () => {
    if (!apiKey) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await createImage(
      engineID,
      [
        {
          text: positivePrompt,
          weight: 1,
        },
        {
          text: negativePrompt,
          weight: -1,
        },
      ],
      style,
      cfgScale,
      seed,
      steps,
      fineTuneEngine,
      undefined,
      undefined,
      fineTuneStrength
    );

    setGenerating(false);
    if (error) {
      outOfCreditsHandler(error);
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [
    apiKey,
    createImage,
    engineID,
    positivePrompt,
    negativePrompt,
    style,
    cfgScale,
    seed,
    steps,
    fineTuneEngine,
    outOfCreditsHandler,
    fineTuneStrength,
  ]);

  useEffect(() => {
    setOptions({
      engineID,
      steps,
      width: dims,
      height: dims,
      seed,
      cfg_scale: cfgScale,
      samples: 1,
      style_preset: style,
      text_prompts: TextPrompts.toArray(positivePrompt, negativePrompt),
      fineTune_engine: fineTuneEngine,
    });
  }, [
    engineID,
    style,
    positivePrompt,
    negativePrompt,
    cfgScale,
    steps,
    seed,
    setOptions,
    fineTuneEngine,
    dims,
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
              fineTune={fineTuneEngine}
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
              value={`${engineID}${fineTuneEngine ? `:${fineTuneEngine}` : ""}`}
              onChange={(value) => {
                if (value) {
                  const [engineID, fineTuneEngine] = value.split(":");
                  setEngineID(engineID as string);
                  setFineTuneEngine(fineTuneEngine);
                }
              }}
              options={models}
            />
            {fineTuneEngine && (
              <Range
                title="FineTune Strength"
                max={1}
                min={0}
                step={0.01}
                value={fineTuneStrength}
                onChange={setFineTuneStrength}
              />
            )}
            <Select
              title="Style"
              value={style}
              onChange={(value) =>
                setStyle(
                  value as OpenAPI.TextToImageRequestBody["style_preset"]
                )
              }
              options={StylePresets.options()}
            />
            <Input
              number
              title="CFG Scale"
              value={cfgScale}
              onNumberChange={setCfgScale}
            />
            <Input
              title="Steps"
              number
              value={steps}
              onNumberChange={setSteps}
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
