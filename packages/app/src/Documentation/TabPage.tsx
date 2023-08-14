import { Link, useLocation, useNavigate } from "react-router-dom";
import { Markdown } from "~/Markdown";
import { Theme } from "~/Theme";

import { Documentation } from ".";

export function TabPage({ group }: { group: Documentation.Group }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [tab, setTab] = useState<number | null>(
    location.hash
      ? group.tabs?.findIndex((t) => t.name === location.hash.slice(1)) ?? 0
      : 0
  );

  const currentTab = group.tabs?.[tab ?? 0] ?? group.tabs?.[0] ?? group;

  useEffect(() => {
    navigate(`#${currentTab.name}`, { replace: true });
  }, [currentTab.name, navigate, tab]);

  useEffect(() => {
    const index = group.tabs?.findIndex((t) => t.name === location.hash);
    if (index !== undefined && index !== -1) setTab(index);
  }, [group.tabs, location.hash]);

  const content = currentTab.content ?? group.content;

  return (
    <>
      <div className="sticky top-16 z-10 flex items-center justify-between gap-1 border-b border-zinc-100 bg-white py-3 text-sm">
        <div className="flex items-center gap-1">
          {group.tabs
            ?.filter((t) => !t.redirect)
            .map((t, i) => (
              <div
                key={t.name}
                className={classes(
                  "flex cursor-pointer items-center justify-center gap-1 rounded px-2 py-1.5 duration-100",
                  i === tab ? "bg-brand-amber-2" : "hover:bg-brand-amber-1"
                )}
                onClick={() => setTab(i)}
              >
                {t.icon}
                <span className="hidden sm:inline-block">{t.name}</span>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-1">
          {group.tabs?.map(
            (tab) =>
              !!tab.redirect && (
                <Link
                  key={`redirect-${tab.name}`}
                  className="hover:bg-brand-amber-1 flex cursor-pointer items-center justify-center gap-1 rounded px-2 py-1.5 duration-100"
                  to={tab.redirect}
                >
                  {tab.icon}
                  {tab.name}
                  <Theme.Icon.ExternalLink className="h-4 w-4" />
                </Link>
              )
          )}
        </div>
      </div>
      {typeof content === "string" ? (
        <div className="mx-auto w-full min-w-0 max-w-full shrink text-left">
          <Markdown className="w-full min-w-0 max-w-full shrink 2xl:max-w-full">
            {content}
          </Markdown>
        </div>
      ) : (
        content
      )}
    </>
  );
}
