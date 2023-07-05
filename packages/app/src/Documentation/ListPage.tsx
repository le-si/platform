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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {group.children?.map((child) => (
          <Link
            to={child.route}
            key={child.name}
            className="group flex cursor-pointer gap-4"
          >
            <div className="ring-brand-amber-2 aspect-square h-20 w-20 shrink-0 grow-0 overflow-hidden rounded-lg ring-[5px] duration-200 ease-in-out">
              <img
                src={child.imageURL}
                alt={child.name}
                className="aspect-square h-full w-full object-cover duration-100 ease-in-out group-hover:scale-105"
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
