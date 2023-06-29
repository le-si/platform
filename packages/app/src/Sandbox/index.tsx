import { useWindowSize } from "react-use";

import { Theme } from "~/Theme";

import { Code } from "./Code";

export function Sandbox<T extends Record<string, unknown>>({
  SandboxComponent,
  samples,
}: {
  SandboxComponent: React.FC<{ setOptions: (options: T) => void }>;
  samples: Record<Code.Language, string>;
}) {
  const [showCode, setShowCode] = useState(true);
  const [codeLanguage, setCodeLanguage] = useState<Code.Language>("typescript");
  const [options, setOptions] = useState<T>({} as T);

  const code = useMemo(() => {
    const hasActiveOption = Object.entries(options).find(
      ([_, value]) => value !== undefined
    );

    if (!hasActiveOption) return undefined;

    const code = samples[codeLanguage]
      .trim()
      .replace("{apiKey}", "YOUR API KEY");

    // replace {VALUE} with the value from the options object
    return Object.entries(options).reduce((acc, [key, value]) => {
      return acc.replace(`{${key}}`, `${value}`);
    }, code);
  }, [samples, codeLanguage, options]);

  const size = useWindowSize();

  return (
    <div className="flex h-full max-h-full min-h-0 grow flex-col gap-6 p-5 pt-0">
      <div className="flex min-h-0 grow gap-6">
        {size.width > 1024 &&
          (showCode && code ? (
            <Code
              code={code}
              language={codeLanguage}
              setLanguage={setCodeLanguage}
              onClose={() => setShowCode(false)}
            />
          ) : (
            <div
              className="flex w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-zinc-400 text-center text-xs transition-colors duration-100 hover:bg-zinc-100"
              onClick={() => setShowCode(true)}
            >
              <Theme.Icon.Code />
              View Code
            </div>
          ))}
        <SandboxComponent setOptions={setOptions} />
      </div>
    </div>
  );
}
