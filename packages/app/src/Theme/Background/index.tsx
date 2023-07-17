export function Background({
  title,
  titleRight,
  icon,
  sidebar,
  sidebarBottom,
  className,
  children,
}: Background.Props) {
  const content = <div className="relative w-full grow">{children}</div>;
  return (
    <div
      className={classes(
        "bg-brand-amber-1 flex min-h-full w-fit flex-col rounded-xl",
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-zinc-300 p-3 text-lg">
          {icon && <div>{icon}</div>}
          <div>{title}</div>
          {titleRight && <div className="ml-auto">{titleRight}</div>}
        </div>
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

export namespace Background {
  export type Props = StyleableWithChildren & {
    title?: React.ReactNode;
    titleRight?: React.ReactNode;
    icon?: React.ReactNode;
    sidebar?: React.ReactNode;
    sidebarBottom?: React.ReactNode;
  };
}
