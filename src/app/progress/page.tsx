import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { StatCard } from "@/components/ui/StatCard";
import {
  badges,
  progressStats,
  skillsChecklist,
  weeklyActivity,
} from "@/data/mock";

export default function ProgressPage() {
  const beltLabel =
    progressStats.belt.charAt(0).toUpperCase() + progressStats.belt.slice(1);

  const max = Math.max(...weeklyActivity.map((w) => w.value), 1);

  return (
    <AppShell
      role="student"
      title="Progress"
      subtitle={`Your training snapshot · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Classes attended" value={progressStats.classesAttended} />
          <StatCard label="Videos watched" value={progressStats.videosWatched} />
          <StatCard
            label="Practice done"
            value={progressStats.practiceAssignmentsDone}
          />
          <StatCard label="Streak" value={`${progressStats.streakDays} days`} />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="card-surface flex flex-col items-center justify-center p-6 lg:col-span-1">
            <ProgressRing
              percent={progressStats.curriculumPercent}
              label="Curriculum completion"
            />
          </div>
          <div className="card-surface p-5 lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Belt / level
                </p>
                <p className="mt-1 text-2xl font-semibold text-ink">
                  {beltLabel} belt
                </p>
                <p className="mt-1 text-sm text-muted">
                  {progressStats.skillsCompleted} completed ·{" "}
                  {progressStats.skillsPracticing} practicing ·{" "}
                  {progressStats.skillsIntroduced} introduced
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {skillsChecklist.map((s) => (
                <SkillBadge key={s.id} skill={s} />
              ))}
            </div>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-ink">Weekly activity</h2>
          <p className="mt-1 text-xs text-muted">Classes + practice sessions logged</p>
          <div className="mt-6 flex h-40 items-end gap-2">
            {weeklyActivity.map((w) => (
              <div key={w.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-md"
                  style={{
                    height: `${(w.value / max) * 100}%`,
                    minHeight: 8,
                    backgroundColor: "var(--color-accent)",
                  }}
                  title={`${w.label}: ${w.value}`}
                />
                <span className="text-[10px] font-semibold text-muted">
                  {w.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Badges earned</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {badges.map((b) => (
              <div key={b.id} className="card-surface p-4">
                <p className="text-sm font-semibold text-ink">{b.label}</p>
                <p className="mt-1 text-xs text-muted">
                  {new Date(b.earnedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
