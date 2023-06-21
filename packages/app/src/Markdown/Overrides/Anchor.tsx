import React from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { AutoLinkPlugin } from "~/Markdown/AutoLinkPlugin";

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  ReactMarkdownProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Anchor({ href, children, node, ...props }: Props) {
  if (props.className === AutoLinkPlugin.className) {
    console.log("Anchor", { href, children, node, props });
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    //component links to external site
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-brand-300 hover:text-brand-400 hover:underline"
    >
      {children}
    </a>
  );
}
