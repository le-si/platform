import { Image, Upload, X } from "../Icons";

export type DropZone = StyleableWithChildren & {
  onDrop: (file: File) => void;
  title?: string;
  imageStyle?: React.CSSProperties;
  onClear?: () => void;
};

export function DropZone({
  onDrop,
  className,
  children,
  title,
  imageStyle,
  onClear
}: DropZone) {
  const [image, setImage] = useState<string | undefined>();

  const getFiles = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onDrop(file);
        setImage(URL.createObjectURL(file));
      }
    };
    input.click();
  }, [onDrop]);

  const onDropFiles = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
        onDrop(file);
        setImage(URL.createObjectURL(file));
      }
    },
    [onDrop]
  );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex items-center gap-2 text-sm">
        <Image /> {title}
      </h1>
      <div
        className={classes(
          "bg-brand-amber-2 flex h-full min-h-[12rem] w-full max-w-[22rem] flex-col items-center justify-center gap-2 rounded-lg",
          !image && "cursor-pointer",
          className
        )}
        onClick={!image ? getFiles : undefined}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={!image ? onDropFiles : undefined}
      >
        {image ? (
          <div
            className="relative flex flex-col gap-2 p-3"
            onClickCapture={(e) => e.preventDefault()}
          >
            {image && (
              <X
                className="absolute right-5 top-5 z-50 h-7 w-7 cursor-pointer rounded-full bg-white/60 p-1.5 backdrop-blur-sm duration-100 hover:bg-white/80"
                onClick={() => {
                  setImage(undefined);
                  onClear?.();
                }}
              />
            )}
            <img
              src={image}
              className="aspect-square cursor-pointer rounded object-cover"
              style={imageStyle}
              onClick={getFiles}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={onDropFiles}
            />
            {children}
          </div>
        ) : (
          <>
            <Upload className="bg-brand-orange h-8 w-8 rounded-full p-1 text-white" />
            <p className="text-sm opacity-50">Upload an image</p>
          </>
        )}
      </div>
    </div>
  );
}
