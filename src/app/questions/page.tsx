"use client";

import { useMemo, useState } from "react";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import {
  classes,
  currentStudentId,
  getUserById,
  questions,
} from "@/data/mock";

type Filter = "all" | "mine" | "unanswered";

export default function QuestionsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const grouped = useMemo(() => {
    const list = questions.filter((q) => {
      if (filter === "mine") return q.authorStudentId === currentStudentId;
      if (filter === "unanswered") return !q.answered;
      return true;
    });
    const unanswered = list.filter((q) => !q.answered);
    const answered = list.filter((q) => q.answered);
    return { unanswered, answered };
  }, [filter]);

  return (
    <AppShell
      role="student"
      title="Questions"
      subtitle={`Class Q&A · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["mine", "My questions"],
              ["unanswered", "Unanswered"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                filter === k
                  ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                  : "border-black/[0.1] bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="space-y-6">
          {classes.map((c) => {
            const clsQs = [...grouped.unanswered, ...grouped.answered].filter(
              (q) => q.classId === c.id,
            );
            if (!clsQs.length) return null;
            return (
              <div key={c.id} className="space-y-3">
                <h2 className="text-sm font-semibold text-ink">{c.title}</h2>
                <div className="space-y-3">
                  {clsQs
                    .slice()
                    .sort((a, b) => Number(a.answered) - Number(b.answered))
                    .map((q) => {
                      const author = getUserById(q.authorStudentId);
                      const coach = q.answer
                        ? getUserById(q.answer.coachId)
                        : undefined;
                      return (
                        <div key={q.id} className="card-surface p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs text-muted">{author?.name}</p>
                            {q.answered ? (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                                Coach answered
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                                Unanswered
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-ink">{q.text}</p>
                          {q.answer ? (
                            <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                              <p className="text-xs font-semibold text-emerald-900">
                                {coach?.name}
                              </p>
                              <p className="mt-1 text-sm text-emerald-950">
                                {q.answer.text}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </section>

        <section className="card-surface space-y-2 p-4">
          <label className="text-xs font-semibold text-muted" htmlFor="newq">
            Ask a new question
          </label>
          <textarea
            id="newq"
            rows={3}
            placeholder="Tie it to a class or a technique you’re working…"
            className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Submit
          </button>
        </section>
      </div>
    </AppShell>
  );
}
