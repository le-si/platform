//TODO: Remove @heroicons/react dependency
import * as Outlined from "@heroicons/react/24/outline";
import React from "react";
import { useCopyToClipboard } from "react-use";
import { Theme } from "~/Theme/index";

export function CopyToClipboard({
  content,
  onCopy,
  showTooltipOnCopy,
  tooltipPlacement,
  tooltip = "Copy",
  tooltipAfterCopy = "Copied!",
  className,
}: Styleable & {
  content: string;
  onCopy?: () => void;
  tooltip?: string;
  tooltipAfterCopy?: string;
  showTooltipOnCopy?: boolean;
  tooltipPlacement?: Theme.IconButton.Props["tooltipPlacement"];
} & Pick<Theme.IconButton.Props, "tooltipPlacement">) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState(tooltip);

  const handleCopy = React.useCallback(() => {
    if (isCopied) return;

    onCopy && onCopy();
    copyToClipboard(content);
    setTooltipText(tooltipAfterCopy);
    setIsCopied(true);
  }, [content, copyToClipboard, isCopied, onCopy, tooltipAfterCopy]);

  const resetTooltipText = React.useCallback(
    (open: boolean) => !open && setTooltipText(tooltip),
    [tooltip]
  );

  // Change state back after a short delay
  React.useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <Theme.IconButton
      tooltip={tooltipText}
      active={isCopied}
      forceTooltipOpen={showTooltipOnCopy && isCopied}
      tooltipPlacement={tooltipPlacement}
      onTooltipOpenOrClose={resetTooltipText}
      onClick={handleCopy}
      className={classes(className, isCopied && "opacity-100")}
    >
      <label className="swap-rotate swap">
        <input type="checkbox" readOnly checked={isCopied} />
        <Outlined.ClipboardDocumentCheckIcon className="swap-on h-5 w-5 text-green-300" />
        <Outlined.ClipboardIcon className="swap-off h-5 w-5 dark:text-gray-300" />
      </label>
    </Theme.IconButton>
  );
}
