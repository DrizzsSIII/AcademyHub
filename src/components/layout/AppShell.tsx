"use client";

import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { Header } from "./Header";
import { MobileBottomNav, Sidebar } from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  role: UserRole;
};

export function AppShell({ children, title, subtitle, role }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar role={role} />
      <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
      <MobileBottomNav role={role} />
    </div>
  );
}
