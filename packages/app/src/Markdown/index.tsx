import * as React from "react";
import { default as ReactMarkdown } from "react-markdown";
import {
  default as syntaxHighlighting,
  Options as SyntaxHighlightingOptions,
} from "rehype-highlight";
import { remarkHeadingId as customIDForHeadingsPlugin } from "remark-custom-heading-id";
import { default as gitHubMarkdownSupport } from "remark-gfm";

import tableOfContentsSupport from "remark-toc";

import { AutoHeaderLinker } from "./AutoHeaderLinker";

import * as Overrides from "./Overrides";
import { Page } from "./Page";
import * as Pages from "./Pages";

export function Markdown({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        gitHubMarkdownSupport,
        customIDForHeadingsPlugin,
        tableOfContentsSupport,
      ]}
      rehypePlugins={[
        // autoGenerateHeaderIDs,
        AutoHeaderLinker.plugin(),
        [
          syntaxHighlighting,
          { ignoreMissing: true } as SyntaxHighlightingOptions,
        ],
      ]}
      components={{
        code: Overrides.Code,
        a: Overrides.Anchor,
        hr: Overrides.Divider,
        img: Overrides.Image,
        table: Overrides.Table,
        thead: Overrides.Table.THead,
        tbody: Overrides.Table.TBody,
        th: Overrides.Table.Th,
        td: Overrides.Table.Td,
        tr: Overrides.Table.Tr,
      }}
      className={classes(
        "markdown-root",
        "prose dark:prose-invert mx-auto my-8 px-5 2xl:max-w-[93rem] 2xl:px-0",
        className
      )}
    >
      {children}
    </ReactMarkdown>
  );
}

export declare namespace Markdown {
  export { Page, Pages };
}

export type Markdown = string;
export namespace Markdown {
  Markdown.Page = Page;
  Markdown.Pages = Pages;

  export function presetFloatingBlock(): React.CSSProperties {
    return {
      display: "inline-block",
      maxWidth: "100%",
      overflow: "auto",

      marginTop: 2,
      marginBottom: 3,

      // boxShadow: 5,
      borderRadius: 1,
    };
  }
}
