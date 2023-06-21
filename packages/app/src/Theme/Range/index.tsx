export type Range = Styleable & {
  value?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  title?: string | React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

export function Range({
  value,
  disabled,
  onChange,
  className,
  title,
  min,
  max,
  step
}: Range) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex select-none items-center justify-between">
        {title &&
          (typeof title === "string" ? (
            <p className="text-sm">{title}</p>
          ) : (
            title
          ))}
        <p className="text-sm">{value}</p>
      </div>
      <input
        type="range"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.valueAsNumber)}
        className={classes(
          "bg-brand-amber-2 max-w-[22rem] resize-none appearance-none rounded-lg text-sm focus:outline-1 focus:outline-black/10",
          disabled && "opacity-60",
          className
        )}
        min={min}
        max={max}
        step={step}
        css={css``}
      />
    </div>
  );
}
