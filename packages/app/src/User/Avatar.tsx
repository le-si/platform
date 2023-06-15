import { User } from "~/User";

export function Avatar({ className }: Styleable) {
  const { user } = User.use();

  if (!user) return null;

  return (
    <img
      className={classes("h-8 w-8 rounded-full", className)}
      src={user.avatar}
    />
  );
}
