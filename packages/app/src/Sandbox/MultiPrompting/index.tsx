import { OpenAPI } from "@stability/sdk";

import { Theme } from "~/Theme";
import { User } from "~/User";

import { request } from "./OpenAPI";
import * as Samples from "./Samples";

export type MultiPrompting = {
  setOptions: (options: any) => void;
};

export type Prompt = {
  text: string;
  weight: number;
};

export function MultiPrompting({ setOptions }: MultiPrompting) {
  const apiKey = User.AccessToken.use();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const [engineId, setEngineId] = useState<string>(
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
      engineId,
      prompts,
      style,
      cfgScale,
      steps
    );

    setGenerating(false);
    if (error) {
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [apiKey, engineId, style, prompts, cfgScale, steps]);

  useEffect(() => {
    setOptions({
      engineId,
      prompts,
      style,
      cfgScale,
      steps,
    });
  }, [engineId, style, prompts, cfgScale, steps, setOptions]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Theme.Background
        title="Multi-Prompting"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <Theme.Select
              title="Model"
              value={engineId}
              onChange={setEngineId}
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
            className="h-16 rounded-none"
            disabled={generating || !prompts.length || !apiKey}
            onClick={generate}
          >
            Generate
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
                <User.Login.Button />
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
      <Theme.Button
        link="https://stabilityai.readme.io/reference/texttoimage"
        variant="secondary"
      >
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
