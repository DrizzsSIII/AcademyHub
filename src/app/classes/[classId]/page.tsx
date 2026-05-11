import Link from "next/link";
import { notFound } from "next/navigation";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import {
  getClassById,
  getUserById,
  practiceAssignments,
  questions,
} from "@/data/mock";

type Props = { params: { classId: string } };

export default function ClassRecapPage({ params }: Props) {
  const cls = getClassById(params.classId);
  if (!cls) notFound();

  const coach = getUserById(cls.coachId);
  const recap = cls.recap;
  const classQuestions = questions.filter((q) => q.classId === cls.id);
  const practice = recap?.practiceAssignmentId
    ? practiceAssignments.find((p) => p.id === recap.practiceAssignmentId)
    : undefined;

  const thumb = recap
    ? `https://img.youtube.com/vi/${recap.videoYoutubeId}/hqdefault.jpg`
    : null;

  return (
    <AppShell
      role="student"
      title="Class recap"
      subtitle={cls.title}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/schedule"
          className="inline-flex text-sm font-semibold text-[color:var(--color-primary)] hover:underline"
        >
          ← Back to schedule
        </Link>

        <div className="card-surface p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-ink">{cls.title}</h1>
              <p className="mt-1 text-sm text-muted">
                {new Date(cls.startsAt).toLocaleString()} · {coach?.name}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-xs font-medium">
                  {cls.type}
                </span>
                <span className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-xs font-medium text-muted">
                  {cls.level}
                </span>
                <span className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-xs font-medium text-muted">
                  {cls.attendanceCount} checked in
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-surface overflow-hidden">
          <div className="relative aspect-video w-full bg-black/5">
            {thumb ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Play video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[color:var(--color-primary)] shadow-card">
                    ▶
                  </span>
                </button>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Recap coming soon
              </div>
            )}
          </div>
        </div>

        {recap ? (
          <>
            <section className="card-surface space-y-2 p-4">
              <h2 className="text-sm font-semibold text-ink">What we covered</h2>
              <p className="text-sm leading-relaxed text-muted">{recap.summary}</p>
            </section>

            <section className="card-surface space-y-2 p-4">
              <h2 className="text-sm font-semibold text-ink">Key details</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {recap.keyDetails.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </section>

            <section className="card-surface space-y-2 p-4">
              <h2 className="text-sm font-semibold text-ink">Common mistakes</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {recap.commonMistakes.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        {practice ? (
          <section className="card-surface space-y-2 p-4">
            <h2 className="text-sm font-semibold text-ink">Practice assignment</h2>
            <p className="text-sm font-medium text-ink">{practice.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {practice.items.map((i) => (
                <li key={i.id}>• {i.title}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="card-surface space-y-4 p-4">
          <h2 className="text-sm font-semibold text-ink">Q&A</h2>
          <div className="space-y-3">
            {classQuestions.map((q) => {
              const author = getUserById(q.authorStudentId);
              const answerCoach = q.answer
                ? getUserById(q.answer.coachId)
                : undefined;
              return (
                <div
                  key={q.id}
                  className="rounded-lg border border-black/[0.06] bg-page p-3"
                >
                  <p className="text-sm text-ink">{q.text}</p>
                  <p className="mt-1 text-xs text-muted">
                    {author?.name} ·{" "}
                    {new Date(q.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {q.answer ? (
                    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                      <p className="text-xs font-semibold text-emerald-900">
                        Coach answer · {answerCoach?.name}
                      </p>
                      <p className="mt-1 text-sm text-emerald-950">
                        {q.answer.text}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs font-semibold text-amber-800">
                      Unanswered
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted" htmlFor="ask">
              Ask a question
            </label>
            <textarea
              id="ask"
              rows={3}
              placeholder="What are you stuck on from this class?"
              className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
            />
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Post question
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Mark as watched
          </button>
          <Link
            href="/private-training"
            className="flex flex-1 items-center justify-center rounded-xl border border-black/[0.1] bg-white py-3 text-sm font-semibold text-[color:var(--color-primary)]"
          >
            Book private help for this topic
          </Link>
        </div>

        <p className="pb-6 text-center text-[11px] text-black/40">
          {academyTheme.name}
        </p>
      </div>
    </AppShell>
  );
}
