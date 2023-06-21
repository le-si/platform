import { Theme } from "~/Theme";

export type Button = StyleableWithChildren & {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  link?: string;
  loading?: boolean;
};

export function Button({
  children,
  active,
  disabled,
  onClick,
  className,
  variant,
  link,
  loading,
}: Button) {
  return (
    <button
      disabled={disabled}
      onClick={link && !onClick ? () => window.open(link, "_blank") : onClick}
      className={classes(
        active && "hover",
        "h-fit w-full max-w-[20rem] grow-0 rounded-lg p-2.5 text-sm text-white duration-100 focus:outline-1 focus:outline-black/10",
        variant === "primary"
          ? "bg-brand-orange/90"
          : "bg-brand-amber-1 text-black",
        disabled
          ? "opacity-60"
          : variant === "primary"
          ? "hover:bg-brand-orange"
          : "hover:bg-brand-amber-2",
        link && "flex items-center justify-between gap-2 text-left",
        loading && "pointer-events-none relative opacity-80",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Theme.Icon.Spinner className="h-4 w-4 text-black" />
        </div>
      )}
      <span
        className={classes(
          "flex items-center justify-center",
          loading && "opacity-30"
        )}
      >
        {children}
      </span>
      {link && (
        <Theme.Icon.Link color={variant === "primary" ? "white" : undefined} />
      )}
    </button>
  );
}
