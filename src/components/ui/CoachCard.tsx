import type { PrivateTrainingCoach } from "@/types";

type CoachCardProps = {
  coach: PrivateTrainingCoach;
  selected?: boolean;
  onSelect?: () => void;
};

export function CoachCard({ coach, selected, onSelect }: CoachCardProps) {
  const initials = coach.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border bg-white p-4 text-left transition-[transform,opacity,box-shadow] hover:opacity-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.99] ${
        selected
          ? "border-[color:var(--color-primary)] ring-1 ring-[color:var(--color-primary)]/20"
          : "border-black/[0.1]"
      }`}
    >
      <div className="flex gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-ink">{coach.name}</p>
          <p className="text-xs text-muted">{coach.specialty}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {coach.sessionTypes.map((t) => (
              <span
                key={t}
                className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-[10px] font-medium text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
