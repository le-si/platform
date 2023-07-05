import { Theme } from ".";

export namespace Loading {
  export function Overlay() {
    return (
      <div className="flex h-[calc(100vh-20rem)] items-center justify-center">
        <Theme.Icon.Spinner className="h-10 w-10" />
      </div>
    );
  }
}
