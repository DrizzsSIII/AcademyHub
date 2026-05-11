import type { SkillChecklistItem } from "@/types";

const statusStyles: Record<
  SkillChecklistItem["status"],
  { dot: string; text: string }
> = {
  not_started: {
    dot: "bg-gray-300",
    text: "text-muted",
  },
  introduced: {
    dot: "bg-gray-400",
    text: "text-muted",
  },
  practicing: {
    dot: "bg-amber-400",
    text: "text-ink",
  },
  completed: {
    dot: "bg-emerald-500",
    text: "text-ink",
  },
};

export function SkillBadge({ skill }: { skill: SkillChecklistItem }) {
  const s = statusStyles[skill.status];
  const statusLabel =
    skill.status === "not_started"
      ? "Not started"
      : skill.status === "introduced"
        ? "Introduced"
        : skill.status === "practicing"
          ? "Practicing"
          : "Completed";

  return (
    <div className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2">
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${s.text}`}>{skill.name}</p>
        <p className="text-[11px] text-muted">{statusLabel}</p>
      </div>
    </div>
  );
}
