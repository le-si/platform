import { Link } from "react-router-dom";

export function List() {
  return (
    <div className="mx-auto flex min-h-screen flex-col gap-32 px-5 2xl:max-w-[93rem] 2xl:px-0">
      <Header />
      <Sandboxes />
    </div>
  );
}

function Header() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-4">
      <img src="/svg/sai-header.svg" />
      <h1 className="mt-2 text-center text-5xl font-extralight">
        Sandbox Experiences
      </h1>
      <h2 className="text-lg font-light">
        Test, Learn, and Innovate with Confidence
      </h2>
    </div>
  );
}

function Sandboxes() {
  return (
    <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <SandboxButton
        title="Text-to-Image"
        description="Generate images from text"
        href="/sandbox/text-to-image"
        image="/svg/sandboxes/text-to-image.webp"
      />
      <SandboxButton
        title="Image-to-Image"
        description="Generate images from images"
        href="/sandbox/image-to-image"
        image="/svg/sandboxes/image-to-image.webp"
      />
      <SandboxButton
        title="Upscaling"
        description="Increase image resolution"
        href="/sandbox/upscaling"
        image="/svg/sandboxes/upscaling.webp"
      />
      <SandboxButton
        title="Multi-Prompting"
        description="Generate images from multiple prompts"
        href="/sandbox/multi-prompting"
        image="/svg/sandboxes/multi-prompting.webp"
      />
      <SandboxButton
        comingSoon
        title="Inpainting"
        description="Edit images with AI"
        href="/sandbox/masking"
        image="/svg/sandboxes/masking.webp"
      />
      <SandboxButton
        comingSoon
        title="Chat UI"
        description="Communicate with language models"
        href="/sandbox/chat"
        image="/svg/sandboxes/chatui.webp"
      />
      <SandboxButton
        comingSoon
        title="Out-Painting"
        description="Expand images with AI"
        href="/sandbox/outpainting"
        image="/svg/sandboxes/outpainting.webp"
      />
      <SandboxButton
        comingSoon
        title="Fine-Tuning"
        description="Train image models with your data"
        href="/sandbox/fine-tuning"
        image="/svg/sandboxes/fine-tuning.webp"
      />
    </div>
  );
}

function SandboxButton({
  comingSoon,
  title,
  description,
  image,
  href,
}: {
  comingSoon?: boolean;
  title: string;
  description: string;
  image?: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className={classes(
        "bg-brand-amber-1 group flex flex-col gap-3 rounded-2xl p-5 duration-100",
        comingSoon ? "cursor-default opacity-50" : "hover:bg-brand-amber-2"
      )}
      {...(comingSoon && {
        onClick: (event) => event.preventDefault(),
      })}
    >
      <h1 className="flex justify-between text-2xl">{title}</h1>
      <p>{description}</p>
      <div className="w-full overflow-hidden rounded-xl">
        {image && (
          <img
            src={image}
            alt={title}
            className={classes(
              "w-full grayscale duration-100",
              !comingSoon && "group-hover:grayscale-0"
            )}
          />
        )}
      </div>
    </Link>
  );
}
