import { TopBar, height } from "../TopBar";

export function Page({
  children,
  className,
  noScroll,
  noFooter
}: StyleableWithChildren & {
  noScroll?: boolean;
  noFooter?: boolean;
}) {
  return (
    <div
      className={classes("z-0 w-full", className)}
      style={
        noScroll
          ? {
              height: `calc(100vh - (${height()} + ${
                noFooter ? "0rem" : "4rem"
              }))`
            }
          : undefined
      }
    >
      <TopBar />

      {!noFooter ? (
        <>
          <div className="min-h-screen">{children}</div>
          <Footer />
        </>
      ) : (
        children
      )}
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-auto flex h-16 w-full items-center justify-between border-t border-zinc-100 bg-white px-5">
      <div className="flex gap-6">
        <a href="/tos" className="text-sm font-semibold hover:text-indigo-500">
          Terms of Service
        </a>
        <a
          href="/privacy"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Privacy Policy
        </a>
        <a href="/faq" className="text-sm font-semibold hover:text-indigo-500">
          FAQs
        </a>
        <a
          href="https://stability.ai"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Stability.AI
        </a>
      </div>
      <div className="flex gap-6">
        <a
          href="https://discord.gg/5fgDen6CPU"
          className="text-sm font-semibold hover:text-indigo-500"
        >
          Discord
        </a>
      </div>
    </div>
  );
}
