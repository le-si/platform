import { useNavigate } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";

export function SearchResults({
  results,
  closeModal,
}: {
  readonly results: readonly GlobalSearch.Result[];
  readonly closeModal: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto overscroll-none">
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

  const forwardToDestination = useCallback(() => {
    closeModal();

    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      navigate(route);
    }
  }, [closeModal, navigate, route]);

  return (
    <div
      className="flex cursor-pointer justify-between border-b border-zinc-300 py-2 pl-6 pr-5"
      onClick={forwardToDestination}
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-bold">{title}</h4>
        <span className="font-sans text-sm italic text-gray-500/80">
          {route}
        </span>
      </div>
      <div className="flex items-center">
        <span className="badge badge-lg">{matchCount}</span>
      </div>
    </div>
  );
};
