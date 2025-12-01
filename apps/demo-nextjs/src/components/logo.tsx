/**
 * FormKit Gov Logo Component
 *
 * Shared SVG logo for consistent branding across demo apps.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      aria-label="FormKit Gov logo"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="none"
        height="60"
        rx="4"
        stroke="#112e51"
        strokeWidth="4"
        width="80"
        x="10"
        y="20"
      />
      <line stroke="#112e51" strokeWidth="4" x1="10" x2="90" y1="35" y2="35" />
      <rect fill="#0071bc" height="8" rx="2" width="25" x="20" y="45" />
      <rect fill="#0071bc" height="8" rx="2" width="60" x="20" y="58" />
      <circle cx="75" cy="49" fill="#02bfe7" r="8" />
      <path
        d="M72 49L74 51L78 47"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
