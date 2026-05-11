import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { ClassCard } from "@/components/ui/ClassCard";
import { VideoCard } from "@/components/ui/VideoCard";
import {
  announcements,
  currentStudentId,
  getUserById,
  practiceAssignments,
  progressStats,
  videos,
} from "@/data/mock";
import { getMissedCatchupClass, getNextClass } from "@/lib/student";

export default function TodayPage() {
  const student = getUserById(currentStudentId);
  const firstName = student?.name.split(" ")[0] ?? "Alex";
  const nextClass = getNextClass();
  const missed = getMissedCatchupClass();
  const pinned = announcements.find((a) => a.pinned);
  const currentPractice =
    practiceAssignments.find((a) => a.status === "in_progress") ??
    practiceAssignments[1];
  const recentVideos = [...videos]
    .sort(
      (a, b) =>
        new Date(b.recordedAt ?? 0).getTime() -
        new Date(a.recordedAt ?? 0).getTime(),
    )
    .slice(0, 3);

  return (
    <AppShell
      role="student"
      title="Today"
      subtitle={academyTheme.welcomeMessage}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="card-surface p-5">
          <p className="text-sm font-semibold text-[color:var(--color-primary)]">
            Good morning, {firstName}.
          </p>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s what&apos;s happening today.
          </p>
        </section>

        {pinned ? (
          <section>
            <AnnouncementCard announcement={pinned} />
          </section>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-ink">Up next</h2>
            {nextClass ? (
              <ClassCard cls={nextClass} rsvpLabel="RSVP" />
            ) : (
              <div className="card-surface p-4 text-sm text-muted">
                No upcoming classes scheduled.
              </div>
            )}
          </div>
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-ink">Streak</h2>
            <div className="card-surface flex items-center gap-3 p-4">
              <FlameIcon />
              <div>
                <p className="text-lg font-semibold text-ink">
                  {progressStats.streakDays}-day streak
                </p>
                <p className="text-xs text-muted">Keep showing up.</p>
              </div>
              <span
                className="ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold text-[color:var(--color-primary)]"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 35%, white)" }}
              >
                On fire
              </span>
            </div>
          </div>
        </section>

        {missed?.recap ? (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-ink">You missed class</h2>
            <div className="card-surface flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{missed.title}</p>
                <p className="text-xs text-muted">
                  Catch the recap and assigned drills so you don&apos;t fall
                  behind.
                </p>
              </div>
              <Link
                href={`/classes/${missed.id}`}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                View recap
              </Link>
            </div>
          </section>
        ) : null}

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Assigned practice</h2>
          <div className="card-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {currentPractice.title}
                </p>
                <p className="text-xs text-muted">
                  Due{" "}
                  {new Date(currentPractice.dueDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Link
                href="/practice"
                className="text-sm font-semibold text-[color:var(--color-primary)] hover:underline"
              >
                Open
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {currentPractice.items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-page px-3 py-2 text-sm"
                >
                  <span className="text-ink">{it.title}</span>
                  <span className="text-xs text-muted">
                    {it.completed ? "Done" : "To do"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-ink">Recent class videos</h2>
            <Link
              href="/library"
              className="text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recentVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                href={v.classId ? `/classes/${v.classId}` : "/library"}
              />
            ))}
          </div>
        </section>

        <section className="card-surface p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Need extra help?</p>
              <p className="text-xs text-muted">
                Book a private with Coach Rivera or Coach Lee.
              </p>
            </div>
            <Link
              href="/private-training"
              className="inline-flex items-center justify-center rounded-lg border border-black/[0.1] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-primary)] transition-[transform,opacity] hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Request private training
            </Link>
          </div>
        </section>

        <p className="pb-4 text-center text-[11px] text-black/40 md:hidden">
          Powered by AcademyHub
        </p>
      </div>
    </AppShell>
  );
}

function FlameIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 3c1.2 2.2 3.6 3.4 3.6 6.4 0 1.6-.8 3-2.1 3.8.5-.9.8-1.9.8-3 0-2.6-1.6-4.4-2.3-5.5-.3 1.4-1 2.8-2.1 3.9C8.5 10.3 7 12.6 7 15c0 2.8 2.2 5 5 5s5-2.2 5-5c0-3.1-2-5.6-3.3-7.5C12.8 5.8 12 3 12 3Z"
        fill="var(--color-accent)"
        opacity="0.95"
      />
      <path
        d="M12 14.2c-.9 0-1.6.7-1.6 1.6 0 .6.3 1.1.8 1.4.9-.3 1.6-1.1 1.6-2.1 0-.5-.3-.9-.8-1.1v-.8Z"
        fill="var(--color-primary)"
        opacity="0.35"
      />
    </svg>
  );
}
