import type { TodayCalendarClass } from "@/types";
import { ClassCard } from "@/components/today/ClassCard";

type ClassesListProps = {
  classes: TodayCalendarClass[];
  selectedDay: Date;
};

export function ClassesList({ classes, selectedDay }: ClassesListProps) {
  const dayLabel = selectedDay.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section>
      <div className="flex items-baseline justify-between pb-2.5 pt-3.5">
        <h2 className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
          Today&apos;s classes
        </h2>
        <p className="text-[11px] text-[var(--color-text-secondary)]">
          {dayLabel}
        </p>
      </div>

      {classes.length === 0 ? (
        <p className="py-6 text-center text-[13px] text-[var(--color-text-secondary)]">
          No classes scheduled
        </p>
      ) : (
        <div className="px-0">
          {classes.map((c) => (
            <ClassCard key={c.id} classData={c} />
          ))}
        </div>
      )}
    </section>
  );
}
