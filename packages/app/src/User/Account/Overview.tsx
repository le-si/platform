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

export namespace Overview {
  export const uri = () => "overview" as const;
  export const url = () => `${User.Account.Page.url()}/${uri()}` as const;
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
      <User.Avatar className="h-[75px] w-[75px]" />
      <div className="flex flex-col justify-between gap-2 text-left">
        {user?.name ? (
          <h5 className="flex flex-col items-start gap-1 text-left text-3xl font-medium text-zinc-900 dark:text-white lg:flex-row lg:items-center">
            {user.name}
            {user?.email ? (
              <span className="text-left text-xl text-zinc-500 dark:text-zinc-400">
                ({user.email})
              </span>
            ) : (
              <Theme.Skeleton className="h-4 w-20" />
            )}
          </h5>
        ) : (
          <Theme.Skeleton className="h-4 w-32" />
        )}
        {user?.organizationID ? (
          <span className="w-fit rounded border border-zinc-300 bg-black/10 px-1 text-sm text-zinc-600 dark:text-zinc-400">
            {user.organizationID}
          </span>
        ) : (
          <Theme.Skeleton className="mt-2 h-4 w-20" />
        )}
      </div>
    </div>
  );
}
