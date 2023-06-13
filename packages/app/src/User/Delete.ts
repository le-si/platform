import * as ReactQuery from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GRPC } from "~/GRPC";

export namespace Delete {
  export const use = () => {
    const grpc = GRPC.use();
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    const execute = ReactQuery.useMutation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await grpc!.dashboard.deleteAccount({});
      setDeleted(true);
    });

    useEffect(() => {
      deleted && navigate("/");
    }, [deleted, navigate]);

    return grpc !== undefined ? execute : undefined;
  };
}
