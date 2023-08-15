import { Link } from "react-router-dom";

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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">
          Upload {constraints.count.min}-{constraints.count.max} Images
        </h1>
        <p className="opacity-80">
          Image size should be from {constraints.size.min}px to{" "}
          {constraints.size.max}px.
        </p>
      </div>
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
        <div className="grow basis-0 text-sm text-zinc-500">
          To get the most out of your fine-tune, upload a variety of images at
          different angles, the more the better.
          <br />
          <br />
          To ensure the best results check out our fine-tuning
          documentation&nbsp;
          <Link
            to="/docs/features/fine-tuning"
            className="inline-flex items-center gap-1 text-indigo-500 hover:underline"
          >
            here <Theme.Icon.ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-t border-zinc-300 pt-6">
          <Theme.Button
            variant="tertiary"
            className="pr-4"
            onClick={() => Input.trigger()}
          >
            <Theme.Icon.Upload className="mr-1 h-5 w-5" />
            Upload Assets
          </Theme.Button>
          <div>
            {uploads.filter((upload) => upload.asset).length}
            <span className="opacity-muted select-none">
              &nbsp;/ {constraints.count.max} Training Images
            </span>
          </div>
          <div
            className={classes(
              "flex gap-2",
              uploads.length >= constraints.count.max &&
                "opacity-muted pointer-events-none cursor-not-allowed"
            )}
          >
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
        <div
          className={classes(
            "scrollbar relative grid max-h-[30rem] grid-cols-4 gap-2 overflow-y-auto rounded-xl border border-zinc-300 p-2",
            uploads.length <= 0 && "border-dashed"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const files = e.dataTransfer.files;
            if (!files) return;

            for (const file of files) {
              if (file.type === "application/zip") {
                await Input.handleZipFile(file);
                continue;
              }

              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = async (event) => {
                event.target &&
                  typeof event.target.result === "string" &&
                  Input.addResizedFile(event.target.result);
              };
            }
          }}
        >
          {uploads.map((upload) => (
            <FineTuning.Upload key={upload.id} upload={upload} />
          ))}
          {uploads.length <= 0 && (
            <div
              className="col-span-4 flex h-[15rem] w-full cursor-pointer select-none flex-col items-center justify-center gap-3"
              onClick={() => Input.trigger()}
            >
              <Theme.Icon.Upload className="h-8 w-8" />
              <p className="text-zinc-500">Upload images</p>
            </div>
          )}
        </div>
      </div>
    </FineTuning.Step>
  );
}

export namespace Uploads {
  export const constraints = () => ({ count: { min: 4, max: 64 } } as const);

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

    reset: () => void;
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

      reset: () => set({ uploads: {} }),
    }));
  }
}
