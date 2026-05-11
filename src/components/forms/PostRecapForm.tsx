"use client";

import { useMemo, useState } from "react";
import { classes } from "@/data/mock";
import type { LevelTag } from "@/types";

const tagOptions = [
  "Guard",
  "Passing",
  "Submissions",
  "Mobility",
  "Takedowns",
  "Escapes",
  "No-Gi",
];

const levels: LevelTag[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Kids",
];

export function PostRecapForm() {
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [taught, setTaught] = useState("");
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");
  const [mist1, setMist1] = useState("");
  const [mist2, setMist2] = useState("");
  const [tags, setTags] = useState<string[]>(["Guard", "Passing"]);
  const [level, setLevel] = useState<LevelTag>("Intermediate");
  const [practiceOn, setPracticeOn] = useState(true);
  const [drills, setDrills] = useState([
    { id: "d1", title: "", kind: "reps" as const, reps: "", sets: "" },
  ]);
  const [notifyMissed, setNotifyMissed] = useState(true);
  const [roleAction, setRoleAction] = useState<"draft" | "approval" | "publish">(
    "publish",
  );

  const youtubeOk = useMemo(() => {
    if (!youtubeUrl.trim()) return null;
    return /youtube\.com|youtu\.be/.test(youtubeUrl);
  }, [youtubeUrl]);

  function toggleTag(t: string) {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  return (
    <form
      className="mx-auto max-w-2xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted" htmlFor="class">
          Class
        </label>
        <select
          id="class"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} — {new Date(c.startsAt).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted" htmlFor="yt">
          YouTube URL
        </label>
        <input
          id="yt"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="Paste a YouTube link"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
        />
        {youtubeOk === false ? (
          <p className="text-xs text-red-600">That doesn&apos;t look like YouTube.</p>
        ) : null}
        {youtubeOk ? (
          <p className="text-xs text-emerald-700">Link looks good.</p>
        ) : null}
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted" htmlFor="vtitle">
          Video title
        </label>
        <input
          id="vtitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
        />
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted" htmlFor="taught">
          What did you teach?
        </label>
        <textarea
          id="taught"
          value={taught}
          onChange={(e) => setTaught(e.target.value)}
          rows={3}
          placeholder="What did you teach today?"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
        />
        <p className="text-xs text-muted">
          Coach nudge: keep it tight — one theme, one finish.
        </p>
      </div>

      <div className="card-surface space-y-3 p-4">
        <p className="text-xs font-semibold text-muted">Key details</p>
        <p className="text-xs text-muted">Add 3 things students should remember</p>
        <input
          value={key1}
          onChange={(e) => setKey1(e.target.value)}
          placeholder="Detail 1"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
        <input
          value={key2}
          onChange={(e) => setKey2(e.target.value)}
          placeholder="Detail 2"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
        <input
          value={key3}
          onChange={(e) => setKey3(e.target.value)}
          placeholder="Detail 3"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-3 p-4">
        <p className="text-xs font-semibold text-muted">Common mistakes</p>
        <p className="text-xs text-muted">What mistake did you see most?</p>
        <input
          value={mist1}
          onChange={(e) => setMist1(e.target.value)}
          placeholder="Mistake 1"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
        <input
          value={mist2}
          onChange={(e) => setMist2(e.target.value)}
          placeholder="Mistake 2"
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-3 p-4">
        <p className="text-xs font-semibold text-muted">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((t) => {
            const on = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-[transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] active:scale-[0.98] ${
                  on
                    ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                    : "border-black/[0.1] bg-white text-muted"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted" htmlFor="level">
          Level
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as LevelTag)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink">Practice assignment</p>
            <p className="text-xs text-muted">
              Assign one practice drill before the next class
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPracticeOn((v) => !v)}
            className={`relative h-7 w-12 rounded-full border border-black/[0.08] transition-colors ${
              practiceOn ? "bg-[color:var(--color-primary)]" : "bg-black/[0.06]"
            }`}
            aria-pressed={practiceOn}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-card transition-transform ${
                practiceOn ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {practiceOn ? (
          <div className="space-y-3">
            {drills.map((d, idx) => (
              <div
                key={d.id}
                className="rounded-lg border border-black/[0.08] bg-page p-3"
              >
                <p className="text-xs font-semibold text-muted">
                  Drill {idx + 1}
                </p>
                <input
                  value={d.title}
                  onChange={(e) => {
                    const v = e.target.value;
                    setDrills((prev) =>
                      prev.map((x) => (x.id === d.id ? { ...x, title: v } : x)),
                    );
                  }}
                  placeholder="Drill title"
                  className="mt-2 w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
                />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <input
                    value={d.reps}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDrills((prev) =>
                        prev.map((x) => (x.id === d.id ? { ...x, reps: v } : x)),
                      );
                    }}
                    placeholder="Reps"
                    className="rounded-lg border border-black/[0.1] bg-white px-2 py-2 text-xs"
                  />
                  <input
                    value={d.sets}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDrills((prev) =>
                        prev.map((x) => (x.id === d.id ? { ...x, sets: v } : x)),
                      );
                    }}
                    placeholder="Sets"
                    className="rounded-lg border border-black/[0.1] bg-white px-2 py-2 text-xs"
                  />
                  <select
                    className="rounded-lg border border-black/[0.1] bg-white px-2 py-2 text-xs"
                    value={d.kind}
                    onChange={(e) => {
                      const kind = e.target.value as "reps";
                      setDrills((prev) =>
                        prev.map((x) => (x.id === d.id ? { ...x, kind } : x)),
                      );
                    }}
                  >
                    <option value="reps">Reps</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDrills((prev) => [
                  ...prev,
                  {
                    id: `d${prev.length + 1}`,
                    title: "",
                    kind: "reps",
                    reps: "",
                    sets: "",
                  },
                ])
              }
              className="text-sm font-semibold text-[color:var(--color-primary)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2"
            >
              Add another drill
            </button>
          </div>
        ) : null}
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-black/[0.1] bg-white p-4 text-sm">
        <input
          type="checkbox"
          checked={notifyMissed}
          onChange={(e) => setNotifyMissed(e.target.checked)}
          className="mt-1"
        />
        <span>
          <span className="font-semibold text-ink">
            Notify students who missed class?
          </span>
          <span className="mt-1 block text-xs text-muted">
            Sends a recap link and practice plan.
          </span>
        </span>
      </label>

      <div className="card-surface space-y-3 p-4">
        <p className="text-xs font-semibold text-muted">Publish</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["draft", "Save as draft"],
              ["approval", "Submit for approval"],
              ["publish", "Publish now"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setRoleAction(k)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-[transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] active:scale-[0.98] ${
                roleAction === k
                  ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                  : "border-black/[0.1] bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">
          Demo mode: buttons are visual only (no backend).
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.99]"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {roleAction === "draft"
          ? "Save draft"
          : roleAction === "approval"
            ? "Submit for approval"
            : "Publish recap"}
      </button>
    </form>
  );
}
