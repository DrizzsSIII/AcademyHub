import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { classes, getUserById, questions } from "@/data/mock";

export default function CoachQuestionsPage() {
  const sorted = [...questions].sort(
    (a, b) => Number(a.answered) - Number(b.answered),
  );

  return (
    <AppShell
      role="coach"
      title="Student questions"
      subtitle={`Inbox · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        {sorted.map((q) => {
          const author = getUserById(q.authorStudentId);
          const cls = classes.find((c) => c.id === q.classId);
          return (
            <div key={q.id} className="card-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted">
                  {author?.name} · {cls?.title}
                </p>
                {!q.answered ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    Needs answer
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                    Answered
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink">{q.text}</p>
              {!q.answered ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
                    placeholder="Write a clear, short answer athletes can apply on the mat…"
                  />
                  <button
                    type="button"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Publish answer
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  {q.answer?.text}{" "}
                  <Link
                    href="/questions"
                    className="font-semibold text-[color:var(--color-primary)] hover:underline"
                  >
                    View as student
                  </Link>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
