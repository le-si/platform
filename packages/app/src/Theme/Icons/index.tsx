export type Icon = Styleable & {
  color?: string;
};

export function Link(props: Icon) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g>
        <path
          d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
          stroke={props.color || "#18181B"}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 2H14V6"
          stroke={props.color || "#18181B"}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66797 9.33333L14.0013 2"
          stroke={props.color || "#18181B"}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Union(props: Icon) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12.5C23 18.5751 18.0751 23.5 12 23.5C5.92487 23.5 1 18.5751 1 12.5C1 6.42487 5.92487 1.5 12 1.5C18.0751 1.5 23 6.42487 23 12.5ZM24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 0 19.1274 0 12.5C0 5.87258 5.37258 0.5 12 0.5C18.6274 0.5 24 5.87258 24 12.5ZM11.5 12V5.5H12.5V12H19V13H12.5V19.5H11.5V13H5V12H11.5Z"
        fill={props.color || "#a1a1aa"}
      />
    </svg>
  );
}

export function Engine(props: Icon) {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M19.2032 3.91699V3.91909L23.7734 9.98745V9.9928C26.3196 10.1107 28.3477 12.2123 28.3477 14.7876V16.0576H31.9995V18.4858H28.3477V19.7566C28.3477 22.3319 26.3196 24.4335 23.7734 24.5514V24.5565L19.2032 30.6249V30.6269L12.8003 30.6269L8.22852 24.5565V24.5511C5.68238 24.4333 3.6543 22.3317 3.6543 19.7564V18.4858H0V16.0576H3.6543V14.7873C3.6543 12.212 5.68238 10.1104 8.22852 9.99252V9.98743L12.8003 3.91699H19.2032Z"
        fill={props.color || "#2C566E"}
      />
    </svg>
  );
}

export function GridBlocks(props: Icon) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <rect width="2.57143" height="2.57143" fill="#3F3F46" />
      <rect
        opacity="0.6"
        x="9.42773"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.8"
        x="4.71484"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.8"
        y="4.71387"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.4"
        x="9.42773"
        y="4.71387"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.6"
        x="4.71484"
        y="4.71484"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.6"
        y="9.42871"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.2"
        x="9.42773"
        y="9.42871"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
      <rect
        opacity="0.4"
        x="4.71484"
        y="9.42871"
        width="2.57143"
        height="2.57143"
        fill="#3F3F46"
      />
    </svg>
  );
}

export function X(props: Icon) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M13 3L3 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3L13 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Copy(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function Code(props: Icon) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M17.4648 8.17944L12 22" stroke="currentColor" />
      <path d="M21 11L25 15L21 19" stroke="currentColor" />
      <path d="M9 19L5 15L9 11" stroke="currentColor" />
    </svg>
  );
}

export function Arrow(props: Icon) {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M7.65332 1.88867L11.5133 5.74861L7.65332 9.60856"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.999869 5.74915H11.5138"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalLink(props: Icon) {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M11.25 8.625V12.375C11.25 12.7065 11.1183 13.0245 10.8839 13.2589C10.6495 13.4933 10.3315 13.625 10 13.625H3.125C2.79348 13.625 2.47554 13.4933 2.24112 13.2589C2.0067 13.0245 1.875 12.7065 1.875 12.375V5.5C1.875 5.16848 2.0067 4.85054 2.24112 4.61612C2.47554 4.3817 2.79348 4.25 3.125 4.25H6.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 2.375H13.125V6.125"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 9.25L13.125 2.375"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Eye(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOff(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export function Plus(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

export function AlertTriangle(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function AlertCircle(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

export function Info(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function Check(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Spinner({ className }: Styleable) {
  return (
    <svg
      className={classes(
        "flex h-5 w-5 animate-spin text-gray-500 dark:text-gray-400",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
