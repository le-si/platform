import React from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

import { Markdown } from "~/Markdown";

export function Table({
  children,
}: React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> &
  ReactMarkdownProps) {
  return (
    <span className="w-full" style={Markdown.presetFloatingBlock()}>
      <table className="w-full">{children}</table>
    </span>
  );
}

export namespace Table {
  export const THead = function THead({ children }: ReactMarkdownProps) {
    return <thead className="p-3">{children}</thead>;
  };

  export const TBody = function TBody({ children }: ReactMarkdownProps) {
    return <tbody className="p-3">{children}</tbody>;
  };

  export const Th = function Th({ children }: ReactMarkdownProps) {
    return (
      <th className="whitespace-nowrap text-center font-bold">{children}</th>
    );
  };

  export const Td = function Td({ children }: ReactMarkdownProps) {
    return <td className="text-center">{children}</td>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Tr = function Tr({ children, isHeader }: any) {
    return isHeader ? (
      <tr>{children}</tr>
    ) : (
      <tr className="[&:last-child td]:border-none">{children}</tr>
    );
  };
}
