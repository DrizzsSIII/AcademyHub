"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { todayCalendarClasses } from "@/data/mock";
import type { TodayCalendarClass } from "@/types";

function formatScheduleType(t: TodayCalendarClass["type"]) {
  if (t === "gi") return "Gi";
  if (t === "nogi") return "No-Gi";
  return "Gi + No-Gi";
}

export default function HeroTrainingCard() {
  const [openId, setOpenId] = useState<string | null>(null);

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const todaysClasses = todayCalendarClasses.filter((c) => {
    const classDate = new Date(c.scheduledAt);
    return classDate.toDateString() === today.toDateString();
  });

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.07)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#8A8A8E",
            fontWeight: 500,
          }}
        >
          Today&apos;s training plan
        </span>
        <span style={{ fontSize: 11, color: "#8A8A8E" }}>
          {dateLabel}
        </span>
      </div>

      {todaysClasses.length === 0 && (
        <p
          style={{
            fontSize: 13,
            color: "#8A8A8E",
            textAlign: "center",
            padding: "16px 0",
          }}
        >
          No classes scheduled today
        </p>
      )}

      {todaysClasses.map((cls, i) => {
        const isOpen = openId === cls.id;
        const isLast = i === todaysClasses.length - 1;
        const time = new Date(cls.scheduledAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });

        return (
          <div key={cls.id}>
            <button
              type="button"
              onClick={() => toggle(cls.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 0",
                borderBottom:
                  isLast && !isOpen
                    ? "none"
                    : "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
                background: "none",
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: cls.color ?? "#D4A017",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    margin: 0,
                  }}
                >
                  {cls.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#8A8A8E",
                    margin: "2px 0 0",
                  }}
                >
                  {cls.audience}
                </p>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#8A8A8E",
                  marginRight: 4,
                }}
              >
                {time}
              </span>
              <ChevronRight
                size={14}
                color="#8A8A8E"
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                  flexShrink: 0,
                }}
              />
            </button>

            {isOpen ? (
              <div
                style={{
                  background: "#F7F6F2",
                  borderRadius: 8,
                  padding: "10px 12px",
                  margin: "4px 0 8px",
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D4A017",
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  Today&apos;s focus
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#1C1C1E",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cls.todayFocus}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#8A8A8E",
                    margin: "8px 0 0",
                  }}
                >
                  {cls.coach} · {cls.duration} min · {formatScheduleType(cls.type)}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}

      <a
        href="/schedule"
        style={{
          display: "block",
          width: "100%",
          marginTop: 14,
          padding: "10px",
          background: "transparent",
          color: "#0D1B2A",
          fontSize: 12,
          fontWeight: 500,
          border: "1px solid rgba(13,27,42,0.2)",
          borderRadius: 10,
          cursor: "pointer",
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        View full schedule
      </a>
    </div>
  );
}
