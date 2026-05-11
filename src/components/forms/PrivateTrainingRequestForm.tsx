"use client";

import { useState } from "react";
import { classes, privateTrainingCoaches, videos } from "@/data/mock";

export function PrivateTrainingRequestForm() {
  const [coachId, setCoachId] = useState(privateTrainingCoaches[0]?.id ?? "");
  const [mode, setMode] = useState<"in-person" | "online">("in-person");
  const [times, setTimes] = useState("Tue/Thu evenings, Saturday mornings");
  const [notes, setNotes] = useState(
    "I keep getting flattened in smash pass — need a simple retention chain.",
  );
  const [related, setRelated] = useState(classes[0]?.id ?? "");

  return (
    <form
      className="mx-auto max-w-2xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">Coach</label>
        <select
          value={coachId}
          onChange={(e) => setCoachId(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        >
          {privateTrainingCoaches.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface space-y-2 p-4">
        <p className="text-xs font-semibold text-muted">Session type</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["in-person", "In-person"],
              ["online", "Online"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setMode(k)}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                mode === k
                  ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                  : "border-black/[0.1] bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">
          Preferred times
        </label>
        <textarea
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">
          What do you need help with?
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">
          Related class (optional)
        </label>
        <select
          value={related}
          onChange={(e) => setRelated(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <label className="mt-3 block text-xs font-semibold text-muted">
          Related video (optional)
        </label>
        <select className="mt-1 w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm">
          {videos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Submit request
      </button>
      <p className="text-center text-xs text-muted">
        Requests typically confirmed within 24 hours
      </p>
    </form>
  );
}
