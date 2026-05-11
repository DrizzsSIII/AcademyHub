"use client";

import { academyTheme } from "@/lib/theme";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.08] bg-page/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight text-ink md:text-xl">
            {title}
          </p>
          {subtitle ? (
            <p className="truncate text-sm text-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-ink transition-[transform,opacity] hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2"
            aria-label="Notifications"
          >
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
            <BellIcon />
          </button>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
            title={academyTheme.appDisplayName}
          >
            AJ
          </div>
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-ink"
      aria-hidden
    >
      <path
        d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5L4 18h16l-2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
