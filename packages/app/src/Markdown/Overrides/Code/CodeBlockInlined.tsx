import { CodeProps } from "react-markdown/lib/ast-to-react";

type Props = Omit<CodeProps, "node" | "style" | "inline" | "children"> & {
  readonly code: string;
};

export const CodeBlockInlined = ({ code, ...props }: Props) => (
  <span className="inline-flex h-[1.23rem] items-center justify-center px-2 py-1">
    <code {...props}>{code}</code>
  </span>
);
