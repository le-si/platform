export function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="5" width="32" height="22" fill="#D6501E" />
      <path
        d="M4.53516 16.0297H8.61208"
        stroke="#F6F6EF"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M14.7656 16.0298H27.4579"
        stroke="#F6F6EF"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <circle
        cx="11"
        cy="16"
        r="3"
        fill="#D6501E"
        stroke="#F6F6EF"
        strokeWidth="2"
      />
    </svg>
  );
}
