import { useWindowSize } from "react-use";

import { TopBar } from "~/App/TopBar";
import { Code } from "~/Code";
import { Theme } from "~/Theme";

export function Sandbox({ codeSamples, ...props }: Sandbox.Props) {
  const size = useWindowSize();

  const [isViewingCode, setIsViewingCode] = useState(true);
  const onToggleViewingCode = useCallback(
    () => setIsViewingCode((isViewingCode) => !isViewingCode),
    []
  );

  return (
    <>
      <div className="flex h-full flex-col">
        <TopBar />
        <div className="m-0 mt-0 flex grow flex-col gap-6 md:m-6">
          <div className="flex min-h-0 grow gap-6">
            {codeSamples &&
              size.width > 1024 &&
              (isViewingCode ? (
                <Code.Samples
                  samples={codeSamples}
                  onClose={onToggleViewingCode}
                />
              ) : (
                <div
                  className="flex w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-zinc-400 text-center text-xs transition-colors duration-100 hover:bg-zinc-100"
                  onClick={onToggleViewingCode}
                >
                  <Theme.Icon.Code />
                  View Code
                </div>
              ))}
            <Theme.Background
              className="grow rounded-none md:rounded-lg"
              {...props}
            />
          </div>
        </div>
        <Theme.Footer />
      </div>
    </>
  );
}

export namespace Sandbox {
  export type Props = StyleableWithChildren &
    Theme.Background.Props & {
      codeSamples?: Code.Samples;
    };
}
