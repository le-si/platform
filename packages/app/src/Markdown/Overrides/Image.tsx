import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { Markdown } from "~/Markdown";

export const Image = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  node,
  ...props
}: JSX.IntrinsicElements["img"] & ReactMarkdownProps) => (
  <span
    style={Markdown.presetFloatingBlock()}
    css={css`
      & > img {
        max-width: 100%;
        max-height: 30rem;
        display: block;
        border-radius: 0.5rem;
      }
    `}
  >
    <img {...props} />
  </span>
);
