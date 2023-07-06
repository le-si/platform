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
    <div
      className={classes(
        "overflow-hidden rounded-lg text-black/75 duration-75 hover:bg-black/10 hover:text-black active:bg-[#e4e4ce] active:text-black",
        active && "active"
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
