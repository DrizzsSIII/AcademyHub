import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { ClassCard } from "@/components/ui/ClassCard";
import { classes } from "@/data/mock";

export default function SchedulePage() {
  const sorted = [...classes].sort(
    (a, b) =>
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <AppShell
      role="student"
      title="Schedule"
      subtitle={`Classes at ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        {sorted.map((c) => (
          <ClassCard key={c.id} cls={c} />
        ))}
      </div>
    </AppShell>
  );
}
