import { Background, Button, ImageContainer, Select } from "~/Theme";
import { DropZone } from "~/Theme/DropZone";

import { User } from "~/User";

import { request } from "./OpenAPI";
import * as Samples from "./Samples";

export type Upscaling = {
  setOptions: (options: Record<string, unknown>) => void;
};

export function Upscaling({ setOptions }: Upscaling) {
  const apiKey = User.AccessToken.use();
  const outOfCreditsHandler = User.Account.Credits.useOutOfCreditsHandler();

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState<boolean>(false);
  const [engineID, setEngineID] = useState<string>("esrgan-v1-x2plus");
  const [error, setError] = useState<string | undefined>(undefined);

  const [init, setInit] = useState<
    | {
        file: Blob;
        url: string;
      }
    | undefined
  >();
  const [height, setHeight] = useState<number>(0);

  const scale = useMemo(
    () => (engineID === "esrgan-v1-x2plus" ? 2 : 4),
    [engineID]
  );

  const generate = useCallback(async () => {
    if (!apiKey || !init?.file) return;

    setGenerating(true);
    setError(undefined);

    const [url, error] = await request(
      apiKey,
      engineID,
      init?.file,
      height * scale
    );

    setGenerating(false);
    if (error) {
      outOfCreditsHandler(error);
      setError(error.message);
      setImageURL(undefined);
    } else {
      setImageURL(url);
    }
  }, [outOfCreditsHandler, apiKey, engineID, init, height, scale]);

  useEffect(() => {
    setOptions({
      engineID,
      height: height * scale,
    });
  }, [engineID, setOptions, height, scale]);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:min-w-[55rem]">
      <Background
        title="Upscaling"
        className="h-full min-h-0 w-full"
        sidebar={
          <div className="flex h-fit w-full grow flex-col gap-3">
            <DropZone
              title="Input Image"
              onDrop={(file: File) => {
                const blob = new Blob([file], { type: "image/png" });

                // set height
                const img = new Image();
                img.onload = () => {
                  setHeight(img.height);
                };
                img.src = URL.createObjectURL(blob);

                setInit({
                  file: blob,
                  url: URL.createObjectURL(blob),
                });
              }}
              onClear={() => setInit(undefined)}
            />
            <Select
              title="Model"
              value={engineID}
              onChange={setEngineID}
              options={[
                {
                  label: "Real-ESRGAN x2",
                  value: "esrgan-v1-x2plus",
                },
                {
                  label: "Stable Diffusion x4 Latent Upscaler",
                  value: "stable-diffusion-x4-latent-upscaler",
                },
              ]}
            />
          </div>
        }
        sidebarBottom={
          <Button
            variant="primary"
            className="h-16 rounded-none"
            disabled={generating || !init || !apiKey}
            onClick={generate}
          >
            Upscale
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
      <Button link="/docs/features/image-upscaling" variant="secondary">
        View Documentation
      </Button>
      <Button
        link="https://github.com/Stability-AI/platform/blob/main/packages/app/src/Sandbox/Upscaling/index.tsx"
        variant="secondary"
      >
        View on GitHub
      </Button>
    </>
  );
}

Upscaling.Samples = Samples;
Upscaling.Buttons = Buttons;
