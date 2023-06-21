import { Theme } from "~/Theme";

export function Upload(props: Theme.Icon) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 14.25V16.75C20 17.2804 19.7893 17.7891 19.4142 18.1642C19.0391 18.5393 18.5304 18.75 18 18.75H7C6.46957 18.75 5.96086 18.5393 5.58579 18.1642C5.21071 17.7891 5 17.2804 5 16.75V14.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 9.25L12.5 4.25L7.5 9.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.502 4.25L12.502 14.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
