import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import {
  classes,
  coachDashboardUserId,
  coachEngagement,
  getClassById,
  getUserById,
  mockNow,
  questions,
  recentCoachPosts,
} from "@/data/mock";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CoachDashboardPage() {
  const coach = getUserById(coachDashboardUserId);
  const todays = classes.filter(
    (c) =>
      c.coachId === coachDashboardUserId &&
      isSameDay(new Date(c.startsAt), mockNow),
  );
  const pendingQuestions = questions.filter((q) => !q.answered).length;

  return (
    <AppShell
      role="coach"
      title="Coach dashboard"
      subtitle={`${coach?.name ?? "Coach"} · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted">Quick actions</p>
            <p className="text-lg font-semibold text-ink">Keep athletes on track</p>
          </div>
          <Link
            href="/coach/videos/new"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Post new recap
          </Link>
        </div>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-ink">Today&apos;s classes</h2>
            <Link
              href="/coach/questions"
              className="text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
            >
              {pendingQuestions} pending questions
            </Link>
          </div>
          {todays.length ? (
            <div className="space-y-3">
              {todays.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-3 rounded-xl border border-black/[0.1] bg-white p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-ink">{c.title}</p>
                    <p className="text-sm text-muted">
                      {new Date(c.startsAt).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      · {c.type} · {c.level}
                    </p>
                  </div>
                  <Link
                    href="/coach/videos/new"
                    className="inline-flex items-center justify-center rounded-lg border border-black/[0.1] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-primary)]"
                  >
                    Post recap
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-surface p-4 text-sm text-muted">
              No classes assigned to you today in the demo dataset.
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Recaps this week</p>
            <p className="mt-2 text-2xl font-semibold text-ink">
              {coachEngagement.recapsPostedThisWeek}
            </p>
          </div>
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Questions answered</p>
            <p className="mt-2 text-2xl font-semibold text-ink">
              {coachEngagement.questionsAnswered}
            </p>
          </div>
          <div className="card-surface p-4">
            <p className="text-xs font-semibold text-muted">Pending student Qs</p>
            <p className="mt-2 text-2xl font-semibold text-ink">
              {pendingQuestions}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Recent posts</h2>
          <div className="space-y-2">
            {recentCoachPosts.map((p) => {
              const c = getClassById(p.classId);
              return (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/[0.1] bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{p.title}</p>
                    <p className="text-xs text-muted">
                      {c?.title} ·{" "}
                      {new Date(p.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link
                    href={c ? `/classes/${c.id}` : "/library"}
                    className="text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
                  >
                    View
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
