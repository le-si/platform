import { Button, Theme } from "~/Theme";

export function DeleteModal({
  open,
  onClose,
  onDelete
}: {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Theme.Modal
      open={open}
      onClose={onClose}
      title="Delete this API key?"
      className="flex max-w-[25rem]"
      bottom={
        <div className="flex w-full items-center justify-end gap-3 p-4">
          <Button
            className="w-fit bg-transparent px-3 py-1.5 hover:bg-transparent hover:underline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="w-fit bg-red-500 px-3 py-1.5 text-white hover:bg-red-600"
            onClick={() => {
              setLoading(true);
              onDelete();
            }}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="whitespace-normal">
        This is a permanent action and cannot be undone. Services depending on
        this API key will stop working.
      </p>
    </Theme.Modal>
  );
}
