import { Link } from "react-router-dom";
import { FineTuning } from "~/FineTuning";

import { Theme } from "~/Theme";

export function Overview() {
  return (
    <div className="flex flex-col gap-20">
      <div className="mx-auto flex w-full flex-col gap-32 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Header />
        <Sandboxes />
      </div>
      <Documentation />
      <div className="mx-auto mb-80 flex flex-col gap-64 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Others />
        {/*<Testimonials />*/}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-4">
      <img src="/svg/sai-header.svg" />
      <h1 className="mt-2 text-center text-5xl font-extralight">
        Stability AI Developer Platform
      </h1>
      <h2 className="text-lg font-light">
        Explore the possibilities of generative AI
      </h2>
    </div>
  );
}

function DocumentCard({
  title,
  svg,
  links,
}: {
  title: string;
  svg: string;
  links: {
    title: string;
    url: string;
    newWindow?: boolean;
    soon?: boolean;
  }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-extralight">{title}</h2>
      <img src={svg} />
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.title}
            to={link.url}
            target={link.newWindow ? "_blank" : undefined}
            onClick={link.soon ? (e) => e.preventDefault() : doNothing}
            rel="noopener noreferrer"
            className={classes(
              "flex w-fit items-center gap-1 text-sm font-semibold text-indigo-500 duration-100",
              link.soon ? "cursor-not-allowed text-gray-400" : "hover:underline"
            )}
          >
            {link.title}&nbsp;
            {link.newWindow ? (
              <Theme.Icon.ExternalLink className="h-4 w-4" />
            ) : (
              <Theme.Icon.Arrow />
            )}
            {link.soon && (
              <span className="text-xs font-light italic">Coming Soon™</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Documentation() {
  return (
    <div className="bg-brand-amber-1 py-24">
      <div className="flex flex-col items-center gap-5">
        <img src="/svg/documentation-header.svg" />
        <h1 className="text-5xl font-extralight">Documentation</h1>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:max-w-[93rem] 2xl:px-0">
          <DocumentCard
            svg="/svg/image-doc.webp"
            title="Image"
            links={[
              { title: "Introduction", url: "/docs/getting-started" },
              { title: "REST API", url: "/docs/api-reference" },
              { title: "gRPC API", url: "/docs/features" },
            ]}
          />
          <DocumentCard
            title="Language"
            svg="/svg/language-doc.webp"
            links={[
              // { title: "Models", url: "/docs/text-to-text" },
              {
                title: "Chat UI",
                url: "https://research.stability.ai/chat",
                newWindow: true,
              },
            ]}
          />
          <DocumentCard
            title="Animation"
            svg="/svg/animation-doc.webp"
            links={[
              { title: "Introduction", url: "/docs/features/animation" },
              { title: "gRPC API", url: "/docs/features/animation/parameters" },
            ]}
          />
          <DocumentCard
            title="Integrations"
            svg="/svg/integration-doc.webp"
            links={[{ title: "Blender", url: "/docs/integrations/blender" }]}
          />
        </div>
      </div>
    </div>
  );
}

function SandboxCard({
  title,
  svg,
  link,
  soon,
  isNew,
}: {
  title: string;
  svg: string;
  link: string;
  soon?: boolean;
  isNew?: boolean;
}) {
  const content = (
    <>
      <div className="relative h-full w-full rounded-xl bg-white">
        <img className="w-full" src={soon ? "/svg/soon-sandbox.webp" : svg} />
        {isNew && (
          <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-indigo-500 px-2.5 py-1 font-semibold text-white">
            New
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <h2
          className={classes(
            "text-xl font-extralight duration-100",
            !soon && "group-hover:text-indigo-500"
          )}
        >
          {title}
        </h2>
        {!soon && (
          <Theme.Icon.Arrow className="h-6 w-6 -translate-x-2 text-indigo-300 opacity-0 duration-100 group-hover:translate-x-0 group-hover:opacity-100" />
        )}
      </div>
    </>
  );

  const styles = "flex flex-col gap-2 rounded-xl group w-full";

  if (soon) {
    return <div className={styles}>{content}</div>;
  }

  return (
    <Link to={link} className={styles}>
      {content}
    </Link>
  );
}

function Sandboxes() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SandboxCard
          title="Text-to-Image"
          svg="/svg/text-image-sandbox.webp"
          link="/sandbox/text-to-image"
        />
        <SandboxCard
          title="Image-to-Image"
          svg="/svg/image-image-sandbox.webp"
          link="/sandbox/image-to-image"
        />
        <SandboxCard
          title="Upscaling"
          svg="/svg/upscaling-sandbox.webp"
          link="/sandbox/upscaling"
        />
        {FineTuning.useEnabled() ? (
          <SandboxCard
            title="Fine-Tuning"
            svg="/svg/fine-tuning-sandbox.webp"
            link="/sandbox/fine-tuning"
            isNew
          />
        ) : (
          <SandboxCard
            title="Multi-Prompting"
            svg="/svg/multi-prompting-sandbox.webp"
            link="/sandbox/multi-prompting"
          />
        )}
      </div>
      <Link
        to="/sandbox"
        className="mt-16 flex items-center gap-2 font-semibold text-indigo-500 duration-100 hover:text-indigo-400"
      >
        View All Sandboxes <Theme.Icon.Arrow />
      </Link>
    </div>
  );
}

function OtherCard({
  title,
  svg,
  link,
  linkName,
}: {
  title: string;
  svg: string;
  link: string;
  linkName?: string;
}) {
  return (
    <Link to={link} className="group flex flex-col gap-3">
      <h1 className="text-3xl font-extralight">{title}</h1>
      <img src={svg} />
      <Link
        to={link}
        className="flex items-center gap-2 text-sm font-semibold text-indigo-500 duration-100 group-hover:underline"
      >
        {linkName ?? "Learn More"} <Theme.Icon.Arrow />
      </Link>
    </Link>
  );
}

function Others() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <OtherCard title="Pricing" svg="/svg/pricing.webp" link="/pricing" />
      <OtherCard
        title="Support"
        svg="/svg/support.webp"
        link="/support"
        linkName="Contact Us"
      />
      <OtherCard
        title="Status"
        svg="/svg/status.webp"
        link="https://status.stability.ai"
        linkName="View API Status"
      />
      <OtherCard
        title="Release Notes"
        svg="/svg/release-notes.webp"
        link="https://stability.ai/blog"
      />
    </div>
  );
}

// function Testimonials() {
//   return (
//     <div className="flex flex-col gap-12 text-center">
//       <h1 className="text-4xl font-extralight leading-[2.75rem]">
//         Join industry-leaders making the most of
//         <br /> generative AI with Stability AI
//       </h1>
//       <img src="/svg/logos.svg" />
//     </div>
//   );
// }
