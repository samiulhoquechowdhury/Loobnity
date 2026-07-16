// components/ui/logo-loader.tsx

export function LogoLoader({ size = 88 }: { size?: number }) {
  return (
    <svg
      viewBox="60 45 90 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Loading"
    >
      {/* Triangle — top piece */}
      <path
        className="loader-piece loader-piece-1"
        d="M76.16 69.34 L93.75 53.71 L93.75 85.94 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Parallelogram — vertical middle piece */}
      <path
        className="loader-piece loader-piece-2"
        d="M73.24 69.34 L93.75 88.87 L93.75 134.77 L73.24 115.24 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Trapezoid — bottom piece */}
      <path
        className="loader-piece loader-piece-3"
        d="M93.75 115.24 L122.07 115.24 L140.63 134.77 L93.75 134.77 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
    </svg>
  );
}
