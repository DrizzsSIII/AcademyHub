"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { academyTheme } from "@/lib/theme";
import type { UserRole } from "@/types";
import { HomeLogoLink } from "./HomeLogoLink";
import { PoweredByBadge } from "./PoweredByBadge";

import type { ReactNode } from "react";

type NavItem = { href: string; label: string; icon: ReactNode };

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-r-lg px-3 py-2.5 text-sm font-medium transition-[transform,opacity,color,background-color] hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.99] ${
        active
          ? "border-l-[3px] border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
          : "border-l-[3px] border-transparent text-ink"
      }`}
    >
      <span
        className={`shrink-0 ${active ? "text-[color:var(--color-primary)]" : "text-muted"}`}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

const studentNav: NavItem[] = [
  {
    href: "/today",
    label: "Today",
    icon: <IconSun />,
  },
  {
    href: "/schedule",
    label: "Schedule",
    icon: <IconCalendar />,
  },
  {
    href: "/library",
    label: "Library",
    icon: <IconPlay />,
  },
  {
    href: "/practice",
    label: "Practice",
    icon: <IconDumbbell />,
  },
  {
    href: "/progress",
    label: "Progress",
    icon: <IconChart />,
  },
  {
    href: "/questions",
    label: "Questions",
    icon: <IconChat />,
  },
  {
    href: "/private-training",
    label: "Private Training",
    icon: <IconUserPlus />,
  },
];

const coachNav: NavItem[] = [
  { href: "/coach", label: "Dashboard", icon: <IconGrid /> },
  { href: "/coach/classes", label: "Classes", icon: <IconCalendar /> },
  { href: "/coach/videos/new", label: "Post Recap", icon: <IconVideo /> },
  {
    href: "/coach/practice/new",
    label: "Practice Builder",
    icon: <IconDumbbell />,
  },
  { href: "/coach/questions", label: "Questions", icon: <IconChat /> },
  { href: "/admin/students", label: "Students", icon: <IconUsers /> },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <IconGrid /> },
  { href: "/admin/students", label: "Students", icon: <IconUsers /> },
  { href: "/admin/coaches", label: "Coaches", icon: <IconCoach /> },
  { href: "/admin/brand-settings", label: "Brand Settings", icon: <IconPalette /> },
];

function navForRole(role: UserRole): NavItem[] {
  if (role === "coach") return coachNav;
  if (role === "admin") return adminNav;
  return studentNav;
}

type SidebarProps = {
  role: UserRole;
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = navForRole(role);

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-black/[0.08] bg-white md:flex">
      <div className="flex items-center gap-3 px-4 py-5">
        <HomeLogoLink />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {academyTheme.appDisplayName}
          </p>
          <p className="truncate text-xs text-muted">{academyTheme.name}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-2 pb-4">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return <NavLink key={item.href} item={item} active={active} />;
        })}
      </nav>
      <div className="mt-auto space-y-3 px-4 pb-6">
        <PoweredByBadge />
      </div>
    </aside>
  );
}

function BottomNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = navForRole(role).slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/[0.08] bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-2">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-[10px] font-medium transition-[transform,opacity,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 active:scale-[0.98] ${
                active
                  ? "text-[color:var(--color-primary)]"
                  : "text-muted"
              }`}
            >
              <span className="scale-90">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileBottomNav({ role }: { role: UserRole }) {
  return <BottomNav role={role} />;
}

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 3v4M8 3v4M3 11h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 7.5 17 12l-7.5 4.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconDumbbell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 10h12M6 14h12M4 9v6M20 9v6M8 7v10M16 7v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19V5M8 19v-6M12 19V9M16 19v-4M20 19v-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H6a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUserPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 8v6M22 11h-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m16 10 5-3v10l-5-3v-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 21v-2a4 4 0 0 0-3-3.87M9 21v-2a4 4 0 0 1 3-3.87m3-3.13a4 4 0 1 0-7 0 4 4 0 0 0 7 0ZM3.6 9h.01M20.4 9h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCoach() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 7a4 4 0 1 0 8 0M4 21v-2a4 4 0 0 1 4-4h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 14h3l2 4-3 1-2-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPalette() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a7 7 0 1 0 7 7h-4M12 3a7 7 0 0 1 7 7h-4M12 3v18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
