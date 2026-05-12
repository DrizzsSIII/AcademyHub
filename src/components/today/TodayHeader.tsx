type TodayHeaderProps = {
  studentName: string;
  academyName: string;
};

function greetingForNow(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function TodayHeader({ studentName, academyName }: TodayHeaderProps) {
  const initials = studentName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex items-start justify-between"
      style={{ padding: "0 0 14px 0" }}
    >
      <div>
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#8A8A8E",
            marginBottom: "3px",
          }}
        >
          {academyName}
        </p>
        <p
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1C1C1E",
          }}
        >
          {greetingForNow()}, {studentName}.
        </p>
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#0D1B2A",
          color: "#D4A017",
          fontSize: "12px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden
      >
        {initials}
      </div>
    </div>
  );
}
