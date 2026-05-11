import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { users } from "@/data/mock";

export default function AdminCoachesPage() {
  const coaches = users.filter((u) => u.role === "coach");

  return (
    <AppShell
      role="admin"
      title="Coaches"
      subtitle={`Staff · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {coaches.map((c) => {
          const initials = c.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2);
          return (
            <div
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/[0.1] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="text-xs text-muted">{c.title}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-xs font-semibold text-[color:var(--color-primary)]"
              >
                View profile
              </button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
