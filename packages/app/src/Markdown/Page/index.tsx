import { App } from "~/App";
import { Markdown } from "~/Markdown";

export function Page({ children }: React.PropsWithChildren) {
  return (
    <App.Page>
      <div className="mx-auto max-w-[100rem]">
        {typeof children === "string" ? (
          <Markdown>{children}</Markdown>
        ) : (
          children
        )}
      </div>
    </App.Page>
  );
}
