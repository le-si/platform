import { Theme } from "~/Theme";

export function Help(props: Theme.Icon) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.99609 6.57857C7.43985 5.31711 8.31573 4.2534 9.4686 3.57584C10.6215 2.89829 11.9769 2.65061 13.2949 2.87668C14.6129 3.10275 15.8084 3.78798 16.6696 4.811C17.5307 5.83402 18.0021 7.12881 18.0001 8.46605C17.9925 13.5278 12.9385 14.1285 12.1438 14.1285V16.1017"
        stroke="#18181B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1445 20.3929H12.1676"
        stroke="#18181B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
