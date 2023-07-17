import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { Theme } from "~/Theme";

// Bump this value to force the cookie notice to reappear for all users.
const cookieNoticeVersion = 6;

export function Modal() {
  const [acknowledged, setAcknowledged] = useLocalStorage(
    `cookie-notice-${cookieNoticeVersion}`,
    false
  );

  if (acknowledged) return null;

  return (
    <div className="bg-brand-gray-1 border-brand-amber-2 fixed bottom-5 left-5 right-5 z-[99] flex flex-col gap-4 rounded-xl border p-4 shadow-lg drop-shadow-lg sm:w-[375px]">
      <p className="text-sm">
        We use essential cookies to make our site work. With your consent, we
        may also use non-essential cookies to improve user experience and
        analyze website traffic.
      </p>
      <p className="text-sm">
        By clicking “Accept”, you agree to our website&apos;s cookie use as
        described in our&nbsp;
        <Link to="/legal/privacy-policy" className="text-indigo-500">
          Privacy Policy
        </Link>
        .
      </p>
      <Theme.Button
        className="bg-brand-amber-1 border-brand-amber-3/20 flex max-w-none justify-center gap-8 border py-1.5 shadow"
        onClick={() => setAcknowledged(true)}
      >
        <span className="mr-2 text-base">🍪</span>
        Accept
      </Theme.Button>
    </div>
  );
}
