type ThemePreviewProps = {
  primaryColor: string;
  accentColor: string;
  academyName: string;
  logoInitials: string;
};

export function ThemePreview({
  primaryColor,
  accentColor,
  academyName,
  logoInitials,
}: ThemePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.1] bg-page">
      <div className="flex min-h-[220px]">
        <div className="w-24 shrink-0 border-r border-black/[0.08] bg-white p-2">
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {logoInitials.slice(0, 3)}
            </div>
          </div>
          <div
            className="rounded-md border-l-[3px] bg-black/[0.03] px-2 py-1.5 text-[10px] font-semibold"
            style={{ borderLeftColor: primaryColor, color: primaryColor }}
          >
            Today
          </div>
          <div className="mt-1 rounded-md px-2 py-1.5 text-[10px] text-muted">
            Library
          </div>
        </div>
        <div className="flex-1 p-3">
          <p className="text-[11px] font-semibold text-ink">{academyName}</p>
          <div className="mt-3 rounded-xl border border-black/[0.08] bg-white p-3">
            <p className="text-[10px] font-medium text-muted">Next up</p>
            <p className="mt-1 text-xs font-semibold text-ink">Open mat</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="h-full w-2/3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-lg py-2 text-[10px] font-semibold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Primary action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
