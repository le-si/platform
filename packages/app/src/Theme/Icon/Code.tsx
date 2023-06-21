import { Theme } from "~/Theme";

export function Code(props: Theme.Icon) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.4648 8.17944L12 22" stroke="currentColor" />
      <path d="M21 11L25 15L21 19" stroke="currentColor" />
      <path d="M9 19L5 15L9 11" stroke="currentColor" />
    </svg>
  );
}
