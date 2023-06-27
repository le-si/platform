import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

export const Blockquote = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  node,
  ...props
}: JSX.IntrinsicElements["blockquote"] & ReactMarkdownProps) => (
  <span>
    <p
      {...(props as JSX.IntrinsicElements["p"])}
      className="not-prose bg-brand-amber-1 m-0 w-fit rounded-xl border-zinc-300 p-3 font-medium"
    >
      <span className="m-0">{props.children}</span>
    </p>
  </span>
);
