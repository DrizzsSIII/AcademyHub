"use client";

import Link from "next/link";
import { useState } from "react";
import type { TodayCalendarClass } from "@/types";

type ClassCardProps = {
  classData: TodayCalendarClass;
};

function formatClassTime(iso: string) {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatTypeLabel(t: TodayCalendarClass["type"]) {
  if (t === "gi") return "Gi";
  if (t === "nogi") return "No-Gi";
  return "Gi + No-Gi";
}

export function ClassCard({ classData }: ClassCardProps) {
  const [rsvpd, setRsvpd] = useState(classData.rsvpd);
  const isPast = new Date(classData.scheduledAt).getTime() < Date.now();

  return (
    <article className="mb-2.5 flex overflow-hidden rounded-[var(--border-radius-lg)] border-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)]">
      <div
        className="w-1 shrink-0 self-stretch"
        style={{ backgroundColor: classData.color, width: 4 }}
        aria-hidden
      />
      <div className="min-w-0 flex-1 px-[13px] py-3">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {classData.title}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {classData.audience}
            </p>
          </div>
          <p className="shrink-0 text-[11px] text-[var(--color-text-secondary)]">
            {formatClassTime(classData.scheduledAt)}
          </p>
        </div>

        <p className="mb-2 text-xs text-[var(--color-text-secondary)]">
          {classData.coach} · {classData.duration} min ·{" "}
          {formatTypeLabel(classData.type)}
        </p>

        <div
          className="mb-2 rounded-md px-2.5 py-2"
          style={{ background: "var(--color-background-secondary)" }}
        >
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: classData.color }}
          >
            Today&apos;s focus
          </p>
          <p className="mt-1 text-xs leading-snug text-[var(--color-text-primary)]">
            {classData.todayFocus}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRsvpd((v) => !v)}
            className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-[filter,background-color,border-color] duration-150 ${
              rsvpd
                ? "border-[0.5px] border-[#B5D4F4] bg-[#E6F1FB] text-[#0C447C]"
                : "border-none bg-[#0D1B2A] text-white"
            }`}
            style={{ padding: "5px 12px" }}
          >
            {rsvpd ? (
              <span className="inline-flex items-center gap-1">
                Going <CheckTiny />
              </span>
            ) : (
              "RSVP"
            )}
          </button>

          {isPast ? (
            <Link
              href="/library"
              className="inline-flex items-center rounded-full border-[0.5px] border-[var(--color-border-secondary)] bg-transparent px-2.5 py-1 text-[11px] text-[var(--color-text-secondary)] transition-opacity duration-150 hover:opacity-80"
            >
              Watch recap
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CheckTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 12.5L10.2 17L18 8.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
