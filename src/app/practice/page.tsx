import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { studySessions } from "@/data/mock";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDue(isoDate: string) {
  const d = new Date(isoDate);
  const now = new Date();
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / 86400000);
  if (diffDays < 0) return "Past due";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}

function fmtDuration(secs: number) {
  const m = Math.floor(secs / 60);
  return `${m} min`;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; bg: string; color: string }> = {
    completed:   { label: "Completed",   bg: "#DCFCE7", color: "#166534" },
    in_progress: { label: "In progress", bg: "#FEF3C7", color: "#92400E" },
    not_started: { label: "Not started", bg: "#F3F4F6", color: "#6B7280" },
  };
  const { label, bg, color } = cfg[status] ?? cfg.not_started;
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        background: bg,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ─── Session card ─────────────────────────────────────────────────────────────

function SessionCard({ session }: { session: (typeof studySessions)[number] }) {
  const isPast = session.status === "completed";
  const isActive = session.status === "in_progress";

  return (
    <Link
      href={`/practice/${session.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(13,27,42,0.07), 0 4px 12px rgba(13,27,42,0.04)",
          transition: "box-shadow 150ms",
          border: isActive ? "1.5px solid #D4A017" : "0.5px solid rgba(0,0,0,0.07)",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* Accent bar */}
          <div
            style={{
              width: 4,
              flexShrink: 0,
              background: isPast ? "#D1D5DB" : isActive ? "#D4A017" : "#0D1B2A",
            }}
          />

          <div style={{ flex: 1, padding: "14px 16px 14px" }}>
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 6,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1C1C1E",
                    margin: "0 0 2px",
                  }}
                >
                  {session.title}
                </p>
                <p style={{ fontSize: 11, color: "#8A8A8E", margin: 0 }}>
                  {session.subtitle}
                </p>
              </div>
              <StatusBadge status={session.status} />
            </div>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px 16px",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 12, color: "#8A8A8E" }}>
                Class: {session.classDate}
              </span>
              <span style={{ fontSize: 12, color: "#8A8A8E" }}>
                {session.coachName}
              </span>
              <span style={{ fontSize: 12, color: "#8A8A8E" }}>
                {fmtDuration(session.videoDurationSeconds)} video
              </span>
            </div>

            {/* Summary line */}
            <p
              style={{
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.55,
                margin: "0 0 12px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {session.summary}
            </p>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: isPast ? "#9CA3AF" : "#D4A017",
                  fontWeight: 600,
                }}
              >
                {isPast ? "Reviewed" : fmtDue(session.dueDate)}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#0D1B2A",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {session.status === "completed" ? "Review again" : "Open session"}
                {" →"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  accent,
}: {
  value: number | string;
  label: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "14px 16px",
        boxShadow: "0 1px 3px rgba(13,27,42,0.06)",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: accent ?? "#0D1B2A",
          margin: "0 0 2px",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 11, color: "#8A8A8E", margin: 0, lineHeight: 1.3 }}>
        {label}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PracticePage() {
  const active = studySessions.filter((s) => s.status !== "completed");
  const completed = studySessions.filter((s) => s.status === "completed");

  const assignedCount = active.length;
  const videoMinutes = studySessions
    .filter((s) => s.status !== "completed")
    .reduce((sum, s) => sum + Math.ceil(s.videoDurationSeconds / 60), 0);
  const coachNotesCount = studySessions.filter((s) => s.coachNotes).length;
  const mobilityCount = studySessions.filter(
    (s) => s.mobilityWork && s.mobilityWork.length > 0,
  ).length;

  return (
    <AppShell
      role="student"
      title="Study & Review"
      subtitle={`Study sessions · ${academyTheme.appDisplayName}`}
    >
      <div
        style={{
          background: "#F7F6F2",
          minHeight: "100%",
          margin: "-24px -16px",
          padding: "20px 16px 80px",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {/* ── Summary stat row ── */}
          <div
            style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}
          >
            <StatCard value={assignedCount} label="Assigned study" accent="#0D1B2A" />
            <StatCard value={`${videoMinutes}m`} label="Video to review" accent="#D4A017" />
            <StatCard value={coachNotesCount} label="Coach notes" accent="#166534" />
            <StatCard value={mobilityCount} label="Optional mobility" accent="#6B7280" />
          </div>

          {/* ── Active sessions ── */}
          {active.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8A8A8E",
                  margin: "0 0 12px",
                }}
              >
                Active sessions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {active.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </div>
            </section>
          )}

          {/* ── Completed sessions ── */}
          {completed.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8A8A8E",
                  margin: "0 0 12px",
                }}
              >
                Completed
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {completed.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </div>
            </section>
          )}

          {studySessions.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 1px 3px rgba(13,27,42,0.07)",
              }}
            >
              <p style={{ fontSize: 32, marginBottom: 10 }}>📋</p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1C1C1E",
                  margin: "0 0 4px",
                }}
              >
                No study sessions yet
              </p>
              <p style={{ fontSize: 12, color: "#8A8A8E", margin: 0 }}>
                Coach Rivera will assign sessions after each class.
              </p>
            </div>
          )}

          {/* ── Powered by footer ── */}
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(0,0,0,0.22)",
              marginTop: 36,
            }}
          >
            Powered by AcademyHub
          </p>
        </div>
      </div>
    </AppShell>
  );
}
