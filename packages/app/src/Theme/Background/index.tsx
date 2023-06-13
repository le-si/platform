export type Background = StyleableWithChildren & {
  title?: string;
  sidebar?: React.ReactNode;
  sidebarBottom?: React.ReactNode;
};

export function Background({
  className,
  children,
  title,
  sidebar,
  sidebarBottom
}: Background) {
  const content = <div className="h-full w-full p-3">{children}</div>;

  return (
    <div
      className={classes(
        "bg-brand-amber-1 flex h-full w-fit flex-col overflow-auto rounded-xl",
        className
      )}
    >
      {title && (
        <div className="border-b border-zinc-300 p-3 text-lg">{title}</div>
      )}
      {sidebar ? (
        <div className="flex h-full min-h-0 w-full">
          <div className="flex flex-col border-r border-zinc-300">
            <div className="min-h-0 w-[20rem] overflow-y-auto overflow-x-hidden p-3">
              {sidebar}
            </div>
            {sidebarBottom && (
              <div className="mt-auto border-t border-zinc-300">
                {sidebarBottom}
              </div>
            )}
          </div>
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}
