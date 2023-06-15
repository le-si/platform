import { Theme } from "~/Theme";
import { User } from "~/User";

import { DeleteAccountModal } from "./DeleteAccountModal";

export function Danger() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteUser = User.Delete.use();

  return (
    <>
      <div className="mb-10 w-full">
        <h5 className="mb-3.5 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Danger zone
        </h5>

        <div className="flex items-center justify-between rounded border border-red-500 px-4 py-3 pr-6 text-black">
          <div className="flex flex-col">
            <span className="text-lg">Delete account</span>
            <span className="opacity-muted text-sm">
              This action is permanent and cannot be undone
            </span>
          </div>
          <Theme.Button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-fit bg-red-600 px-4 text-white hover:bg-red-700 active:bg-red-800"
          >
            Delete
          </Theme.Button>
        </div>
      </div>
      <DeleteAccountModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onDelete={() => deleteUser?.mutate()}
      />
    </>
  );
}
