import React from "react";
import { Theme } from "~/Theme/index";

type Props = StyleableWithChildren<{
  tooltip?: string;
  tooltipPlacement?: React.ComponentProps<typeof Theme.Tooltip>["placement"];
  onTooltipOpenOrClose?: (open: boolean) => void;
  forceTooltipOpen?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  hidden?: boolean;
}>;

export function IconButton({
  tooltip,
  tooltipPlacement,
  onTooltipOpenOrClose,
  forceTooltipOpen,
  onClick,
  active,
  disabled,
  hidden,
  className,
  children,
}: IconButton.Props) {
  return (
    <Theme.Tooltip
      showArrow
      content={tooltip ?? ""}
      placement={tooltipPlacement}
      onChange={onTooltipOpenOrClose}
      forceOpen={forceTooltipOpen}
    >
      <button
        className={classes(
          "flex items-center justify-center p-2",
          "opacity-50 transition-all duration-100 hover:opacity-100",
          active && "dark:text-white-900 text-gray-500",
          disabled && "pointer-events-none opacity-30 dark:opacity-20",
          hidden && "pointer-events-none opacity-0 dark:opacity-0",
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Theme.Tooltip>
  );
}

export declare namespace IconButton {
  export { Props };
}
