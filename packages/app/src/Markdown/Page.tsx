import { App } from "~/App";
import { Markdown } from "~/Markdown";
import { Scroll } from "~/Scroll";

export function Page({ children }: { children: string }) {
  Scroll.useListenForURLChanges();

  return (
    <App.Page>
      <div className="mx-auto max-w-[70rem]">
        <Markdown>{children}</Markdown>
      </div>
    </App.Page>
  );
}
