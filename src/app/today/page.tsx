"use client";

import { useMemo, useState } from "react";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import {
  competitions,
  monthlyFocus,
  todayCalendarClasses,
} from "@/data/mock";
import { CalendarHeader } from "@/components/today/CalendarHeader";
import { ClassesList } from "@/components/today/ClassesList";
import { CompetitionsSection } from "@/components/today/CompetitionsSection";
import type { TodayCalendarClass } from "@/types";

function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function filterClassesByDay(
  list: TodayCalendarClass[],
  day: Date,
): TodayCalendarClass[] {
  return list
    .filter((c) => isSameCalendarDay(new Date(c.scheduledAt), day))
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
}

export default function TodayPage() {
  const [selectedDay, setSelectedDay] = useState(() => new Date());

  const todaysClasses = useMemo(
    () => filterClassesByDay(todayCalendarClasses, selectedDay),
    [selectedDay],
  );

  return (
    <AppShell
      role="student"
      title="Today"
      subtitle={`Schedule · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <CalendarHeader
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          monthlyFocusData={monthlyFocus}
          scheduleClasses={todayCalendarClasses}
        />
        <ClassesList classes={todaysClasses} selectedDay={selectedDay} />
        <CompetitionsSection competitions={competitions} />
        <p className="pb-2 text-center text-[10px] tracking-[0.06em] text-[var(--color-text-secondary)] opacity-50">
          Powered by AcademyHub
        </p>
      </div>
    </AppShell>
  );
}
