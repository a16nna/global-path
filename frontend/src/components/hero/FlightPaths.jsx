import { DESTINATIONS, ORIGIN } from "../../constants/destinations";

// Builds a gentle arc between two points on the flat overlay map.
function arcPath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.22;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export default function FlightPaths() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {DESTINATIONS.map((d, i) => {
        const path = arcPath(ORIGIN.x, ORIGIN.y, d.x, d.y);
        return (
          <g key={d.code}>
            <path
              d={path}
              fill="none"
              stroke="#2FA88F"
              strokeWidth="0.18"
              strokeOpacity="0.5"
              className="flight-path"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <circle cx={d.x} cy={d.y} r="0.7" fill="#F5F1E8" opacity="0.85" />
            <g style={{ offsetPath: `path('${path}')`, animation: `plane-fly 5s linear infinite`, animationDelay: `${i * 0.9}s` }}>
              <circle r="0.55" fill="#E8A33D" />
            </g>
          </g>
        );
      })}

      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="4" fill="url(#hub-glow)" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="1" fill="#E8A33D" />
    </svg>
  );
}
