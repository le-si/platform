import * as ReactQuery from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { SDK } from "~/SDK";

export namespace Delete {
  export const use = () => {
    const context = SDK.Context.use();
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    const execute = ReactQuery.useMutation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await context!.dashboard.deleteAccount({});
      setDeleted(true);
    });

    useEffect(() => {
      deleted && navigate("/");
    }, [deleted, navigate]);

    return context !== undefined ? execute : undefined;
  };
}
