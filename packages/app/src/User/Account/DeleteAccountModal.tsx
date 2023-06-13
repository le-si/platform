import { Theme } from "~/Theme";

export function DeleteAccountModal({
  open,
  onClose,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <Theme.Modal open={open} onClose={onClose}>
      Delete Account modal
      {/*<Theme.Modal.Panel className="w-[25rem] gap-5 p-4">*/}
      {/*  <Theme.Modal.Title>Delete Account</Theme.Modal.Title>*/}
      {/*  <Theme.Modal.Description>*/}
      {/*    Are you sure you want to permanently delete your account?{" "}*/}
      {/*    <span className="font-bold">This action cannot be undone.</span>*/}
      {/*  </Theme.Modal.Description>*/}
      {/*  <Theme.Modal.Actions*/}
      {/*    actions={[*/}
      {/*      {*/}
      {/*        label: "Cancel",*/}
      {/*        onClick: onClose,*/}
      {/*        size: "lg",*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "Delete Account",*/}
      {/*        onClick: () => {*/}
      {/*          onDelete();*/}
      {/*          onClose();*/}
      {/*        },*/}
      {/*        size: "lg",*/}
      {/*        variant: "red",*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</Theme.Modal.Panel>*/}
    </Theme.Modal>
  );
}
