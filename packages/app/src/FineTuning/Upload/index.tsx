import { Theme } from "~/Theme";

import { Asset } from "./Asset";
export { Uploads } from "./Uploads";

export type Upload = {
  id: ID;
  url?: URLString;
};

export function Upload({ upload }: { upload?: Upload }) {
  const createAsset = Asset.Create.use(upload);
  // const deleteAsset = Asset.Delete.use(createAsset.data);

  const [isImageReady, setIsImageReady] = useState(false);

  useEffect(() => {
    if (!upload?.url) return;

    setIsImageReady(false);
    const image = new Image();
    image.src = upload.url;
    image.onload = () => setIsImageReady(true);
  }, [upload?.url]);

  return (
    <div className="relative box-border flex aspect-square grow items-center justify-center overflow-hidden rounded-md border border-black/10">
      {isImageReady && (
        <div
          className={classes(
            "absolute h-full w-full bg-cover bg-center",
            createAsset.isLoading && "opacity-10"
          )}
          style={{
            ...(upload?.url && {
              backgroundImage: `url(${upload.url})`,
            }),
          }}
        />
      )}
      {!upload?.url && (
        <Theme.Icon.Image className="h-[25%] w-[25%] text-black opacity-10" />
      )}
      {createAsset.isLoading && (
        <Theme.Icon.Spinner className="h-[25%] w-[25%] text-black opacity-10" />
      )}
    </div>
  );
}

export declare namespace Upload {
  export { Asset };
}

export namespace Upload {
  Upload.Asset = Asset;

  export const constraints = () => ({ size: { min: 328, max: 1024 } } as const);
}
