import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Input(props: Theme.Input) {
  const placeholder = FineTuning.Project.Name.Placeholder.use();
  const name = FineTuning.Project.Name.use();

  FineTuning.Project.Update.use({ name });

  return (
    <Theme.Input
      value={name}
      onChange={FineTuning.Project.Name.set}
      placeholder={placeholder}
      {...props}
    />
  );
}
