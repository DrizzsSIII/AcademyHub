import type { PracticeAssignment } from "@/types";

type PracticeCardProps = {
  assignment: PracticeAssignment;
};

export function PracticeCard({ assignment }: PracticeCardProps) {
  const total = assignment.items.length;
  const done = assignment.items.filter((i) => i.completed).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const statusLabel =
    assignment.status === "completed"
      ? "Completed"
      : assignment.status === "in_progress"
        ? "In progress"
        : "Not started";

  return (
    <div className="card-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-ink">{assignment.title}</p>
          <p className="text-xs text-muted">
            Due {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-page px-2.5 py-1 text-[11px] font-semibold text-muted">
          {statusLabel}
        </span>
      </div>
      <p className="mt-3 text-xs text-muted">{assignment.items.length} items</p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: "var(--color-accent)",
          }}
        />
      </div>
    </div>
  );
}
