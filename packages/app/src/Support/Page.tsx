import { enqueueSnackbar } from "notistack";

import { useEffect } from "react";
import { Support } from "~/Support";
import { Theme } from "~/Theme";
import { User } from "~/User";

export function Page() {
  const { user } = User.use();

  const [form, setForm] = useState<Support.formData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    subject: "",
    type: "Question",
    description: "",
    priority: 1,
    status: 2,
    source: 2
  });

  useEffect(
    () =>
      setForm((form) => ({
        ...form,
        name: user?.name ?? "",
        email: user?.email ?? ""
      })),
    [user?.name, user?.email]
  );

  const submitMutation = Support.useSubmitTicket(form);
  const fields = Support.useGetTicketFields();

  useEffect(() => {
    submitMutation.isSuccess &&
      enqueueSnackbar("Your ticket has been submitted!", {
        variant: "success"
      });
  }, [submitMutation.isSuccess]);

  useEffect(() => {
    submitMutation.isError &&
      enqueueSnackbar(`${submitMutation.error}`, {
        variant: "error"
      });
  }, [submitMutation.isError, submitMutation.error]);

  return (
    <div className="mt-16 flex h-full w-full flex-col items-center justify-center">
      <div className="align-center mx-auto flex w-full max-w-[40rem] flex-col justify-center gap-2 px-5 transition-all duration-300">
        <h1 className="mb-4 text-4xl font-bold">Support</h1>
        <label className={`-mb-1 mt-1 text-sm font-semibold text-white/50`}>
          Name
        </label>
        <Theme.Input
          value={form.name ?? ""}
          className="max-w-full"
          placeholder="Name"
          onChange={(e) => {
            setForm({
              ...form,
              name: e
            });
          }}
        />
        <label className={`-mb-1 mt-1 text-sm font-semibold text-white/50`}>
          Email
        </label>
        <Theme.Input
          value={form.email ?? ""}
          className="max-w-full"
          placeholder="Email"
          onChange={(e) => {
            setForm({
              ...form,
              email: e
            });
          }}
        />
        <label className={`-mb-1 mt-1 text-sm font-semibold text-white/50`}>
          Type
        </label>
        <Theme.Select
          value={form.type}
          placeholder="Category"
          className="max-w-full"
          onChange={(value) =>
            setForm({
              ...form,
              type: value
            })
          }
          options={fields.data?.choices.map((choice: any) => ({
            label: choice.label,
            value: choice.label
          }))}
        />
        <label className={`-mb-1 mt-1 text-sm font-semibold text-white/50`}>
          Subject
        </label>
        <Theme.Input
          value={form.subject}
          placeholder="Subject"
          className="max-w-full"
          onChange={(e) => {
            setForm({
              ...form,
              subject: e
            });
          }}
        />
        <label className={`-mb-1 mt-1 text-sm font-semibold text-white/50`}>
          Message
        </label>
        <Theme.Textarea
          value={form.description}
          placeholder="Message"
          className="max-w-full"
          onChange={(e) =>
            setForm({
              ...form,
              description: e
            })
          }
        />
        <Theme.Button
          className="mt-8 max-w-full"
          disabled={submitMutation.isLoading}
          onClick={() => submitMutation.mutate()}
        >
          Submit
        </Theme.Button>
        <p className="py-4 text-center opacity-70">
          You can also email us at&nbsp;
          <a href="mailto:dreamstudio@stability.ai">dreamstudio@stability.ai</a>
        </p>
      </div>
    </div>
  );
}

Page.url = () => "/support" as const;
