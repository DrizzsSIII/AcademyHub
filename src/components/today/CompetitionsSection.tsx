import type { AcademyCompetition } from "@/types";
import { CompetitionCard } from "@/components/today/CompetitionCard";

type CompetitionsSectionProps = {
  competitions: AcademyCompetition[];
};

export function CompetitionsSection({
  competitions: comps,
}: CompetitionsSectionProps) {
  const now = Date.now();
  const upcoming = [...comps]
    .filter((c) => new Date(c.date).getTime() > now)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  if (upcoming.length === 0) return null;

  return (
    <section className="mt-3.5">
      <div className="my-3.5 h-[0.5px] w-full bg-[var(--color-border-tertiary)]" />
      <h2 className="pb-2.5 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
        Upcoming competitions
      </h2>
      <div>
        {upcoming.map((c) => (
          <CompetitionCard key={c.id} competition={c} />
        ))}
      </div>
    </section>
  );
}
