import { Markdown } from "~/Markdown";

export function Page({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div className="mx-auto max-w-[70rem] overflow-y-scroll">
      <Markdown>{children}</Markdown>
    </div>
  );
}
