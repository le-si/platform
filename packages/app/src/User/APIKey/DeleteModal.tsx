import { Theme } from "~/Theme";

export function DeleteModal({
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
      Delete Key modal
      {/*<Theme.Modal.Panel className="w-[25rem] gap-5 p-4">*/}
      {/*  <Theme.Modal.Title>Delete API Key</Theme.Modal.Title>*/}
      {/*  <Theme.Modal.Description>*/}
      {/*    Are you sure you want to delete this API key? This action cannot be*/}
      {/*    undone.*/}
      {/*  </Theme.Modal.Description>*/}
      {/*  <Theme.Modal.Actions*/}
      {/*    actions={[*/}
      {/*      {*/}
      {/*        label: "Cancel",*/}
      {/*        onClick: onClose,*/}
      {/*        size: "lg",*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "Delete",*/}
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
