export { CustomError } from "ts-custom-error";

export * from "./Primitives";
export * from "./DateTime";

export function remToPx(remStr: string) {
  const rem = parseInt(remStr.replace(/rem$/, "").trim());

  if (isNaN(rem)) {
    console.error(`Cannot convert ${remStr} from rems to pixels.`);
    return 0;
  }

  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function toError(e: unknown) {
  return e instanceof Error ? e : Error(`${e}`);
}
