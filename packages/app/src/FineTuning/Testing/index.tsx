import { GRPC } from "~/GRPC";
import { Theme } from "~/Theme";

export function FineTuningTesting() {
  const grpc = GRPC.use();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const execute = async () => {
      // const fineTuningRequestOrSomething = await grpc?.fineTuning.createModel()

      const response = await grpc?.dashboard?.getMe({}).response;
      const email = response?.email;

      email && setEmail(email);
    };

    execute();
  }, [grpc?.dashboard]);

  return (
    <Theme.Page>
      <div className="flex h-[500px] items-center justify-center text-3xl font-extrabold">
        {email ?? "Loading..."}
      </div>
    </Theme.Page>
  );
}
