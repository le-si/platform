import { FineTuning } from "~/FineTuning";
import { Mode } from "~/FineTuning/Mode";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

import { Input } from "./Input";

export type Uploads = {
  [id: string]: FineTuning.Upload;
};

export function Uploads() {
  FineTuning.Project.Create.use();
  const mode = Mode.use();

  const uploads = Uploads.use();
  const { uploadsLoading, isReadyToTrain } = Uploads.useIsReadyToTrain();

  const constraints = {
    ...FineTuning.Upload.constraints(),
    ...FineTuning.Uploads.constraints(),
  };

  return (
    <FineTuning.Step className="max-w-[1000px] lg:w-[50rem]  xl:w-[80rem]">
      <div className="flex gap-6">
        <div className="flex grow basis-0 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="select-none text-lg">Model Name</h3>
            <FineTuning.Project.Name.Input className="w-full grow" />
          </div>
          {mode === "Object" && (
            <div className="flex flex-col gap-1">
              <h3 className="select-none text-lg">Object Prompt</h3>
              <FineTuning.Mode.Object.Prompt />
            </div>
          )}
        </div>
        <div className="prose grow basis-0">
          <ul>
            <li>
              Upload {constraints.count.min}-{constraints.count.max} images
            </li>
            <li>More images are better</li>
            <li>
              Image size should be from {constraints.size.min}px to&nbsp;
              {constraints.size.max}px
            </li>
            <li>Images are deleted after a successful finetune</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center">
          {uploads.filter((upload) => upload.asset).length}
          <span className="opacity-muted select-none">
            &nbsp;/ {constraints.count.max} images
          </span>
          <div
            className={classes(
              "ml-auto flex gap-4",
              uploads.length >= constraints.count.max &&
                "opacity-muted pointer-events-none cursor-not-allowed"
            )}
          >
            <Theme.Button className="pr-4" onClick={() => Input.trigger()}>
              <Theme.Icon.Upload className="mr-1" />
              Upload Assets
            </Theme.Button>
            <Theme.Button
              variant="primary"
              className="mr-auto self-end px-4"
              disabled={!isReadyToTrain}
              onClick={FineTuning.Steps.next}
            >
              {uploadsLoading > 0 && (
                <Theme.Icon.Spinner className="mr-2 animate-spin text-white" />
              )}
              Start Training
              <FineTuning.ArrowRight className="ml-2" />
            </Theme.Button>
          </div>
        </div>
        <div className="relative grid grid-cols-4 gap-2">
          {uploads.map((upload) => (
            <FineTuning.Upload key={upload.id} upload={upload} />
          ))}
          {Array.from({
            length: Math.max(0, constraints.count.min - uploads.length),
          }).map((_, index) => (
            <FineTuning.Upload key={index} />
          ))}
        </div>
      </div>
    </FineTuning.Step>
  );
}

export namespace Uploads {
  export const constraints = () => ({ count: { min: 4, max: 128 } } as const);

  export const addFromURL = (url: URLString) =>
    State.use.getState().addUpload(url);

  export const addAssetToUpload = (
    upload: FineTuning.Upload,
    asset: FineTuning.Upload.Asset
  ) => State.use.getState().addAssetToUpload(upload, asset);

  export const remove = (id: ID) => State.use.getState().removeUpload(id);

  export const use = () =>
    State.use(({ uploads }) => Object.values(uploads), GlobalState.shallow);

  export const useIsReadyToTrain = () => {
    const { count } = constraints();

    const uploads = use();
    const objectPrompt = FineTuning.Mode.Object.Prompt.use();

    return useMemo(() => {
      let uploadsFinished = 0;
      let uploadsLoading = 0;

      for (const upload of uploads) {
        if (!!upload.asset) uploadsFinished++;
        else uploadsLoading++;
      }

      return {
        uploadsFinished,
        uploadsLoading,
        isReadyToTrain:
          uploadsLoading === 0 &&
          uploadsFinished >= count.min &&
          (FineTuning.Mode.get() !== "Object" || !!objectPrompt),
      };
    }, [count, uploads, objectPrompt]);
  };

  type State = {
    uploads: Uploads;

    addUpload: (url: URLString) => void;

    addAssetToUpload: (
      upload: FineTuning.Upload,
      asset: FineTuning.Upload.Asset
    ) => void;

    removeUpload: (id: ID) => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      uploads: {},

      addUpload: (url) =>
        set(({ uploads }) => {
          const id = ID.create();
          const upload = { id, url };
          return { uploads: { ...uploads, [id]: upload } };
        }),

      addAssetToUpload: (upload, asset) =>
        set(({ uploads }) => ({
          uploads: { ...uploads, [upload.id]: { ...upload, asset } },
        })),

      removeUpload: (id) =>
        set(({ uploads: { [id]: _, ...uploads } }) => ({ uploads })),
    }));
  }
}
