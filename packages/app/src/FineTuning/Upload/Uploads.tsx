import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

export type Uploads = {};

export function Uploads() {
  const input = FineTuning.Input.use();
  const uploads = Uploads.use();

  const constraints = {
    ...FineTuning.Upload.constraints(),
    ...FineTuning.Uploads.constraints(),
  };

  return (
    <FineTuning.Step className="max-w-[1000px]">
      <div>
        <FineTuning.H1>
          Upload {constraints.count.min}-{constraints.count.max} images
        </FineTuning.H1>
        <p className="mt-2">
          Image size should be from {constraints.size.min}px to&nbsp;
          {constraints.size.max}px
        </p>
      </div>
      <div className="flex gap-6">
        <div className="flex grow basis-0 flex-col gap-4">
          <FineTuning.H2>
            Name<sup className="text-red-500">*</sup>
          </FineTuning.H2>
          <Theme.Input
            className="w-full grow"
            placeholder={`My ${input?.mode?.toLocaleLowerCase()} model`}
          />
          <Theme.Button variant="primary" className="mr-auto self-end px-4">
            Train
            <FineTuning.ArrowRight className="ml-2" />
          </Theme.Button>
        </div>
        <div className="grow basis-0">
          <FineTuning.H2 className="mb-2">Instructions</FineTuning.H2>
          <p>
            The more you upload the better the fine-tune results. Faces will be
            centred before fine-tuning automatically.
          </p>
        </div>
      </div>
      <FineTuning.Card className="flex flex-col gap-6">
        <div className="flex items-center justify-center">
          {uploads.length}
          <span className="opacity-muted">
            &nbsp;/ {constraints.count.max} images
          </span>
          <div className="ml-auto flex gap-4">
            <Theme.Button className="pr-4">
              <Theme.Icon.Upload className="mr-1" />
              Upload Image
            </Theme.Button>
            <Theme.Button className="pr-4">
              <Theme.Icon.Upload className="mr-1" />
              Upload Zip
            </Theme.Button>
            <Theme.Button className="pr-4">
              <Theme.Icon.Camera className="mr-1 h-7 w-7" />
              Camera
            </Theme.Button>
          </div>
        </div>
        <div
          className={classes(
            "grid grid-cols-4 gap-4",
            uploads.length > 0 && "gap-4 md:grid-cols-5 lg:grid-cols-6 lg:gap-6"
          )}
        >
          <FineTuning.Upload />
          <FineTuning.Upload />
          <FineTuning.Upload />
          <FineTuning.Upload />
        </div>
      </FineTuning.Card>
    </FineTuning.Step>
  );
}

export namespace Uploads {
  export const constraints = () =>
    ({
      count: {
        min: 4,
        max: 128,
      },
    } as const);

  export const useTrigger = () => {
    const [fileInput, trigger] = useMemo(() => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.multiple = true;
      // fileInput.onchange = () => {
      //   if (fileInput.files.length) {
      //     setFiles(fileInput.files);
      //   }
      // };

      return [fileInput, () => fileInput.click()] as const;
    }, []);

    useEffect(() => () => fileInput.remove(), [fileInput]);

    return trigger;
  };

  export const use = () =>
    State.use(({ uploads }) => Object.values(uploads), GlobalState.shallow);

  type State = {
    uploads: Uploads;
  };

  namespace State {
    export const use = GlobalState.create<State>((_set) => ({
      uploads: {},
    }));
  }
}
