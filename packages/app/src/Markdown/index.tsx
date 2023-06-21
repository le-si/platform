import React from "react";
import ReactMarkdown from "react-markdown";
import allowHTMLPlugin from "rehype-raw";
import { remarkHeadingId as customIDForHeadingsPlugin } from "remark-custom-heading-id";
import allowGitHubMarkdownPlugin from "remark-gfm";

import { AutoLinkPlugin } from "./AutoLinkPlugin";
import * as Overrides from "./Overrides";
import { Page } from "./Page";
import * as Pages from "./Pages";

import { Page as PageComponent } from "../App/Page";

export function Markdown({ children }: { children: React.ReactNode }) {
  return (
    <PageComponent>
      {typeof children === "string" ? (
        <div style={AutoLinkPlugin.styles()}>
          <ReactMarkdown
            {...{ remarkPlugins, rehypePlugins, components }}
            className="prose mx-auto my-8 px-5 2xl:max-w-[93rem] 2xl:px-0"
          >
            {children}
          </ReactMarkdown>
        </div>
      ) : null}
    </PageComponent>
  );
}

const remarkPlugins = [allowGitHubMarkdownPlugin, customIDForHeadingsPlugin];
const rehypePlugins = [...AutoLinkPlugin.config(), allowHTMLPlugin];

const components = {
  table: Overrides.Table,
  thead: Overrides.Table.THead,
  tbody: Overrides.Table.TBody,
  th: Overrides.Table.Th,
  td: Overrides.Table.Td,
  tr: Overrides.Table.Tr,
  link: Overrides.Link,
  a: Overrides.Anchor,
  hr: Overrides.Divider,
  img: Overrides.Image,
  code: Overrides.Code
};

export declare namespace Markdown {
  export { Page, Pages };
}

export type Markdown = string;
export namespace Markdown {
  Markdown.Page = Page;
  Markdown.Pages = Pages;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function presetFloatingBlock(): any {
    return {
      display: "inline-block",
      maxWidth: "100%",
      overflow: "auto",

      mt: 2,
      mb: 3,

      boxShadow: 5,
      borderRadius: 1
    };
  }
}
