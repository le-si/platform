import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { Markdown } from "~/Markdown";

export const Image = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  node,
  ...props
}: JSX.IntrinsicElements["img"] & ReactMarkdownProps) => (
  <span
    style={{
      ...Markdown.presetFloatingBlock(),

      "& > img": {
        maxWidth: "100%",
        display: "block",
      },
    }}
  >
    <img {...props} />
  </span>
);
