import Link from "next/link";
import { academyTheme } from "@/lib/theme";

type HomeLogoLinkProps = {
  className?: string;
};

export function HomeLogoLink({ className }: HomeLogoLinkProps) {
  return (
    <Link
      href="/"
      aria-label={`Back to ${academyTheme.appDisplayName} home`}
      className={`inline-flex shrink-0 rounded-xl transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.98] ${className ?? ""}`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {academyTheme.logoInitials}
      </span>
    </Link>
  );
}
