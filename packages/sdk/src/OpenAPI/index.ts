import type { paths as Paths } from "./OpenAPI.generated";

type BaseURL = string;

type TextToImageRequest =
  Paths["/generation/{engine_id}/text-to-image"]["post"];
type ImageToImageRequest =
  Paths["/generation/{engine_id}/image-to-image"]["post"];

export type TextToImageEngineID = string;
export type ImageToImageEngineID = string;

export type TextToImageRequestPath =
  `${BaseURL}/generation/${TextToImageEngineID}/text-to-image`;

export type ImageToImageRequestPath =
  `${BaseURL}/generation/${ImageToImageEngineID}/image-to-image`;

export type UpscaleRequestPath =
  `${BaseURL}/generation/${ImageToImageEngineID}/image-to-image/upscale`;

export type TextToImageRequestHeaders =
  TextToImageRequest["parameters"]["header"];
export type ImageToImageRequestHeaders =
  ImageToImageRequest["parameters"]["header"];
export type UpscaleRequestHeaders =
  ImageToImageRequest["parameters"]["header"];

export type TextToImageRequestBody =
  TextToImageRequest["requestBody"]["content"]["application/json"];
export type ImageToImageRequestBody =
  ImageToImageRequest["requestBody"]["content"]["multipart/form-data"];
export type UpscaleRequestBody =
  ImageToImageRequest["requestBody"]["content"]["multipart/form-data"];

export type TextToImageResponseBody =
TextToImageRequest["responses"][200]["content"]["image/png"]| TextToImageRequest["responses"][200]["content"]["application/json"];
export type ImageToImageResponseBody =
  ImageToImageRequest["responses"][200]["content"]["image/png"] | ImageToImageRequest["responses"][200]["content"]["application/json"];
export type UpscaleResponseBody =
  ImageToImageRequest["responses"][200]["content"]["image/png"] | ImageToImageRequest["responses"][200]["content"]["application/json"];

type UserAccountRequest = Paths["/user/account"]["get"];

export type UserAccountRequestPath = `${BaseURL}/user/account`;
export type UserAccountResponseBody =
  UserAccountRequest["responses"][200]["content"]["application/json"];
