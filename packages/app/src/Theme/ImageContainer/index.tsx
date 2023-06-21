import { Theme } from "~/Theme";

export type ImageContainer = StyleableWithChildren & {
  title?: string;
  src?: string;
  onClear?: () => void;
};

export function ImageContainer({
  title,
  src,
  children,
  className,
  onClear,
}: ImageContainer) {
  return (
    <div
      className={classes(
        "flex h-fit w-fit flex-col gap-2 rounded-lg",
        className
      )}
    >
      {title && <p className="text-sm">{title}</p>}
      {src ? (
        <img
          className="aspect-square w-[400px] rounded object-cover drop-shadow-lg"
          src={src}
        />
      ) : (
        <div className="h-[400px] w-[400px] rounded border border-zinc-300 bg-gray-50"></div>
      )}
      {(children || onClear) && (
        <div className="flex items-center justify-between">
          {children ? <div className="flex">{children}</div> : <div />}
          {onClear && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-zinc-400 duration-100 hover:text-black"
            >
              Clear Image
              <Theme.Icon.X className="h-3 w-3 rounded-full border border-zinc-400 p-px" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
