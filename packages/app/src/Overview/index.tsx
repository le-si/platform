import { Link } from "react-router-dom";

import { Theme } from "~/Theme";

export function Overview() {
  return (
    <div className="flex flex-col gap-48">
      <div className="mx-auto flex w-full flex-col gap-32 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Header />
        <Sandboxes />
      </div>
      <Documentation />
      <div className="mx-auto mb-80 flex flex-col gap-64 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Others />
        <Testimonials />
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
  }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-extralight">{title}</h2>
      <img src={svg} />
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            className="flex items-center gap-2 text-sm font-semibold text-indigo-500 duration-100 hover:text-indigo-400"
          >
            {link.title}&nbsp;
            {link.newWindow ? (
              <Theme.Icon.ExternalLink />
            ) : (
              <Theme.Icon.Arrow />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function Documentation() {
  return (
    <div className="bg-brand-amber-1 py-32">
      <div className="flex flex-col items-center gap-5">
        <img src="/svg/documentation-header.svg" />
        <h1 className="text-5xl font-extralight">Documentation</h1>
        <div className="mx-auto mt-28 grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:max-w-[93rem] 2xl:px-0">
          <DocumentCard
            svg="/svg/image-doc.webp"
            title="Image"
            links={[
              { title: "Introduction", url: "/docs/text-to-image" },
              { title: "REST API", url: "/docs/text-to-image" },
              { title: "gRPC API", url: "/docs/text-to-image" },
            ]}
          />
          <DocumentCard
            title="Language"
            svg="/svg/language-doc.webp"
            links={[
              { title: "Models", url: "/docs/text-to-text" },
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
              { title: "Introduction", url: "/docs/text-to-video" },
              { title: "gRPC API", url: "/docs/text-to-video" },
            ]}
          />
          <DocumentCard
            title="Integrations"
            svg="/svg/integration-doc.webp"
            links={[
              { title: "Photoshop", url: "/docs/text-to-image" },
              { title: "Blender", url: "/docs/text-to-image" },
            ]}
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
}: {
  title: string;
  svg: string;
  link: string;
  soon?: boolean;
}) {
  const content = (
    <>
      <div className="h-full w-full rounded-xl bg-white">
        <img className="w-full" src={soon ? "/svg/soon-sandbox.webp" : svg} />
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
          title="Text to Image"
          svg="/svg/text-image-sandbox.webp"
          link="/sandbox/text-to-image"
        />
        <SandboxCard
          title="Image to Image"
          svg="/svg/image-image-sandbox.webp"
          link="/sandbox/image-to-image"
        />
        <SandboxCard
          title="Upscaling"
          svg="/svg/upscaling-sandbox.webp"
          link="/sandbox/upscaling"
        />
        <SandboxCard
          title="Multi-Prompting"
          svg="/svg/multi-prompting-sandbox.webp"
          link="/sandbox/multi-prompting"
        />
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
        className="flex items-center gap-2 text-sm font-semibold text-indigo-500 duration-100 group-hover:text-indigo-400"
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
        link="https://stability.ai/support"
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

function Testimonials() {
  return (
    <div className="flex flex-col gap-12 text-center">
      <h1 className="text-4xl font-extralight leading-[2.75rem]">
        Join industry-leaders making the most of
        <br /> generative AI with Stability AI
      </h1>
      <img src="/svg/logos.svg" />
    </div>
  );
}
