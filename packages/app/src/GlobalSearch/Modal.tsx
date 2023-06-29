import { useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";
import { GlobalSearch } from "~/GlobalSearch/index";
import { GlobalState } from "~/GlobalState";
import { REST } from "~/REST";
import { Theme } from "~/Theme";

export function Modal() {
  const [text, setText] = React.useState("");
  const { isOpen, setIsOpen } = Modal.useState();
  const closeModal = () => setIsOpen(false);
  const [results, setResults] = React.useState<GlobalSearch.Result[]>([]);
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

  results.length > 0 && console.log({ results });

  return (
    <Theme.Modal
      open={isOpen}
      onClose={closeModal}
      className="max-h-[60vh] w-2/5 rounded-bl-none rounded-br-none rounded-tl-xl rounded-tr-xl"
      containerClassName="p-0 overflow-visible"
    >
      <SearchField
        value={text}
        closeModal={closeModal}
        onChange={(event) => setText(event.target.value)}
      />

      <SearchResults results={results} closeModal={closeModal} />
    </Theme.Modal>
  );
}

export namespace Modal {
  export type State = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };

  export const useState = GlobalState.create<State>((set) => ({
    isOpen: true,
    setIsOpen: (isOpen) => set({ isOpen }),
  }));
}

function SearchField({
  value,
  closeModal,
  onChange,
}: {
  readonly value: string;
  readonly closeModal: () => void;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => ref.current?.focus(), []);

  return (
    <div className={"relative w-full"}>
      <input
        ref={ref}
        type="text"
        placeholder="Type here"
        className="input-lg bg-brand-amber-1 w-full rounded-none border-b border-zinc-300 outline-none"
        value={value}
        onChange={onChange}
      />
      <kbd
        className="kbd kbd-sm absolute right-4 top-[35%] cursor-pointer"
        onClick={closeModal}
      >
        esc
      </kbd>
    </div>
  );
}

export function SearchResults({
  results,
  closeModal,
}: {
  readonly results: readonly GlobalSearch.Result[];
  readonly closeModal: () => void;
}) {
  return (
    <div className="max-h-screen overflow-y-auto overscroll-none">
      {results.map((result, index) => (
        <React.Fragment key={`${result.route}-${index}`}>
          <SearchResult result={result} closeModal={closeModal} />
        </React.Fragment>
      ))}
    </div>
  );
}

const SearchResult = ({
  result: { route, matchCount, title },
  closeModal,
}: {
  result: GlobalSearch.Result;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    closeModal();

    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      navigate(route);
    }
  };

  return (
    <div
      className="flex grow cursor-pointer justify-between border-b border-zinc-300 px-3 py-2"
      onClick={onClick}
    >
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        <span className="text-sm text-gray-500">{route}</span>
      </div>
      <div className="flex items-center">
        <span className="badge badge-lg">{matchCount}</span>
      </div>
    </div>
  );
};
