import { useHotkeys } from "react-hotkeys-hook";

import { GlobalSearch } from ".";

import { Modal as GlobalSearchModal } from "./Modal";

export function Provider({ children }: React.PropsWithChildren) {
  const { open } = GlobalSearch.Modal.useState();

  React.useMemo(() => GlobalSearch.Engine.init(), []);

  /** @see https://react-hotkeys-hook.vercel.app */
  useHotkeys(["meta+k", "ctrl+k"], () => open(), {
    enableOnFormTags: ["INPUT", "TEXTAREA"],
    preventDefault: ({ key, ctrlKey, metaKey }) =>
      key === "k" && (ctrlKey || metaKey),
  });

  return (
    <>
      <GlobalSearchModal />
      {children}
    </>
  );
}
