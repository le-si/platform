import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Input(props: Theme.Input) {
  const placeholder = FineTuning.Project.Name.Placeholder.use();
  const name = FineTuning.Project.Name.use();

  const resp = FineTuning.Project.Update.use({ name });

  return (
    <div className="relative flex max-w-[22rem] items-center gap-2">
      <Theme.Input
        value={name}
        onChange={FineTuning.Project.Name.set}
        placeholder={placeholder}
        grow
        {...props}
      />
      <Theme.Icon.Check
        className={classes(
          "absolute left-[calc(100%+.5rem)] text-green-500 opacity-0 duration-100",
          name === resp.data?.title && "opacity-100"
        )}
      />
    </div>
  );
}
