import {
  classes,
  currentStudentId,
  studentMissedLastClass,
} from "@/data/mock";

export function getNextClass() {
  const now = Date.now();
  const upcoming = classes
    .filter((c) => new Date(c.startsAt).getTime() > now)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  return upcoming[0] ?? null;
}

export function getMissedCatchupClass() {
  if (!studentMissedLastClass) return null;
  const now = Date.now();
  const past = classes
    .filter((c) => new Date(c.startsAt).getTime() <= now)
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
    );
  const missed = past.find(
    (c) => !c.attendeeStudentIds.includes(currentStudentId),
  );
  return missed ?? null;
}
