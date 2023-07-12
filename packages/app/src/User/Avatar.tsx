import { Theme } from "~/Theme";
import { User } from "~/User";

export function Avatar({ className }: Styleable) {
  const { user } = User.use();

  if (!user) return null;

  return (
    <>
      {!!user.avatar ? (
        <img
          alt="User avatar"
          className={classes("h-8 w-8 rounded-full", className)}
          src={user.avatar}
        />
      ) : (
        <Theme.Icon.User className="flex h-8 w-8 rounded-full bg-gray-500/30 p-1.5" />
      )}
    </>
  );
}
