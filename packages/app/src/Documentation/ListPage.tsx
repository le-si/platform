import { Link } from "react-router-dom";
import { Markdown } from "~/Markdown";
import { Documentation } from ".";

export function ListPage({ group }: { group: Documentation.Group }) {
  return (
    <div className="my-[30px] flex flex-col gap-8 px-5">
      <h1 className="text-4xl font-extrabold">{group.name}</h1>
      <p className="text-base">{group.summary}</p>
      {typeof group.content === "string" ? (
        <div className="mx-auto w-full max-w-full text-left">
          <Markdown className="w-full max-w-full p-0 2xl:max-w-full">
            {group.content}
          </Markdown>
        </div>
      ) : (
        group.content
      )}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.children?.map((child) => (
          <Link
            to={child.route}
            key={child.name}
            className="group flex cursor-pointer flex-col gap-4"
          >
            <div className="bg-brand-amber-2 relative aspect-square w-full shrink-0 grow-0 overflow-hidden rounded-xl p-4">
              <div className="absolute left-[50%] top-[50%] aspect-square h-[55%] w-[55%] translate-x-[-50%] translate-y-[-50%] transform overflow-hidden">
                <img
                  src={child.imageURL}
                  alt={child.name}
                  className="h-full w-full object-cover duration-100 ease-in-out group-hover:scale-105"
                />
              </div>
              <img
                src={"/svg/grid.svg"}
                className="aspect-square h-full w-full"
              />
            </div>

            <div className="flex flex-col justify-start gap-3">
              <h2 className="text-2xl font-bold duration-100 ease-in-out group-hover:text-indigo-500">
                {child.name}
              </h2>
              <p className="text-base">{child.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
