import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Input(props: Theme.Input) {
  const placeholder = FineTuning.Project.Name.Placeholder.use();
  const name = FineTuning.Project.Name.use();

  const resp = FineTuning.Project.Update.use({ name });

  const valid = useMemo(() => {
    if (name === "") return true; // this will use the placeholder

    if (name.length < 3) return false;
    if (name.length > 64) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(name)) return false;
    return true;
  }, [name]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex max-w-[22rem] items-center gap-2">
        <Theme.Input
          value={name}
          onChange={FineTuning.Project.Name.set}
          placeholder={placeholder}
          grow
          {...props}
          className={classes(!valid && "border-red-500", props.className)}
        />
        {!valid ? (
          <Theme.Icon.X
            className={classes("absolute left-[calc(100%+.5rem)] text-red-500")}
          />
        ) : (
          <Theme.Icon.Check
            className={classes(
              "absolute left-[calc(100%+.5rem)] text-green-500 opacity-0 duration-100",
              name === resp.data?.title && "opacity-100"
            )}
          />
        )}
      </div>
      {!valid && (
        <p className="max-w-[22rem] select-none text-xs text-red-500 opacity-75">
          Model name must be between 3 and 64 characters long and can only
          contain letters, numbers and dashes.
        </p>
      )}
    </div>
  );
}
