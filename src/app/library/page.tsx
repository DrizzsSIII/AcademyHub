"use client";

import { useMemo, useState } from "react";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { VideoCard } from "@/components/ui/VideoCard";
import { curriculumPaths, videos } from "@/data/mock";
import type { VideoFilter } from "@/types";

const filters: { id: VideoFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "position", label: "By position" },
  { id: "technique", label: "By technique" },
  { id: "coach", label: "By coach" },
  { id: "level", label: "By level" },
];

export default function LibraryPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<VideoFilter>("all");

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      if (q.trim()) {
        const s = q.toLowerCase();
        if (
          !v.title.toLowerCase().includes(s) &&
          !v.tags.some((t) => t.toLowerCase().includes(s))
        ) {
          return false;
        }
      }
      if (filter === "coach") return true;
      if (filter === "level") return true;
      if (filter === "position") return Boolean(v.position || v.tags.length);
      if (filter === "technique") return Boolean(v.technique || v.tags.length);
      return true;
    });
  }, [q, filter]);

  const continueWatching = videos.filter((v) => v.watchStatus === "in_progress");

  return (
    <AppShell
      role="student"
      title="Library"
      subtitle={`Technique library · ${academyTheme.appDisplayName}`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="card-surface p-4">
          <label className="text-xs font-semibold text-muted" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search techniques, positions, coaches…"
            className="mt-2 w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-[transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] active:scale-[0.98] ${
                filter === f.id
                  ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                  : "border-black/[0.1] bg-white text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Curriculum paths</h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
            {curriculumPaths.map((p) => (
              <div
                key={p.id}
                className="min-w-[240px] shrink-0 rounded-xl border border-black/[0.1] bg-white p-4"
              >
                <p className="text-sm font-semibold text-ink">{p.title}</p>
                <p className="mt-1 text-xs text-muted">{p.videoCount} videos</p>
                <p className="mt-3 line-clamp-3 text-xs text-muted">
                  {p.topics.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {continueWatching.length ? (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-ink">Continue watching</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {continueWatching.map((v) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  href={v.classId ? `/classes/${v.classId}` : "/library"}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">All videos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {filtered.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                href={v.classId ? `/classes/${v.classId}` : "/library"}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
