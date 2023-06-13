import { useNavigate, useSearchParams } from "react-router-dom";
import { Theme } from "~/Theme";
import { User } from "~/User";

import { Payments } from "./Payments";

export function Page() {
  const [searchParams] = useSearchParams();
  const autoFocusCredits = searchParams.has(Page.autoFocusSearchParam());

  return (
    <div className="h-full justify-between overflow-y-auto px-5 py-6">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-8">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <UserDetails />
            <User.Account.Support />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex grow flex-col flex-wrap gap-4">
              <User.Account.Credits autoFocus={autoFocusCredits} />
              <Payments.Table />
            </div>
            <User.APIKeys.Table />
          </div>
        </div>
        <User.Account.Danger />
      </div>
    </div>
  );
}

Page.autoFocusSearchParam = () => "credits" as const;
Page.url = (params?: { autoFocusCredits?: boolean }) =>
  params?.autoFocusCredits
    ? "/account?" + Page.autoFocusSearchParam()
    : "/account";

function UserDetails() {
  const { user, isLoading } = User.use();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, navigate, isLoading]);

  // const { data: organization } = Organization.use();

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
        {/* {organization ? (
          <span className="mt-1 w-fit rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            {organization.name}
          </span>
        ) : (
          <Theme.Skeleton className="mt-2 h-5 w-20" />
        )} */}
      </div>
    </div>
  );
}
