import Link from "next/link";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { ClassCard } from "@/components/ui/ClassCard";
import { classes, coachDashboardUserId } from "@/data/mock";

export default function CoachClassesPage() {
  const mine = classes
    .filter((c) => c.coachId === coachDashboardUserId)
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
    );

  return (
    <AppShell
      role="coach"
      title="Classes"
      subtitle={`Your schedule · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <Link
          href="/coach/videos/new"
          className="inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Post recap
        </Link>
        {mine.map((c) => (
          <div key={c.id} className="space-y-2">
            <ClassCard cls={c} />
            <div className="flex justify-end">
              <Link
                href="/coach/videos/new"
                className="text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
              >
                Post recap for this class
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
