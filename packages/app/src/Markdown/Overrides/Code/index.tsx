import React from "react";

import * as ReactMarkdown from "react-markdown/lib/ast-to-react";

import { CodeBlock } from "./CodeBlock";
import { CodeInline } from "./CodeInline";
import "./syntax-highlighting.scss";

export const Code: ReactMarkdown.CodeComponent = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node: _node,
  children,
  inline,
  ...props
}) => {
  const match = /language-(\w+)/.exec(props.className || "");
  const code = stringifyChildren(children);

  return !inline && match && match[1] ? (
    <CodeBlock code={code} language={match[1]} {...props}>
      {children}
    </CodeBlock>
  ) : (
    <CodeInline code={code} {...props} />
  );
};

function stringifyChildren(children: React.ReactNode[]): string {
  let code = "";

  for (const child of children) {
    if (!child) continue;

    if (isPrimitive(child)) {
      code += child;
    } else if (isReactComponent(child)) {
      code += stringifyChildren(child.props.children);
    }
  }

  return code;
}

function isPrimitive(value: unknown): value is string | number | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function isReactComponent(
  value: unknown
): value is React.ReactElement<{ children: React.ReactNode[] }> {
  return (
    React.isValidElement<{ children: unknown }>(value) &&
    "children" in value.props &&
    Array.isArray(value.props.children)
  );
}
