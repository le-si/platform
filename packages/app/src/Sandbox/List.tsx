import { Link } from "react-router-dom";

export function List() {
  return (
    <div className="mx-auto flex min-h-screen flex-col gap-48 px-5 2xl:max-w-[93rem] 2xl:px-0">
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
        Sandbox experience
      </h1>
      <h2 className="text-lg font-light">Brought to you by Stability AI</h2>
    </div>
  );
}

function Sandboxes() {
  return (
    <div className="mb-24 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <SandboxButton
        title="Text to Image"
        description="Generate images from text"
        href="/sandbox/text-to-image"
        image="/svg/sandboxes/text-to-image.svg"
      />
      <SandboxButton
        title="Image to Image"
        description="Generate images from images"
        href="/sandbox/image-to-image"
        image="/svg/sandboxes/image-to-image.svg"
      />
      <SandboxButton
        title="Upscaling"
        description="Increase image resolution"
        href="/sandbox/upscaling"
        image="/svg/sandboxes/upscaling.svg"
      />
      <SandboxButton
        title="Inpainting"
        description="Edit images with AI"
        href="/sandbox/masking"
        image="/svg/sandboxes/masking.svg"
      />
      <SandboxButton
        title="Deepfloyd IF"
        description="Generate images from text"
        href="/sandbox/deepfloyd-if"
        image="/svg/sandboxes/deepfloyd.svg"
      />
      <SandboxButton
        title="Chat UI"
        description="Communicate with language models"
        href="/sandbox/chat"
        image="/svg/sandboxes/chatui.svg"
      />
      <SandboxButton
        title="Outpainting"
        description="Expand images with AI"
        href="/sandbox/outpainting"
        image="/svg/sandboxes/outpainting.svg"
      />
      <SandboxButton
        title="Fine-tuning"
        description="Train image models with your data"
        href="/sandbox/fine-tuning"
        image="/svg/sandboxes/fine-tuning.svg"
      />
    </div>
  );
}

function SandboxButton({
  title,
  description,
  image,
  href
}: {
  title: string;
  description: string;
  image?: string;
  href: string;
}) {
  return (
    <Link
      className="bg-brand-amber-1 hover:bg-brand-amber-2 group flex flex-col gap-3 rounded-2xl p-5 duration-100"
      to={href}
    >
      <h1 className="text-2xl">{title}</h1>
      <p>{description}</p>
      <div className="w-full overflow-hidden rounded-xl">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full grayscale duration-100 group-hover:grayscale-0"
          />
        )}
      </div>
    </Link>
  );
}
