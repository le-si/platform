import { useCopyToClipboard } from "react-use";
import { Theme } from "~/Theme";

export function CodeBlockButtons({ code }: { code: string }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "0.8rem",
        top: "0.2rem",
        zIndex: 1,
      }}
    >
      <CopyCodeToClipboardButton code={code} />
    </div>
  );
}

function CopyCodeToClipboardButton({ code }: { code: string }) {
  const [clipboard, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => setIsCopied(clipboard.value === code), [code, clipboard]);

  return (
    <Theme.Tooltip
      forceOpen={isCopied}
      content={isCopied ? "Copied!" : "Copy snippet"}
    >
      <Theme.Button
        icon={Theme.Icon.Copy}
        onClick={() => {
          copyToClipboard(code);
          setTimeout(() => setIsCopied(false), 200);
        }}
      />
    </Theme.Tooltip>
  );
}
