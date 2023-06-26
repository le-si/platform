import React from "react";

import * as ReactMarkdown from "react-markdown/lib/ast-to-react";

type Props = Omit<
  ReactMarkdown.CodeProps,
  "node" | "style" | "inline" | "children"
> & {
  readonly code: string;
};

export function CodeInline({ code, ...props }: Props) {
  return (
    <code {...props} className="rounded-md px-1.5 py-0.5 font-light shadow">
      {code}
    </code>
  );
}
