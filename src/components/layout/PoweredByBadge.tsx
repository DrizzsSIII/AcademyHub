import { academyTheme } from "@/lib/theme";

export function PoweredByBadge() {
  if (!academyTheme.poweredByVisible) return null;
  return (
    <p className="px-2 text-center text-[11px] text-black/40">
      Powered by AcademyHub
    </p>
  );
}
