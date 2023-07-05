import { Theme } from "~/Theme";

export function NotFound() {
  return (
    <Theme.Page>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page not found</p>
      </div>
    </Theme.Page>
  );
}
