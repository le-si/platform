export function Panel({ className, children }: StyleableWithChildren) {
  return (
    <div className={classes("bg-brand-amber-1 rounded border p-5", className)}>
      {children}
    </div>
  );
}
