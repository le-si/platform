import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

export const Divider = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  node,
  ...props
}: JSX.IntrinsicElements["hr"] & ReactMarkdownProps) => (
  <hr {...props} className="my-8" />
);
