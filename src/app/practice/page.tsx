import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { PracticeCard } from "@/components/ui/PracticeCard";
import { practiceAssignments } from "@/data/mock";

export default function PracticePage() {
  const current = practiceAssignments.find((a) => a.status !== "completed");
  const past = practiceAssignments.filter((a) => a.status === "completed");

  return (
    <AppShell
      role="student"
      title="Practice"
      subtitle={`Assignments · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Current assignment</h2>
          {current ? (
            <div className="space-y-4">
              <PracticeCard assignment={current} />
              <div className="card-surface p-4">
                <p className="text-xs font-semibold text-muted">Items</p>
                <ul className="mt-3 space-y-2">
                  {current.items.map((it) => (
                    <li
                      key={it.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-black/[0.06] bg-page px-3 py-2"
                    >
                      <div className="flex items-center gap-2 text-sm text-ink">
                        <TypeIcon type={it.type} />
                        <span>{it.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">
                          {it.type === "reps"
                            ? `${it.reps} reps × ${it.sets} sets`
                            : it.type === "rounds"
                              ? `${it.rounds} rounds × ${it.durationMinutes} min`
                              : it.type === "video"
                                ? "Video"
                                : "Drill"}
                        </span>
                        <button
                          type="button"
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                          style={{ backgroundColor: "var(--color-primary)" }}
                          disabled={it.completed}
                        >
                          {it.completed ? "Done" : "Complete"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Progress</span>
                    <span>
                      {
                        current.items.filter((i) => i.completed).length
                      }{" "}
                      / {current.items.length}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(
                          (current.items.filter((i) => i.completed).length /
                            current.items.length) *
                            100,
                        )}%`,
                        backgroundColor: "var(--color-accent)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-surface p-4 text-sm text-muted">
              You&apos;re all caught up.
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Past assignments</h2>
          <div className="space-y-3">
            {past.map((a) => (
              <PracticeCard key={a.id} assignment={a} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function TypeIcon({ type }: { type: string }) {
  if (type === "reps")
    return (
      <span className="text-muted" aria-hidden>
        ⟳
      </span>
    );
  if (type === "rounds")
    return (
      <span className="text-muted" aria-hidden>
        ◷
      </span>
    );
  if (type === "video")
    return (
      <span className="text-muted" aria-hidden>
        ▶
      </span>
    );
  return (
    <span className="text-muted" aria-hidden>
      ✦
    </span>
  );
}
