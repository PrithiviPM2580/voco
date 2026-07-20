interface LogoProps {
  title?: string
  color?: string
}

export default function Logo({ title, color }: LogoProps) {
  return (
    <div className="flex-center h-14 w-14 rounded-xl bg-primary p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 59 42"
        width="59"
        height="42"
        fill="none"
      >
        <g>
          <path
            d="M10 15.1533L56.0254 27.3643C57.7788 27.8295 59 29.4164 59 31.2305V40H49V35.8457L29.501 30.6729L10 35.8457V40H0V31.2305C0 29.4164 1.22118 27.8295 2.97461 27.3643L10.001 25.499L2.97461 23.6357C1.22116 23.1706 0 21.5836 0 19.7695V14C0 11.7909 1.79086 10 4 10H10V15.1533Z"
            fill={color || "#72e3ad"}
          />
          <path
            d="M55 10C57.2091 10 59 11.7909 59 14V20H49V10H55Z"
            fill={color || "#72e3ad"}
          />
          <path
            d="M45 0C47.2091 0 49 1.79086 49 4V10H10V4C10 1.79086 11.7909 0 14 0H45Z"
            fill={color || "#72e3ad"}
          />
        </g>
      </svg>
      <span>{title}</span>
    </div>
  )
}
