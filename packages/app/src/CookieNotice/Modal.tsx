import { useLocalStorage } from "react-use";
import { Theme } from "~/Theme";

// Bump this value to force the cookie notice to reappear for all users.
const cookieNoticeVersion = 1;

export function Modal() {
  const [acknowledged, setAcknowledged] = useLocalStorage(
    `cookie-notice-${cookieNoticeVersion}`,
    false
  );

  if (acknowledged) return null;

  return (
    <div className="bg-brand-gray-1 border-brand-amber-2 fixed bottom-5 left-5 right-5 z-[99] flex flex-col gap-4 rounded-xl border p-4 shadow-lg drop-shadow-lg sm:w-[250px]">
      <p className="text-sm">
        By using this website, you agree to our use of cookies.
      </p>

      <p className="text-sm">
        We use cookies to provide you with a great experience and to help our
        website run effectively.
      </p>

      <Theme.Button
        className="bg-brand-amber-1 border-brand-amber-3/20 flex max-w-none justify-center gap-8 border py-1.5 shadow sm:max-w-[20rem]"
        onClick={() => setAcknowledged(true)}
      >
        <span className="mr-2 text-base">🍪</span>
        Accept
      </Theme.Button>
    </div>
  );
}
