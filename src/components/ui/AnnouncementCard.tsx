import type { Announcement } from "@/types";
import { getUserById } from "@/data/mock";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const coach = getUserById(announcement.coachId);
  return (
    <div
      className="rounded-xl border border-black/[0.1] bg-white p-4"
      style={{
        borderLeftWidth: 3,
        borderLeftColor: "var(--color-accent)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{announcement.title}</p>
        {announcement.pinned ? (
          <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-semibold text-muted">
            Pinned
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {announcement.body}
      </p>
      <p className="mt-3 text-xs text-muted">
        {coach?.name} ·{" "}
        {new Date(announcement.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
