import { Link } from "react-router-dom";
import { Arrow, ExternalLink } from "~/Theme";

export function Overview() {
  return (
    <div className="flex flex-col gap-48">
      <div className="mx-auto flex flex-col gap-64 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Header />
        <GetStarted />
        <Documentation />
      </div>
      <Sandboxes />
      <div className="mx-auto flex flex-col gap-64 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <Others />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}

function Button({
  children,
  className,
  link,
  arrow,
  onClick,
  disabled,
}: StyleableWithChildren & {
  onClick?: () => void;
  link?: string;
  arrow?: boolean;
  disabled?: boolean;
}) {
  const styles = classes(
    "w-fit rounded-full bg-indigo-500 px-3 py-1 text-sm text-white duration-100 hover:bg-indigo-400 flex gap-2 items-center",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (link) {
    return (
      <Link to={link} className={styles}>
        {children} {arrow && <Arrow />}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children} {arrow && <Arrow />}
    </button>
  );
}

function Header() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-2">
      <img src="/svg/sai-header.svg" />
      <h2 className="mt-4 text-lg font-light">Stability AI platform</h2>
      <h1 className="text-center text-5xl font-extralight">
        Explore the possibilities of generative AI
      </h1>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-light">Get Started</h2>
        <img src="/svg/getstarted-cta.webp" className="select-none" />
        <p>Learn how to get started with generative AI via our APIs.</p>
        <Button>Learn More</Button>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-light">DreamStudio</h2>
        <img src="/svg/dreamstudio-cta.webp" className="select-none" />
        <p>
          Learn about DreamStudio and StableStudio, Stability AI&apos;s image
          generation applications.
        </p>
        <Button>Learn More</Button>
      </div>
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
            {link.title} {link.newWindow ? <ExternalLink /> : <Arrow />}
          </a>
        ))}
      </div>
    </div>
  );
}

function Documentation() {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src="/svg/documentation-header.svg" />
      <h1 className="text-5xl font-extralight">Documentation</h1>
      <div className="mt-36 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      <div className="rounded-xl bg-white p-3">
        <img src={soon ? "/svg/soon-sandbox.webp" : svg} />
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
          <Arrow className="h-6 w-6 -translate-x-2 text-indigo-300 opacity-0 duration-100 group-hover:translate-x-0 group-hover:opacity-100" />
        )}
      </div>
    </>
  );

  const styles = "flex flex-col gap-2 rounded-xl group";

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
    <div className="bg-brand-amber-1 py-48">
      <div className="mx-auto flex flex-col items-center gap-5 px-5 2xl:max-w-[93rem] 2xl:px-0">
        <img src="/svg/api-header.svg" />
        <h1 className="text-5xl font-extralight">Developer Sandboxes</h1>
        <p className="text-center">
          Experiment with our APIs and get useable code for your own projects.
        </p>

        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          {/* <SandboxCard
            title="Masking"
            svg="/svg/masking-sandbox.webp"
            link="/sandbox/masking"
            soon
          />
          <SandboxCard
            title="Animation"
            svg="/svg/animation-sandbox.webp"
            link="/sandbox/animation"
            soon
          />
          <SandboxCard
            title="Face enhancing"
            svg="/svg/face-enhancing-sandbox.webp"
            link="/sandbox/face-enhancing"
            soon
          />
          <SandboxCard
            title="Fine-Tuning"
            svg="/svg/fine-tuning-sandbox.webp"
            link="/sandbox/fine-tuning"
            soon
          /> */}
        </div>
        <Link
          to="/sandbox"
          className="mt-16 flex items-center gap-2 font-semibold text-indigo-500 duration-100 hover:text-indigo-400"
        >
          View All Sandboxes <Arrow />
        </Link>
      </div>
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
    <a href={link} className="group flex flex-col gap-3">
      <h1 className="text-3xl font-extralight">{title}</h1>
      <img src={svg} />
      <a
        href={link}
        className="flex items-center gap-2 text-sm font-semibold text-indigo-500 duration-100 group-hover:text-indigo-400"
      >
        {linkName || "Learn More"} <Arrow />
      </a>
    </a>
  );
}

function Others() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <OtherCard
        title="Pricing"
        svg="/svg/pricing.webp"
        link="https://stability.ai/pricing"
      />
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

function FAQ() {
  return <div></div>;
}
