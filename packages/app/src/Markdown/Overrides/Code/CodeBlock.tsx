import React from "react";
import * as ReactMarkdown from "react-markdown/lib/ast-to-react";
import { Theme } from "~/Theme";

type Props = Omit<
  ReactMarkdown.CodeProps,
  "node" | "style" | "className" | "inline"
> & {
  readonly code: string;
  readonly language: string;
};

export function CodeBlock({ code, children, language, ...props }: Props) {
  return (
    <>
      <Header language={language} code={code} />
      <div className="relative" {...props}>
        <>{children}</>
      </div>
    </>
  );
}

function Header({
  language,
  code
}: {
  language: string | undefined;
  code: string;
}) {
  return (
    <div className="code-block-header">
      <span>{language}</span>
      <Theme.CopyToClipboard
        showTooltipOnCopy={!isMobileDevice()}
        content={code}
        tooltipPlacement="left"
        className="p-1"
      />
    </div>
  );
}

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
