import Link from "next/link";
import type { Video } from "@/types";
import { getUserById } from "@/data/mock";

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type VideoCardProps = {
  video: Video;
  href?: string;
};

export function VideoCard({ video, href }: VideoCardProps) {
  const coach = getUserById(video.coachId);
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const link = href ?? `/library`;

  return (
    <Link
      href={link}
      className="group card-surface block overflow-hidden transition-[transform,opacity] hover:opacity-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.99]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[color:var(--color-primary)] shadow-card">
            <PlayIcon />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {formatDuration(video.durationSeconds)}
        </span>
        <span
          className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full border border-white/80"
          style={{
            backgroundColor:
              video.watchStatus === "watched"
                ? "var(--color-accent)"
                : "transparent",
          }}
          title={
            video.watchStatus === "watched"
              ? "Watched"
              : video.watchStatus === "in_progress"
                ? "In progress"
                : "Unwatched"
          }
        />
      </div>
      <div className="space-y-1 p-3">
        <p className="line-clamp-2 text-sm font-semibold text-ink">
          {video.title}
        </p>
        <p className="text-xs text-muted">{coach?.name ?? "Coach"}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {video.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-md border border-black/[0.08] bg-page px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 7.5 17 12l-7.5 4.5V7.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
