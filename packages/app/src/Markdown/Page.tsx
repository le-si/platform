import { Markdown } from "~/Markdown";

export function Page({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-[70rem] overflow-y-scroll">
      <Markdown>{children}</Markdown>
    </div>
  );
}
