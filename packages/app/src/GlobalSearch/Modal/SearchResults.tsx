import { useNavigate } from "react-router-dom";
import { GlobalSearch } from "~/GlobalSearch";

type Props = {
  readonly results: readonly GlobalSearch.Result[];
  readonly closeModal: () => void;
  readonly ref: React.RefObject<HTMLDivElement>;
};

export const SearchResults = React.forwardRef<HTMLDivElement, Props>(
  ({ results, closeModal }, ref) => (
    <div className="flex h-full flex-col overflow-y-auto overscroll-none">
      {results.map((result, index) => (
        <React.Fragment key={`${result.route}-${index}`}>
          <SearchResult
            result={result}
            closeModal={closeModal}
            ref={index === 0 ? ref : null}
          />
        </React.Fragment>
      ))}
    </div>
  )
);

const SearchResult = React.forwardRef<
  HTMLDivElement,
  {
    result: GlobalSearch.Result;
    closeModal: () => void;
  }
>(({ result: { route, matchCount, title }, closeModal }, ref) => {
  const navigate = useNavigate();

  const forwardToDestination = useCallback(() => {
    closeModal();

    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      navigate(route);
    }
  }, [closeModal, navigate, route]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        forwardToDestination();
      }
    },
    [forwardToDestination]
  );

  return (
    <div
      ref={ref}
      className="flex cursor-pointer justify-between border-b border-zinc-300 py-2 pl-6 pr-5"
      onClick={forwardToDestination}
      tabIndex={0}
      onKeyDown={onKeyDown}
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
});
