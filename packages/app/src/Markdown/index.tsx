import * as React from "react";
import { default as ReactMarkdown } from "react-markdown";
import { default as supportForCodeHighlighting } from "rehype-highlight";
import { default as supportForAutomaticHeaderIDs } from "rehype-slug";
import { remarkHeadingId as supportForCustomHeaderIDs } from "remark-custom-heading-id";
import { default as supportForGithubMarkdown } from "remark-gfm";
import { default as supportForAutomaticTableOfContents } from "remark-toc";

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
        supportForGithubMarkdown,
        supportForCustomHeaderIDs,
        supportForAutomaticTableOfContents,
      ]}
      rehypePlugins={[
        supportForAutomaticHeaderIDs,
        supportForCodeHighlighting,
        AutoHeaderLinker.plugin(),
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
        "prose dark:prose-invert mx-auto my-8 px-5 2xl:max-w-[93rem]",
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
