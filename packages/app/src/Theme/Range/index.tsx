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
  step,
}: Range) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex select-none items-center justify-between">
        {title &&
          (typeof title === "string" ? (
            <p className={classes("select-none text-xs opacity-75")}>{title}</p>
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
          "mb-2 h-px max-w-[22rem] resize-none appearance-none rounded-lg bg-zinc-300 text-sm focus:outline-1 focus:outline-black/10",
          disabled && "opacity-60",
          className
        )}
        min={min}
        max={max}
        step={step}
        css={css`
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 1rem;
            height: 1rem;
            background-color: #fff;
            border: 1px solid #d4d4d8;
            border-radius: 50%;
            cursor: pointer;
          }
          &::-moz-range-thumb {
            width: 1rem;
            height: 1rem;
            background-color: #fff;
            border: 1px solid #d4d4d8;
            border-radius: 50%;
            cursor: pointer;
          }
          &::-ms-thumb {
            width: 1rem;
            height: 1rem;
            background-color: #fff;
            border: 1px solid #d4d4d8;
            border-radius: 50%;
            cursor: pointer;
          }
          &:active::-webkit-slider-thumb {
            background-color: #d4d4d8;
          }
          &:active::-moz-range-thumb {
            background-color: #d4d4d8;
          }
          &:active::-ms-thumb {
            background-color: #d4d4d8;
          }
        `}
      />
    </div>
  );
}
