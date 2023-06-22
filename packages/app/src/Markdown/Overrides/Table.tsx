import React from "react";
import {
  TableDataCellProps,
  TableHeaderCellProps,
  TableRowProps,
} from "react-markdown/lib/ast-to-react";
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
  export function THead({ children }: ReactMarkdownProps) {
    return <thead className="p-3">{children}</thead>;
  }

  export function TBody({ children }: ReactMarkdownProps) {
    return <tbody className="p-3">{children}</tbody>;
  }

  export function Th({ children }: TableHeaderCellProps) {
    return (
      <th className="whitespace-nowrap text-center font-bold">{children}</th>
    );
  }

  export function Td({ children }: TableDataCellProps) {
    return <td className="text-center">{children}</td>;
  }

  export function Tr({ children, isHeader }: TableRowProps) {
    return isHeader ? (
      <tr>{children}</tr>
    ) : (
      <tr className="[&:last-child td]:border-none">{children}</tr>
    );
  }
}
