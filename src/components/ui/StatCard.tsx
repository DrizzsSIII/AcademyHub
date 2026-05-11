import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
};

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="card-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
        {icon ? (
          <span className="text-muted" aria-hidden>
            {icon}
          </span>
        ) : null}
      </div>
      {trend ? (
        <p className="mt-2 text-xs text-muted">
          {trend === "up" ? "▲ Up from last week" : null}
          {trend === "down" ? "▼ Down from last week" : null}
          {trend === "neutral" ? "Flat vs last week" : null}
        </p>
      ) : null}
    </div>
  );
}
