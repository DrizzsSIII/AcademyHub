type StreakWidgetProps = {
  streakDays: number;
  activeDays: boolean[];
};

const DOT_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakWidget({ streakDays, activeDays }: StreakWidgetProps) {
  const dots = [...activeDays.slice(0, 7)];
  while (dots.length < 7) dots.push(false);

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "0.5px solid rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="#D4A017" aria-hidden>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1C1C1E",
            }}
          >
            {streakDays}-day streak
          </p>
          <p
            style={{
              fontSize: 11,
              color: "#8A8A8E",
              marginTop: 1,
            }}
          >
            Keep showing up.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {dots.map((active, i) => (
            <span
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: active ? "#D4A017" : "rgba(0,0,0,0.10)",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 9,
            color: "#8A8A8E",
            textAlign: "right",
            letterSpacing: "0.04em",
          }}
        >
          {DOT_LABELS.join(" ")}
        </span>
      </div>
    </div>
  );
}
