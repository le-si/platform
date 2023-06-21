import { CodeComponent, CodeProps } from "react-markdown/lib/ast-to-react";

import { CodeBlock } from "./CodeBlock";
import { CodeBlockInlined } from "./CodeBlockInlined";

export const Code: CodeComponent = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  node,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  style,
  children,
  inline,
  ...props
}: CodeProps) => {
  const match = /language-(\w+)/.exec(props.className || "");
  const code = children.join().replace(/\n$/, "").trim();

  return !inline && match ? (
    <CodeBlock code={code} language={match[1]} {...props} />
  ) : (
    <CodeBlockInlined code={code} {...props} />
  );
};
