import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { CoachCard } from "@/components/ui/CoachCard";
import { PrivateTrainingRequestForm } from "@/components/forms/PrivateTrainingRequestForm";
import { privateTrainingCoaches } from "@/data/mock";

export default function PrivateTrainingPage() {
  return (
    <AppShell
      role="student"
      title="Private training"
      subtitle={`1-on-1 help · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="card-surface p-5">
          <h1 className="text-xl font-semibold text-ink">Book 1-on-1 training</h1>
          <p className="mt-2 text-sm text-muted">
            Pick a coach, tell us what you&apos;re stuck on, and we&apos;ll find a
            time that fits your schedule.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Coaches</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {privateTrainingCoaches.map((c) => (
              <CoachCard key={c.id} coach={c} />
            ))}
          </div>
        </section>

        <PrivateTrainingRequestForm />
      </div>
    </AppShell>
  );
}
