import * as Snackbar from "./Snackbar";

export function Provider({ children }: React.PropsWithChildren) {
  return <Snackbar.Provider>{children}</Snackbar.Provider>;
}
