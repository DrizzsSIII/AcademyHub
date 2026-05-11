type ProgressRingProps = {
  percent: number;
  label?: string;
  size?: number;
  stroke?: number;
};

export function ProgressRing({
  percent,
  label,
  size = 120,
  stroke = 10,
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, percent));
  const offset = c - (p / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="var(--color-accent)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-lg font-semibold text-ink">{p}%</p>
        </div>
      </div>
      {label ? (
        <p className="text-center text-xs font-medium text-muted">{label}</p>
      ) : null}
    </div>
  );
}
