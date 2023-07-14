import { CookieNotice } from ".";

export function Provider({ children }: React.PropsWithChildren) {
  return (
    <>
      <CookieNotice.Modal />
      {children}
    </>
  );
}
