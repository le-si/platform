import { CustomContentProps, SnackbarProvider } from "notistack";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function Provider({ children }: React.PropsWithChildren) {
  return (
    <SnackbarProvider
      maxSnack={6}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      classes={{
        containerRoot:
          "[&>div]:w-full [word-break:break-word] md:max-w-[75%] lg:max-w-[50%]",
      }}
      Components={{
        default: DefaultSnackbar,
        info: InfoSnackbar,
        error: ErrorSnackbar,
        success: SuccessSnackbar,
        warning: WarningSnackbar,
        outOfCredits: OutOfCreditsSnackbar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

declare module "notistack" {
  interface VariantOverrides {
    outOfCredits: true;
  }
}

const BaseSnackbar = React.forwardRef<
  HTMLDivElement,
  CustomContentProps & { Icon?: React.ReactElement }
>(({ id, message, persist, Icon }, ref) => {
  const { closeSnackbar } = Theme.Snackbar.use();
  return (
    <div
      className="mb-4 flex items-center gap-4 rounded-lg border border-zinc-700 bg-white p-3 text-zinc-500 shadow dark:bg-zinc-900 dark:text-zinc-400"
      role="alert"
      ref={ref}
    >
      {Icon}
      <div className="max-h-[10rem] overflow-y-auto overscroll-none">
        {message}
      </div>
      {persist && (
        <div className="flex flex-grow justify-end">
          <button
            type="button"
            className="inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-white"
            onClick={() => closeSnackbar(id)}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});

const ErrorSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => (
    <BaseSnackbar
      {...props}
      ref={ref}
      Icon={
        <Theme.Icon.AlertTriangle className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-red-600 dark:text-red-500" />
      }
    />
  )
);

const WarningSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => (
    <BaseSnackbar
      {...props}
      ref={ref}
      Icon={
        <Theme.Icon.AlertCircle className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-orange-600 dark:text-orange-500" />
      }
    />
  )
);

const InfoSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => (
    <BaseSnackbar
      {...props}
      ref={ref}
      Icon={
        <Theme.Icon.Info className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-blue-600 dark:text-blue-500" />
      }
    />
  )
);

const SuccessSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => (
    <BaseSnackbar
      {...props}
      ref={ref}
      Icon={
        <Theme.Icon.Check className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-emerald-600 dark:text-emerald-500" />
      }
    />
  )
);

const DefaultSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => <BaseSnackbar {...props} ref={ref} />
);

const OutOfCreditsSnackbar = React.forwardRef<
  HTMLDivElement,
  Theme.Snackbar.CustomContentProps
>(({ id, message, persist }, ref) => {
  const { closeSnackbar } = Theme.Snackbar.use();
  const navigate = useNavigate();

  if (persist) {
    console.error("Setting 'persist' on OutOfCreditsSnackbar is not supported");
  }

  const onClick = useCallback(() => {
    closeSnackbar(id);
    navigate(User.Account.Credits.url());
  }, [closeSnackbar, id, navigate]);

  return (
    <div
      className="mb-4 flex items-center rounded-lg border-2 border-zinc-700 bg-white p-4 text-zinc-500 shadow dark:bg-zinc-900 dark:text-zinc-400"
      role="alert"
      ref={ref}
    >
      <Theme.Icon.AlertCircle className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-orange-600 dark:text-orange-500" />
      <div className="text-md ml-3 font-semibold">{message}</div>
      <Theme.Button className="ml-8 w-fit" onClick={onClick}>
        Buy credits
      </Theme.Button>
    </div>
  );
});
