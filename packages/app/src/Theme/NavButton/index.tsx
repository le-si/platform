import { Link } from "react-router-dom";

export function NavButton({
  children,
  className,
  url,
  active
}: StyleableWithChildren<{
  url: string;
  active?: boolean;
}>) {
  return (
    <div
      className={classes(
        "w-full overflow-hidden rounded-lg text-black/75 duration-75 hover:bg-black/10 hover:text-black active:bg-[#e4e4ce] active:text-black",
        active && "active",
        className
      )}
    >
      <Link
        to={url}
        className={classes(
          "flex w-full items-center justify-between px-3 py-2 text-[14px]"
        )}
      >
        {children}
      </Link>
    </div>
  );
}
