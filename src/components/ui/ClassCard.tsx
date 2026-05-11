import type { ClassSession } from "@/types";
import { getUserById } from "@/data/mock";

type ClassCardProps = {
  cls: ClassSession;
  onRsvp?: () => void;
  rsvpLabel?: string;
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ClassCard({ cls, onRsvp, rsvpLabel }: ClassCardProps) {
  const coach = getUserById(cls.coachId);
  const isPast = new Date(cls.startsAt) < new Date();

  return (
    <div className="card-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-base font-semibold text-ink">{cls.title}</p>
          <p className="text-sm text-muted">{formatWhen(cls.startsAt)}</p>
          <p className="text-sm text-muted">{coach?.name}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-xs font-medium text-ink">
              {cls.type}
            </span>
            <span className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-xs font-medium text-muted">
              {cls.level}
            </span>
          </div>
        </div>
        {!isPast ? (
          <button
            type="button"
            onClick={onRsvp}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {rsvpLabel ?? "RSVP"}
          </button>
        ) : (
          <span className="shrink-0 rounded-lg border border-black/[0.08] bg-page px-3 py-2 text-xs font-medium text-muted">
            Completed
          </span>
        )}
      </div>
    </div>
  );
}
