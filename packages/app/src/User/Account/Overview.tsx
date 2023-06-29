import { useNavigate } from "react-router-dom";
import { Theme } from "~/Theme";

import { User } from "..";

export function Overview() {
  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <UserDetails />
        </div>
      </div>
      <User.Account.Danger />
    </div>
  );
}

function UserDetails() {
  const { user, isLoading } = User.use();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, navigate, isLoading]);

  return (
    <div className="flex items-center gap-4">
      <User.Avatar className="h-[100px] w-[100px]" />
      <div className="flex flex-col justify-between gap-1 text-left">
        {user?.name ? (
          <h5 className="text-2xl font-medium text-zinc-900 dark:text-white">
            {user.name}
          </h5>
        ) : (
          <Theme.Skeleton className="h-4 w-32" />
        )}
        {user?.email ? (
          <span className="text-md text-zinc-500 dark:text-zinc-400">
            {user.email}
          </span>
        ) : (
          <Theme.Skeleton className="mt-2 h-4 w-20" />
        )}
      </div>
    </div>
  );
}
