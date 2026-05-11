import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { studentsTable, users } from "@/data/mock";

export default function AdminDashboardPage() {
  const coaches = users.filter((u) => u.role === "coach");

  return (
    <AppShell
      role="admin"
      title="Admin"
      subtitle={`${academyTheme.name} · overview`}
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Active students</p>
            <p className="mt-2 text-3xl font-semibold text-ink">
              {studentsTable.filter((s) => s.status === "active").length}
            </p>
            <Link
              href="/admin/students"
              className="mt-2 inline-block text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
            >
              Manage roster
            </Link>
          </div>
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Coaches</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{coaches.length}</p>
            <Link
              href="/admin/coaches"
              className="mt-2 inline-block text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
            >
              View coaches
            </Link>
          </div>
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Brand</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              {academyTheme.appDisplayName}
            </p>
            <Link
              href="/admin/brand-settings"
              className="mt-2 inline-block text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
            >
              Edit appearance
            </Link>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-ink">This week</h2>
          <p className="mt-2 text-sm text-muted">
            Demo metrics only — hook up analytics later. Owners still get the
            narrative: retention, engagement, and coach output in one place.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/[0.06] bg-page p-4">
              <p className="text-xs text-muted">Trial conversions (mock)</p>
              <p className="mt-1 text-xl font-semibold text-ink">72%</p>
            </div>
            <div className="rounded-xl border border-black/[0.06] bg-page p-4">
              <p className="text-xs text-muted">Avg. classes / member (mock)</p>
              <p className="mt-1 text-xl font-semibold text-ink">3.4</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
