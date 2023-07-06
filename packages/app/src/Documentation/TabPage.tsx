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

  return (
    <>
      <div className="sticky top-16 z-50 flex gap-1 border-b border-zinc-100 bg-white py-3 text-sm">
        {group.tabs?.map((t, i) =>
          t.redirect ? (
            <Link
              key={`redirect-${t.name}`}
              className="hover:bg-brand-amber-1 flex cursor-pointer items-center justify-center gap-1 rounded px-2 py-1.5 duration-100"
              to={t.redirect}
            >
              {t.icon}
              {t.name}
              <Theme.Icon.ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <div
              key={t.name}
              className={classes(
                "flex cursor-pointer items-center justify-center gap-1 rounded px-2 py-1.5 duration-100",
                i === tab ? "bg-brand-amber-2" : "hover:bg-brand-amber-1"
              )}
              onClick={() => setTab(i)}
            >
              {t.icon}
              {t.name}
            </div>
          )
        )}
      </div>
      {typeof currentTab.content === "string" ? (
        <div className="mx-auto w-full min-w-0 max-w-full shrink text-left">
          <Markdown className="w-full min-w-0 max-w-full shrink 2xl:max-w-full">
            {currentTab.content}
          </Markdown>
        </div>
      ) : (
        currentTab.content
      )}
    </>
  );
}
