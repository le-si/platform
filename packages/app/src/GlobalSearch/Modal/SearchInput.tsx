export function SearchInput({
  value,
  closeModal,
  onChange,
  onKeyDown,
}: {
  readonly value: string;
  readonly closeModal: () => void;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => ref.current?.focus(), []);

  return (
    <div className={"relative w-full"}>
      <input
        ref={ref}
        tabIndex={0}
        type="text"
        placeholder="Search..."
        className="input-lg bg-brand-amber-1 w-full rounded-tl-xl rounded-tr-xl border-b border-zinc-300 outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <CloseButton closeModal={closeModal} />
    </div>
  );
}

function CloseButton({ closeModal }: { readonly closeModal: () => void }) {
  return (
    <>
      <span
        className="btn btn-xs btn-circle btn-active absolute right-5 top-[30%] sm:hidden"
        onClick={closeModal}
      >
        ✕
      </span>
      <kbd
        className="kbd kbd-sm absolute right-6 top-[50%] hidden -translate-y-2.5 cursor-pointer sm:block"
        onClick={closeModal}
      >
        <span className="hidden sm:block">esc</span>
      </kbd>
    </>
  );
}
