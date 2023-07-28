import { Theme } from "~/Theme";

import { Asset } from "./Asset";
export { Uploads } from "./Uploads";

export type Upload = {
  id: ID;
  url?: URLString;
  asset?: Asset;
};

export function Upload({ upload }: { upload?: Upload }) {
  const { isFetching: isAssetUploading } = Asset.Create.use(upload);
  const { execute: deleteAsset, isFetching: isAssetDeleting } =
    Asset.Delete.use(upload);

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
            "absolute bottom-0 left-0 right-0 top-0 bg-contain bg-center bg-no-repeat",
            (isAssetUploading || isAssetDeleting) && "opacity-10"
          )}
          style={{
            ...(upload?.url && {
              backgroundImage: `url(${upload.url})`,
            }),
          }}
        />
      )}
      {deleteAsset && !isAssetDeleting && (
        <div
          className="absolute right-2 top-2 cursor-pointer rounded-full border border-black/10 bg-white p-1.5 opacity-70 hover:opacity-100"
          onClick={deleteAsset}
        >
          <Theme.Icon.X className="h-4 w-4" />
        </div>
      )}
      {isAssetUploading || isAssetDeleting ? (
        <Theme.Icon.Spinner className="h-[25%] w-[25%] text-black opacity-10" />
      ) : (
        !upload?.url && (
          <Theme.Icon.Image className="h-[25%] w-[25%] text-black opacity-10" />
        )
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
