import * as React from "react";
import { useDebounce } from "react-use";
import { GlobalSearch } from "~/GlobalSearch";
import { GlobalState } from "~/GlobalState";
import { REST } from "~/REST";
import { Sandbox } from "~/Sandbox";
import { Theme } from "~/Theme";

import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export function Modal() {
  const [text, setText] = React.useState("");
  const { isOpen, setIsOpen } = Modal.useState();
  const [results, setResults] = React.useState<GlobalSearch.Result[]>([]);
  const closeModal = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  const [, cancelDebounce] = useDebounce(
    () => setResults(text.length < 2 ? [] : GlobalSearch.Engine.search(text)),
    200,
    [text]
  );

  // Fetch OpenAPI spec so we can index it for searching
  REST.useOpenAPISpec({ enabled: isOpen });

  // Automatically clear search when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      cancelDebounce();

      setTimeout(() => {
        setText("");
        setResults([]);
      }, 200);
    }
  }, [cancelDebounce, isOpen]);

  return (
    <Theme.Modal
      open={isOpen}
      onClose={closeModal}
      className="h-full w-full max-w-[800px] overflow-hidden rounded-none sm:h-[60vh] sm:max-w-[50vh] sm:rounded-xl"
      containerClassName="p-0 h-full"
    >
      <SearchInput
        value={text}
        closeModal={closeModal}
        onChange={(event) => setText(event.target.value)}
      />

      {text.length <= 1 ? (
        <div className="h-full overflow-y-auto px-0 pt-6">
          <Sandbox.List noHeader smallGrid hideComingSoon />
        </div>
      ) : (
        <SearchResults results={results} closeModal={closeModal} />
      )}
    </Theme.Modal>
  );
}

export namespace Modal {
  export type State = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };

  export const useState = GlobalState.create<State>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
  }));
}
