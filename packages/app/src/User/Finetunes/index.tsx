import { GRPC as Proto } from "@stability/sdk";
import { Link } from "react-router-dom";
import { FineTuning } from "~/FineTuning";
import { GRPC } from "~/GRPC";
import { Theme } from "~/Theme";

const statusMap = {
  Submitted: 0,
  "Not Started": 1,
  Running: 2,
  Completed: 3,
  Failed: 4,
};

function statusValue(status?: FineTuning.Model.Status) {
  return statusMap[status ?? "Not Started"];
}

export function Finetunes() {
  const models = FineTuning.Models.use();

  return (
    <div className="flex h-full w-full flex-col items-end gap-5">
      <Theme.Background
        className="h-fit min-h-0 w-full grow self-start overflow-x-auto truncate"
        title="Finetunes"
      >
        {models.data || !models.isFetched ? (
          <div className="flex w-full flex-col gap-2 text-left">
            <div className="mb-2 grid grid-cols-5 border-b border-black/5 pb-2 text-xs uppercase text-neutral-500">
              <h1 className="col-span-2 truncate">Name</h1>
              <h1 className="truncate">Type</h1>
              <h1 className="truncate">Status</h1>
            </div>
            {!models.isFetched ? (
              <div className="grid grid-cols-5 text-sm text-neutral-700 dark:text-neutral-400">
                <h1 className="col-span-5 mt-6 truncate text-center">
                  Loading...
                </h1>
              </div>
            ) : (
              Object.values(models.data)
                .sort((a, b) => statusValue(a.status) - statusValue(b.status))
                .map((model) => <Model key={model.id} model={model} />)
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <h1 className="text-center text-black/50">
              {"You don't have any finetunes yet"}
            </h1>
            <Link
              to="/sandbox/fine-tuning"
              className="pointer-events-auto flex items-center gap-2 text-indigo-600 hover:underline"
            >
              Create a finetune
              <Theme.Icon.ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Theme.Background>
    </div>
  );
}

function Model({ model }: { model: FineTuning.Model }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const grpc = GRPC.use();

  return (
    <div className="grid grid-cols-5 text-sm text-neutral-700 dark:text-neutral-400">
      <h1 className="col-span-2 truncate text-base">{model.name}</h1>
      <h1 className="w-fit truncate text-left text-sm opacity-75">
        {model.mode}
      </h1>
      <h1 className="truncate">
        <h1
          className={classes(
            "w-fit rounded border px-2 py-0.5 text-sm",
            model.status === "Completed"
              ? "border-green-600 text-green-600"
              : model.status === "Failed"
              ? "border-red-600 text-red-600"
              : "border-yellow-600 text-yellow-600"
          )}
        >
          {model.status}
        </h1>
      </h1>
      <div className="flex items-center justify-end gap-2">
        <Theme.Button
          className="w-fit rounded p-0 transition-all duration-200 hover:text-red-600"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          <Theme.Icon.X className="h-5 w-5" />
        </Theme.Button>
        <DeleteModal
          model={model}
          open={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
          }}
          onDelete={() => {
            grpc?.fineTuning.deleteModel(
              Proto.DeleteModelRequest.create({
                id: model.id,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export function DeleteModal({
  model,
  open,
  onClose,
  onDelete,
}: {
  model: FineTuning.Model;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Theme.Modal
      open={open}
      onClose={onClose}
      title="Delete this finetuned model?"
      className="flex max-w-[25rem]"
      bottom={
        <div className="flex w-full items-center justify-end gap-3 p-4">
          <Theme.Button
            className="w-fit bg-transparent px-3 py-1.5 hover:bg-transparent hover:underline"
            onClick={onClose}
          >
            Cancel
          </Theme.Button>
          <Theme.Button
            className="w-fit bg-red-500 px-3 py-1.5 text-white hover:bg-red-600"
            onClick={() => {
              setLoading(true);
              onDelete();
            }}
            loading={loading}
          >
            Delete
          </Theme.Button>
        </div>
      }
    >
      <p className="whitespace-normal">
        This is a permanent action and cannot be undone. Services depending on{" "}
        <span className="rounded bg-black/10 p-1 py-0.5 font-mono text-black">
          {model.name}
        </span>{" "}
        will stop working.
      </p>
    </Theme.Modal>
  );
}

export namespace Finetunes {
  export const uri = () => "finetunes" as const;
  export const url = () => "/account/finetunes" as const;
}
