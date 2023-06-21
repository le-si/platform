import React from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

type Props = React.DetailedHTMLProps<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
> &
  ReactMarkdownProps;

export function Link({ href, children }: Props) {
  return <link href={href}>{children}</link>;
}
