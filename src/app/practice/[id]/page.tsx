"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { academyTheme } from "@/lib/theme";
import { studySessions } from "@/data/mock";

// ─── Checklist config ─────────────────────────────────────────────────────────

type CheckId =
  | "watch_video"
  | "review_details"
  | "mark_moments"
  | "save_question"
  | "mobility";

function buildChecklist(hasVideo: boolean, hasMobility: boolean) {
  const items: { id: CheckId; label: string; optional?: boolean }[] = [];
  if (hasVideo) items.push({ id: "watch_video", label: "Watch the recap video" });
  items.push({ id: "review_details", label: "Review key details" });
  items.push({ id: "mark_moments", label: "Mark any confusing moments" });
  items.push({ id: "save_question", label: "Write a question for your coach" });
  if (hasMobility)
    items.push({
      id: "mobility",
      label: "Optional mobility work",
      optional: true,
    });
  return items;
}

// ─── Reusable sub-components ─────────────────────────────────────────────────

function SectionCard({
  title,
  accent,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string;
  accent?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(13,27,42,0.07), 0 4px 12px rgba(13,27,42,0.04)",
        marginBottom: 12,
      }}
    >
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          background: "none",
          border: "none",
          cursor: collapsible ? "pointer" : "default",
          textAlign: "left",
          borderBottom: open ? "0.5px solid rgba(0,0,0,0.07)" : "none",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            color: accent ?? "#8A8A8E",
          }}
        >
          {title}
        </span>
        {collapsible &&
          (open ? (
            <ChevronUp size={15} color="#8A8A8E" />
          ) : (
            <ChevronDown size={15} color="#8A8A8E" />
          ))}
      </button>
      {open && <div style={{ padding: "14px 16px" }}>{children}</div>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: 13,
            color: "#1C1C1E",
            lineHeight: 1.65,
            marginBottom: i < items.length - 1 ? 8 : 0,
          }}
        >
          {item}
        </li>
      ))}
    </ol>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudySessionPage() {
  const { id } = useParams<{ id: string }>();
  const session = studySessions.find((s) => s.id === id);

  const checklist = useMemo(
    () =>
      buildChecklist(
        !!session?.videoYoutubeId,
        !!(session?.mobilityWork && session.mobilityWork.length > 0),
      ),
    [session],
  );

  const [checked, setChecked] = useState<Set<CheckId>>(new Set());
  const [reflection, setReflection] = useState("");
  const [coachQuestion, setCoachQuestion] = useState("");

  function toggle(id: CheckId) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const requiredItems = checklist.filter((i) => !i.optional);
  const completedRequired = requiredItems.filter((i) => checked.has(i.id)).length;
  const pct =
    requiredItems.length === 0
      ? 100
      : Math.round((completedRequired / requiredItems.length) * 100);
  const allDone = completedRequired === requiredItems.length;

  if (!session) {
    return (
      <AppShell role="student" title="Study & Review" subtitle={academyTheme.appDisplayName}>
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <p style={{ fontSize: 14, color: "#8A8A8E" }}>Session not found.</p>
          <Link
            href="/practice"
            style={{ fontSize: 13, color: "#0D1B2A", fontWeight: 600 }}
          >
            ← Back to Study & Review
          </Link>
        </div>
      </AppShell>
    );
  }

  const fmtDuration = (secs: number) => `${Math.floor(secs / 60)} min`;

  return (
    <AppShell
      role="student"
      title="Study & Review"
      subtitle={`${session.subtitle} · ${academyTheme.appDisplayName}`}
    >
      <div
        style={{
          background: "#F7F6F2",
          minHeight: "100%",
          margin: "-24px -16px",
          padding: "16px 16px 80px",
        }}
      >
        <div style={{ maxWidth: 620, margin: "0 auto" }}>

          {/* ── Back link ── */}
          <Link
            href="/practice"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontWeight: 600,
              color: "#0D1B2A",
              textDecoration: "none",
              marginBottom: 16,
            }}
          >
            <ChevronLeft size={15} />
            Study &amp; Review
          </Link>

          {/* ── Session header ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "18px 18px 16px",
              marginBottom: 14,
              boxShadow: "0 1px 3px rgba(13,27,42,0.07), 0 4px 12px rgba(13,27,42,0.04)",
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1C1C1E",
                margin: "0 0 4px",
                lineHeight: 1.25,
              }}
            >
              {session.title}
            </p>
            <p style={{ fontSize: 12, color: "#8A8A8E", margin: "0 0 12px" }}>
              {session.subtitle}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px 16px",
                fontSize: 12,
                color: "#8A8A8E",
                marginBottom: 14,
              }}
            >
              <span>Class: {session.classDate}</span>
              <span>{session.coachName}</span>
              <span>{fmtDuration(session.videoDurationSeconds)} video</span>
            </div>

            {/* Progress bar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 11, fontWeight: 700, color: "#8A8A8E" }}
                >
                  CHECKLIST PROGRESS
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: allDone ? "#166534" : "#0D1B2A",
                  }}
                >
                  {completedRequired} / {requiredItems.length}
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: "rgba(0,0,0,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background: allDone ? "#166534" : "#D4A017",
                    width: `${pct}%`,
                    transition: "width 300ms ease",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Video embed ── */}
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 14,
              boxShadow: "0 1px 3px rgba(13,27,42,0.07), 0 4px 12px rgba(13,27,42,0.04)",
              aspectRatio: "16/9",
              background: "#000",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${session.videoYoutubeId}?rel=0&modestbranding=1`}
              title={`${session.title} recap video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />
          </div>

          {/* ── Checklist ── */}
          <SectionCard title="Your checklist" accent="#0D1B2A">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {checklist.map((item) => {
                const done = checked.has(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: done ? "#F0FDF4" : "#FAFAFA",
                      border: done
                        ? "1px solid #BBF7D0"
                        : "1px solid rgba(0,0,0,0.07)",
                      borderRadius: 10,
                      padding: "11px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 150ms, border-color 150ms",
                    }}
                  >
                    {done ? (
                      <CheckCircle2 size={20} color="#16A34A" strokeWidth={2} />
                    ) : (
                      <Circle size={20} color="#D1D5DB" strokeWidth={1.5} />
                    )}
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: done ? "#15803D" : "#1C1C1E",
                        textDecoration: done ? "line-through" : "none",
                        flex: 1,
                      }}
                    >
                      {item.label}
                      {item.optional && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#9CA3AF",
                            textDecoration: "none",
                          }}
                        >
                          OPTIONAL
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          {/* ── Summary ── */}
          <SectionCard title="Class summary" accent="#0D1B2A" collapsible defaultOpen>
            <p
              style={{
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {session.summary}
            </p>
          </SectionCard>

          {/* ── Key Details ── */}
          <SectionCard title="Key details" accent="#166534" collapsible defaultOpen>
            <BulletList items={session.keyDetails} />
          </SectionCard>

          {/* ── Common Mistakes ── */}
          <SectionCard title="Common mistakes" accent="#92400E" collapsible defaultOpen>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {session.commonMistakes.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 12px",
                    background: "#FEF3C7",
                    borderRadius: 9,
                    border: "0.5px solid #FDE68A",
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#78350F",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {m}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── What To Watch For ── */}
          <SectionCard
            title="What to watch for in the video"
            accent="#1e3a8a"
            collapsible
            defaultOpen
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {session.watchFor.map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#DBEAFE",
                      color: "#1e40af",
                      fontSize: 10,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#1C1C1E",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {w}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Coach Notes (if present) ── */}
          {session.coachNotes && (
            <SectionCard title="Coach notes" accent="#D4A017" collapsible defaultOpen>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 14px",
                  background: "#FFFBEB",
                  borderRadius: 10,
                  border: "0.5px solid #FDE68A",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>📋</span>
                <p
                  style={{
                    fontSize: 13,
                    color: "#78350F",
                    lineHeight: 1.7,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {session.coachNotes}
                </p>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  margin: "10px 0 0",
                  textAlign: "right",
                }}
              >
                — {session.coachName}
              </p>
            </SectionCard>
          )}

          {/* ── Reflection Question ── */}
          <SectionCard title="Reflection question" accent="#4c1d95" collapsible defaultOpen>
            <p
              style={{
                fontSize: 13,
                color: "#1C1C1E",
                lineHeight: 1.7,
                margin: "0 0 12px",
                fontWeight: 500,
              }}
            >
              {session.reflectionQuestion}
            </p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your thoughts here… (not saved, just for your own clarity)"
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 9,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 13,
                color: "#1C1C1E",
                resize: "vertical",
                outline: "none",
                lineHeight: 1.6,
                background: "#FAFAFA",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </SectionCard>

          {/* ── Question For Coach ── */}
          <SectionCard title="Question for your coach" accent="#0D1B2A" collapsible defaultOpen>
            <p
              style={{
                fontSize: 12,
                color: "#8A8A8E",
                margin: "0 0 10px",
                lineHeight: 1.5,
              }}
            >
              Write one specific question to bring to the next class. The more
              precise, the more useful the answer.
            </p>
            <textarea
              value={coachQuestion}
              onChange={(e) => setCoachQuestion(e.target.value)}
              placeholder="e.g. When my knee cut stalls against a hip hook, should I reset or switch to the toreando?"
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 9,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 13,
                color: "#1C1C1E",
                resize: "vertical",
                outline: "none",
                lineHeight: 1.6,
                background: "#FAFAFA",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <p
              style={{
                fontSize: 11,
                color: "#9CA3AF",
                margin: "8px 0 0",
              }}
            >
              Tip: Check the "Write a question for your coach" item in your
              checklist once you have this filled in.
            </p>
          </SectionCard>

          {/* ── Optional Mobility ── */}
          {session.mobilityWork && session.mobilityWork.length > 0 && (
            <SectionCard
              title="Optional mobility work"
              accent="#6B7280"
              collapsible
              defaultOpen={false}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                  background: "#F3F4F6",
                  borderRadius: 9,
                  padding: "10px 12px",
                  margin: "0 0 14px",
                  lineHeight: 1.55,
                }}
              >
                These are gentle solo movements — not partner techniques. Do
                only what feels comfortable and skip anything that causes
                discomfort.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {session.mobilityWork.map((ex, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 14px",
                      background: "#F9FAFB",
                      borderRadius: 10,
                      border: "0.5px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#1C1C1E",
                          margin: 0,
                        }}
                      >
                        {ex.name}
                      </p>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9CA3AF",
                          fontWeight: 600,
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        ~{ex.durationMinutes} min
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {ex.description}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* ── Safety / context note ── */}
          <div
            style={{
              background: "#F3F4F6",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 20,
              border: "0.5px solid rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#9CA3AF",
                margin: "0 0 6px",
              }}
            >
              A note on study sessions
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Study sessions are designed for review, observation, and
              preparation between classes. Partner-based techniques should
              always be practiced under coach supervision on the mat. Any
              optional mobility work in this session should be done gently and
              within your own comfort level — skip anything that causes
              discomfort.
            </p>
          </div>

          {/* ── Mark complete CTA ── */}
          {!allDone ? (
            <div
              style={{
                textAlign: "center",
                padding: "6px 0 2px",
                fontSize: 12,
                color: "#9CA3AF",
              }}
            >
              Complete all {requiredItems.length} checklist items to finish this
              session.
            </div>
          ) : (
            <button
              type="button"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "#0D1B2A",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              ✓ Mark session complete
            </button>
          )}

          {/* ── Powered by footer ── */}
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(0,0,0,0.22)",
              marginTop: 28,
            }}
          >
            Powered by AcademyHub
          </p>
        </div>
      </div>
    </AppShell>
  );
}
