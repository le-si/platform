import SyntaxHighlighter from "react-syntax-highlighter";

// theme styles
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, X } from "~/Theme";

export type Languages = "python" | "javascript" | "typescript";

export function Code({
  content,
  language,
  setLanguage,
  onClose
}: {
  content: string;
  language: Languages;
  setLanguage: (language: Languages) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="flex w-full max-w-[50rem] shrink flex-col overflow-hidden overflow-x-auto rounded-xl bg-[#2b2b2b]"
      style={a11yDark}
    >
      <div className="flex w-full gap-1 border-b border-[#424242] p-2">
        <LanguageButton
          language="Typescript"
          onClick={() => setLanguage("typescript")}
          active={language === "typescript"}
        />
        <LanguageButton
          language="Javascript"
          onClick={() => setLanguage("javascript")}
          active={language === "javascript"}
        />
        <LanguageButton
          language="Python"
          onClick={() => setLanguage("python")}
          active={language === "python"}
        />

        {/* copy button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
          }}
          className="ml-auto rounded border border-transparent p-1 text-xs text-white duration-100 hover:bg-white hover:text-black"
        >
          <Copy className="h-4 w-4" />
        </button>

        {/* close button */}
        <button
          onClick={onClose}
          className="aspect-square rounded border border-transparent p-1 px-1.5 text-xs text-white duration-100 hover:bg-white hover:text-black"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        showLineNumbers
        style={a11yDark}
        customStyle={{
          width: "100%",
          height: "100%",
          fontSize: "0.85rem",
          textAlign: "left"
        }}
        lineNumberStyle={{
          color: "#666666"
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}

function LanguageButton({
  language,
  onClick,
  active
}: {
  language: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={classes(
        "flex items-center justify-center rounded border border-transparent px-1.5 text-xs text-white duration-100",
        active ? "bg-white text-black" : "hover:border-zinc-400"
      )}
    >
      {language}
    </button>
  );
}
