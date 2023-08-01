import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export function Input(props: Theme.Input) {
  const placeholder = FineTuning.Project.Name.Placeholder.use();
  const [name, setName] = useState("");

  FineTuning.Project.Update.use({ name });

  return (
    <Theme.Input
      value={name}
      onChange={setName}
      placeholder={placeholder}
      {...props}
    />
  );
}
