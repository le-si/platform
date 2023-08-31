import { Theme } from ".";

export namespace Loading {
  export function Overlay({ className }: Styleable) {
    return (
      <div
        className={classes(
          "flex h-screen items-center justify-center",
          className
        )}
      >
        <Theme.Icon.Spinner className="h-10 w-10" />
      </div>
    );
  }
}
