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

import { request } from "./OpenAPI";
import * as Samples from "./Samples";

export type ImageToImage = {
  setOptions: (options: Record<string, unknown>) => void;
};

export function ImageToImage({ setOptions }: ImageToImage) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const [engineID, setEngineID] = useState<string>(
    "stable-diffusion-xl-beta-v2-2-2"
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const [positivePrompt, setPositivePrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [style, setStyle] =
    useState<OpenAPI.ImageToImageRequestBody["style_preset"]>("enhance");

  const [cfgScale, setCfgScale] = useState<number>(7);
  const [steps, setSteps] = useState<number>(50);
  const [seed] = useState<number>(0);
  const [init, setInit] = useState<
    | {
        file: Blob;
        url: string;
      }
    | undefined
  >();
  const [initStrength, setInitStrength] = useState<number>(0.35);

  const generate = useCallback(async () => {
    if (!apiKey || !init?.file) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await request(
      apiKey,
      engineID,
      init?.file,
      positivePrompt,
      negativePrompt,
      style,
      cfgScale,
      seed,
      steps,
      initStrength
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
    cfgScale,
    engineID,
    outOfCreditsHandler,
    init?.file,
    initStrength,
    negativePrompt,
    positivePrompt,
    seed,
    steps,
    style,
  ]);

  useEffect(() => {
    setOptions({
      init_image_mode: "IMAGE_STRENGTH",
      image_strength: initStrength,
      samples: 1,
      engineID,
      steps,
      seed,
      cfg_scale: cfgScale,
      style_preset: style,
      text_prompts: TextPrompts.toArray(positivePrompt, negativePrompt),
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
    initStrength,
    init,
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
              }}
              imageStyle={{
                opacity: initStrength,
              }}
              onClear={() => setInit(undefined)}
            >
              {init && (
                <Input
                  title="Strength"
                  number
                  percentage
                  value={initStrength * 100}
                  onNumberChange={(value) => setInitStrength(value / 100)}
                />
              )}
            </DropZone>
            <Select
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
