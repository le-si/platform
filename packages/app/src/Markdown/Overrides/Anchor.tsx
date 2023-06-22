import React, { MouseEventHandler } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { useNavigate } from "react-router-dom";

import { Scroll } from "~/Scroll";

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  ReactMarkdownProps;

/**
 * Renders an anchor tag that supports:
 *  - Links to headings within the same document
 *  - Internal links to other pages within the app
 *  - External links
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Anchor({ href, children, node: _node, ...props }: Props) {
  const navigate = useNavigate();

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (isLinkToHeading(href)) {
      event.preventDefault();
      navigate({ hash: href });
      Scroll.toElementByID(href.slice(1));
    } else if (isInternalLink(href)) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      className="link-hover link-primary link"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
}

function isLinkToHeading(href: string | undefined): href is string {
  return !!href && href.startsWith("#");
}

function isInternalLink(href: string | undefined): href is string {
  return !!href && href.startsWith("/");
}
