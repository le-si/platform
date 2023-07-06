import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";

export function Page({ children }: React.PropsWithChildren) {
  return (
    <Theme.Page>
      <div className="mx-auto max-w-[100rem] px-5 sm:px-0">
        {typeof children === "string" ? (
          <Markdown>{children}</Markdown>
        ) : (
          children
        )}
      </div>
    </Theme.Page>
  );
}
