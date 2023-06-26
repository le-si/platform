import { App } from "~/App";
import { Markdown } from "~/Markdown";
import { Scroll } from "~/Scroll";

export function Page({ children }: React.PropsWithChildren) {
  Scroll.useListenForURLChanges();
  return (
    <App.Page>
      <div className="mx-auto max-w-[120rem]">
        {typeof children === "string" ? (
          <Markdown>{children}</Markdown>
        ) : (
          children
        )}
      </div>
    </App.Page>
  );
}
