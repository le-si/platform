import { FineTuning } from "~/FineTuning";
import { Theme } from "~/Theme";

export type Name = string;
export namespace Name {
  export const preset = () => "My Model";

  export function Input(props: Theme.Input) {
    const [name, setName] = useState(preset());

    const input = FineTuning.Input.use();
    const project = FineTuning.Project.use();

    input;
    project;

    return (
      <Theme.Input
        value={name}
        onChange={setName}
        placeholder={preset()}
        {...props}
      />
    );
  }
}
