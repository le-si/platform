import { FineTuning } from "~/FineTuning";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

import { Input } from "./Input";

export type Uploads = {
  [id: string]: FineTuning.Upload;
};

export function Uploads() {
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
          <FineTuning.H2>Name</FineTuning.H2>
          <FineTuning.Project.Name.Input className="w-full grow" />
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
            &nbsp;/ {constraints.count.min}-{constraints.count.max} images
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
              Upload Image
            </Theme.Button>
            <Theme.Button className="pr-4" onClick={() => Input.trigger()}>
              <Theme.Icon.Upload className="mr-1" />
              Upload Zip
            </Theme.Button>
          </div>
        </div>
        <div className="relative grid grid-cols-4 gap-4">
          {uploads.map((upload) => (
            <FineTuning.Upload key={upload.id} upload={upload} />
          ))}
          {Array.from({
            length: Math.max(0, constraints.count.min - uploads.length),
          }).map((_, index) => (
            <FineTuning.Upload key={index} />
          ))}
        </div>
      </FineTuning.Card>
    </FineTuning.Step>
  );
}

export namespace Uploads {
  export const constraints = () => ({ count: { min: 4, max: 128 } } as const);

  export const addFromURL = (url: URLString) =>
    State.use.getState().addUpload(url);

  export const use = () =>
    State.use(({ uploads }) => Object.values(uploads), GlobalState.shallow);

  type State = {
    uploads: Uploads;
    addUpload: (url: URLString) => void;
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
    }));
  }
}
