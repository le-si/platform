export namespace StylePresets {
  export const toJSON = <T extends Record<string, unknown>>(
    style: string | undefined
  ) => (!!style ? { style_preset: style } : {}) as T;

  export const options = () => [
    { label: "None", value: undefined },
    { label: "Enhance", value: "enhance" },
    { label: "Anime", value: "anime" },
    { label: "Photographic", value: "photographic" },
    { label: "Digital Art", value: "digital-art" },
    { label: "Comic Book", value: "comic-book" },
    { label: "Fantasy Art", value: "fantasy-art" },
    { label: "Line Art", value: "line-art" },
    { label: "Analog Film", value: "analog-film" },
    { label: "Neon Punk", value: "neon-punk" },
    { label: "Isometric", value: "isometric" },
    { label: "Low Poly", value: "low-poly" },
    { label: "Origami", value: "origami" },
    { label: "Modeling Compound", value: "modeling-compound" },
    { label: "Cinematic", value: "cinematic" },
    { label: "3D Model", value: "3d-model" },
    { label: "Pixel Art", value: "pixel-art" },
    { label: "Tile Texture", value: "tile-texture" },
  ];
}
