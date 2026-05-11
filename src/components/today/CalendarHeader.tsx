"use client";

import { useMemo, useState } from "react";
import type { MonthlyFocus, TodayCalendarClass } from "@/types";

function startOfWeekMonday(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = x.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  return x;
}

function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayHasClasses(classes: TodayCalendarClass[], day: Date) {
  return classes.some((c) =>
    isSameCalendarDay(new Date(c.scheduledAt), day),
  );
}

/** "May 2026" -> "May" for focus label */
function shortMonthLabel(monthYear: string) {
  const part = monthYear.trim().split(/\s+/)[0];
  return part || monthYear;
}

type CalendarHeaderProps = {
  selectedDay: Date;
  onDaySelect: (day: Date) => void;
  monthlyFocusData: MonthlyFocus;
  scheduleClasses: TodayCalendarClass[];
};

const WEEK_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

export function CalendarHeader({
  selectedDay,
  onDaySelect,
  monthlyFocusData,
  scheduleClasses,
}: CalendarHeaderProps) {
  const [focusExpanded, setFocusExpanded] = useState(false);

  const weekDays = useMemo(() => {
    const start = startOfWeekMonday(selectedDay);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [selectedDay]);

  const focusPrefix = `${shortMonthLabel(monthlyFocusData.month)} focus:`;

  return (
    <div
      className="overflow-hidden rounded-[var(--border-radius-lg)] border-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)]"
      role="region"
      aria-label="This week"
    >
      <div className="grid grid-cols-7 gap-1 px-3 pb-3 pt-3 sm:px-4">
        {weekDays.map((day, idx) => {
          const selected = isSameCalendarDay(day, selectedDay);
          const hasClasses = dayHasClasses(scheduleClasses, day);
          const dayNum = day.getDate();

          return (
            <button
              key={`${day.toISOString()}-${idx}`}
              type="button"
              onClick={() => onDaySelect(new Date(day))}
              className="flex flex-col items-center gap-1 rounded-md py-1 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
            >
              <span className="text-[9px] uppercase text-[var(--color-text-secondary)]">
                {WEEK_LETTERS[idx]}
              </span>
              <span
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-xs ${
                  selected
                    ? "bg-[color:var(--color-primary)] font-bold text-white"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {dayNum}
              </span>
              <span
                className={`h-1 w-1 rounded-full ${
                  hasClasses
                    ? selected
                      ? "bg-white"
                      : "bg-[color:var(--color-primary)]/45"
                    : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--color-border-tertiary)]">
        <button
          type="button"
          onClick={() => setFocusExpanded((v) => !v)}
          className="flex w-full items-center gap-2 bg-[color-mix(in_srgb,var(--color-accent)_10%,var(--color-background-secondary))] px-3 py-2 text-left text-xs text-[var(--color-text-primary)] transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)] sm:px-4"
        >
          <span className="shrink-0 font-semibold text-[var(--color-text-secondary)]">
            {focusPrefix}
          </span>
          <span className="min-w-0 flex-1 font-medium">
            {monthlyFocusData.theme}
          </span>
        </button>
        <div
          className="overflow-hidden border-t border-[var(--color-border-tertiary)] transition-[max-height] duration-200 ease-out"
          style={{ maxHeight: focusExpanded ? 160 : 0 }}
        >
          <div className="bg-[var(--color-background-secondary)] px-3 py-2.5 text-xs leading-relaxed text-[var(--color-text-secondary)] sm:px-4">
            {monthlyFocusData.description}
          </div>
        </div>
      </div>
    </div>
  );
}
