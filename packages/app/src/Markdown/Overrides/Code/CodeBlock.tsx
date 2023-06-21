import { CodeProps } from "react-markdown/lib/ast-to-react";
import * as SyntaxHighlighter from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import { tomorrowNightBright as darkCodeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";

import { Markdown } from "~/Markdown";

import { CodeBlockButtons } from "./CodeBlockButtons";

const lineOfCodeHeight = 24;

SyntaxHighlighter.Light.registerLanguage("ts", typescript);
SyntaxHighlighter.Light.registerLanguage("tsx", typescript);
SyntaxHighlighter.Light.registerLanguage("python", python);
SyntaxHighlighter.Light.registerLanguage("bash", bash);
SyntaxHighlighter.Light.registerLanguage("shell", bash);

type Props = Omit<
  CodeProps,
  "node" | "style" | "className" | "inline" | "children"
> & {
  readonly code: string;
  readonly language: string | undefined;
};

/** Mobile-friendly, virtualized react-syntax-highlighter implementation using Highlight.js  */
export const CodeBlock = ({ code, language, ...props }: Props) => {
  //const colorScheme = GlobalState.useRead(Theme.ColorScheme.state);
  const numLines = useMemo(() => code.split("\n").length, [code]);

  const isTinyDevice = false; //Theme.useIsTinyDevice();
  const maxLinesForDevice = isTinyDevice ? 10 : 20;
  const containerHeight =
    numLines === 1
      ? "3rem"
      : Math.min(numLines, maxLinesForDevice) * lineOfCodeHeight +
        lineOfCodeHeight;

  return (
    <div
      style={{
        ...Markdown.presetFloatingBlock(),
        position: "relative",
        width: "100%",
        "& pre": {
          height: containerHeight,
          padding: "0 !important",
        },
      }}
    >
      <CodeBlockButtons code={code} />
      <SyntaxHighlighter.Light
        //style={colorScheme.value === "dark" ? darkCodeTheme : lightCodeTheme}
        style={darkCodeTheme}
        language={language}
        customStyle={{ margin: 0 }}
        PreTag="pre"
        renderer={VirtualRowRenderer}
        {...props}
      >
        {code}
      </SyntaxHighlighter.Light>
    </div>
  );
};

function VirtualRowRenderer({
  rows,
  stylesheet,
  useInlineStyles,
}: rendererProps) {
  return (
    <div className="h-full w-full">
      <AutoSizer>
        {({ height, width }: any) => (
          <FixedSizeList
            style={{ padding: "0.75em" }}
            height={height}
            width={width}
            itemCount={rows.length}
            itemSize={lineOfCodeHeight}
            itemData={{ rows, stylesheet, useInlineStyles }}
            overscanCount={2}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

function Row({ index, style, data }: ListChildComponentProps<rendererProps>) {
  const node = data.rows[index];
  if (!node) return null;
  return (
    <span>
      {SyntaxHighlighter.createElement({
        node,
        stylesheet: data.stylesheet,
        useInlineStyles: data.useInlineStyles,
        key: index,
        style: {
          ...style,
          top: typeof style.top === "number" ? style.top + 12 : 0,
        },
      })}
    </span>
  );
}
