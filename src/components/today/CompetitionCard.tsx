"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AcademyCompetition } from "@/types";

type CompetitionCardProps = {
  competition: AcademyCompetition;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const eventTime = new Date(competition.date).getTime();
  const diff = eventTime - now.getTime();

  const closesAt = new Date(`${competition.registrationCloses}T23:59:59`);
  const msUntilClose = closesAt.getTime() - now.getTime();
  const closesWithinWeek =
    competition.signedUp &&
    msUntilClose >= 0 &&
    msUntilClose <= 7 * 24 * 60 * 60 * 1000;

  const eventDateLabel = new Date(competition.date).toLocaleDateString(
    undefined,
    { month: "long", day: "numeric", year: "numeric" },
  );

  let countdownHeader: ReactNode;
  if (diff <= 0) {
    countdownHeader = (
      <span className="text-sm font-semibold text-[#D4A017]">Today!</span>
    );
  } else if (competition.signedUp) {
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    countdownHeader = (
      <div className="flex items-end gap-2">
        <CountUnit value={days} label="days" />
        <CountUnit value={hours} label="hrs" pad />
        <CountUnit value={minutes} label="min" pad />
      </div>
    );
  } else {
    const days = Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
    countdownHeader = (
      <span className="text-[13px] text-white/60">{days} days</span>
    );
  }

  return (
    <article className="mb-2.5 overflow-hidden rounded-[var(--border-radius-lg)] border-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)]">
      <div className="flex items-start justify-between gap-3 bg-[#0D1B2A] px-[13px] py-2.5">
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-white">
            {competition.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-white/50">
            {competition.location}
          </p>
        </div>
        <div className="shrink-0 text-right">{countdownHeader}</div>
      </div>

      <div className="px-[13px] py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-text-secondary)]">
            {eventDateLabel} · {competition.type}
          </p>
          {competition.signedUp ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-success)]">
              <CheckIcon />
              Signed up
            </span>
          ) : (
            <button
              type="button"
              onClick={() =>
                window.open(competition.signUpUrl, "_blank", "noopener,noreferrer")
              }
              className="rounded-full border-none bg-[#D4A017] px-3 py-1 text-[11px] font-semibold text-[#0D1B2A] transition-[filter] duration-150 hover:brightness-105"
            >
              Sign up
            </button>
          )}
        </div>

        {competition.notes ? (
          <div
            className="mt-2 rounded-md px-2.5 py-1.5 text-[11px] text-[var(--color-text-secondary)]"
            style={{ background: "var(--color-background-secondary)" }}
          >
            {competition.notes}
          </div>
        ) : null}

        {closesWithinWeek ? (
          <p className="mt-1.5 text-[11px] text-[var(--color-text-warning)]">
            Registration closes{" "}
            {closesAt.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function CountUnit({
  value,
  label,
  pad,
}: {
  value: number;
  label: string;
  pad?: boolean;
}) {
  const display = pad ? pad2(Math.max(0, value)) : String(Math.max(0, value));
  return (
    <div className="text-right">
      <div className="text-base font-bold leading-none text-[#D4A017]">
        {display}
      </div>
      <div className="mt-0.5 text-[8px] uppercase text-white/40">{label}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 12.5L10.2 17L18 8.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
