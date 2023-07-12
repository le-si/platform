import { OpenAPI } from "@stability/sdk";

import {
  Background,
  Button,
  ImageContainer,
  Input,
  Select,
  Textarea,
} from "~/Theme";

import { User } from "~/User";

import { request } from "./OpenAPI";
import * as Samples from "./Samples";

export type TextToImage = {
  setOptions: (options: Record<string, unknown>) => void;
};

export function TextToImage({ setOptions }: TextToImage) {
  const apiKey = User.AccessToken.use();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const [engineID, setEngineID] = useState<string>(
    "stable-diffusion-xl-beta-v2-2-2"
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const [positivePrompt, setPositivePrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [style, setStyle] =
    useState<OpenAPI.TextToImageRequestBody["style_preset"]>("enhance");

  const [width] = useState<number>(512);
  const [height] = useState<number>(512);
  const [cfgScale, setCfgScale] = useState<number>(7);
  const [steps, setSteps] = useState<number>(50);
  const [seed] = useState<number>(0);

  const generate = useCallback(async () => {
    if (!apiKey) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await request(
      apiKey,
      engineID,
      positivePrompt,
      negativePrompt,
      style,
      height,
      width,
      cfgScale,
      seed,
      steps
    );

    setGenerating(false);
    if (error) {
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [
    apiKey,
    engineID,
    style,
    positivePrompt,
    negativePrompt,
    width,
    height,
    cfgScale,
    steps,
    seed,
  ]);

  useEffect(() => {
    setOptions({
      engineID,
      positivePrompt,
      negativePrompt,
      style,
      width,
      height,
      cfgScale,
      steps,
      seed,
    });
  }, [
    engineID,
    style,
    positivePrompt,
    negativePrompt,
    width,
    height,
    cfgScale,
    steps,
    seed,
    setOptions,
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Background
        title="Text-to-Image"
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
            <Select
              title="Model"
              value={engineID}
              onChange={setEngineID}
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
              options={[
                { label: "Enhance", value: "enhance" },
                { label: "Anime", value: "anime" },
                { label: "Photographic", value: "photographic" },
                { label: "Digital Art", value: "digital-art" },
                { label: "Comic Book", value: "comic-book" },
                { label: "Fantasy Art", value: "fantasy-art" },
                { label: "Line Art", value: "line-art" },
                { label: "Analog Film", value: "analog-film" },
                { label: "Neon Punk", value: "neon-punk" },
                { label: "Isometric", value: "isometric" },
                { label: "Low Poly", value: "low-poly" },
                { label: "Origami", value: "origami" },
                { label: "Modeling Compound", value: "modeling-compound" },
                { label: "Cinematic", value: "cinematic" },
                { label: "3D Model", value: "3d-model" },
                { label: "Pixel Art", value: "pixel-art" },
                { label: "Tile Texture", value: "tile-texture" },
              ]}
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
            className="h-16 rounded-none"
            disabled={generating || !positivePrompt || !apiKey}
            onClick={generate}
          >
            Generate
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
