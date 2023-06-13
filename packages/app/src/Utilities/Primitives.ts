export const makeBy = <A>(n: number, f: (i: number) => A) => {
  const j = Math.max(0, Math.floor(n));
  const array: Array<A> = [f(0)];

  for (let i = 1; i < j; i++) {
    array.push(f(i));
  }

  return array;
};

export const isNumber = (unknown: unknown): unknown is number =>
  typeof unknown === "number" && !isNaN(unknown);

export const toNumber = (value?: unknown): number | undefined => {
  if (!value) return;

  const number = Number(value);
  if (!isNaN(number)) return;

  return number;
};

export const isString = (unknown: unknown): unknown is string =>
  typeof unknown === "string" && !!unknown;

export const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
