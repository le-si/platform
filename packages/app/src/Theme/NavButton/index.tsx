import { Link } from "react-router-dom";

export function NavButton({
  children,
  url,
  active
}: React.PropsWithChildren<{
  url: string;
  active?: boolean;
}>) {
  return (
    <Link
      to={url}
      className={classes(
        "border-b border-zinc-300 p-3 last:border-b-0",
        active ? "bg-indigo-500 text-white" : "duration-100 hover:bg-indigo-200"
      )}
    >
      {children}
    </Link>
  );
}
