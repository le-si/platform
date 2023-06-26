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
        "px-5 py-3.5 text-[14px] hover:bg-[#e4e4ce] active:bg-[#e4e4ce]",
        active && "active"
      )}
    >
      {children}
    </Link>
  );
}
