"use client";

import { useMemo } from "react";
import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import {
  academy,
  announcements,
  classes,
  currentStudentId,
  getUserById,
  progressStats,
  videos,
} from "@/data/mock";
import { getNextClass } from "@/lib/student";
import { AnnouncementBanner } from "@/components/today/AnnouncementBanner";
import HeroTrainingCard from "@/components/today/HeroTrainingCard";
import { PrivateTrainingCTA } from "@/components/today/PrivateTrainingCTA";
import { RecentVideosSection } from "@/components/today/RecentVideosSection";
import type { TodayVideo } from "@/components/today/VideoCard";
import { StreakWidget } from "@/components/today/StreakWidget";
import { TodayHeader } from "@/components/today/TodayHeader";

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TodayPage() {
  const student = getUserById(currentStudentId);
  const firstName = student?.name.split(" ")[0] ?? "Alex";

  const nextClass = useMemo(() => {
    return (
      getNextClass() ??
      classes.find((c) => c.id === "cls-armbar-next-mon") ??
      classes[0]
    );
  }, []);

  const pinned = announcements.find((a) => a.pinned);
  const announcementMessage = pinned
    ? `${pinned.title}. ${pinned.body}`
    : "In-house superfight showcase — June 14. Sign-ups open Monday. Speak with Coach Rivera.";

  const streakActiveDays = [true, true, false, true, true, true, false];

  const recentVideos: TodayVideo[] = useMemo(() => {
    const v1 = videos.find((v) => v.id === "vid-1");
    const v2 = videos.find((v) => v.id === "vid-2");
    const out: TodayVideo[] = [];
    if (v1) {
      out.push({
        title: v1.title,
        coach: `${getUserById(v1.coachId)?.name ?? "Coach Rivera"}`,
        type: "Gi",
        date: v1.recordedAt
          ? new Date(v1.recordedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          : "May 5",
        duration: formatDuration(v1.durationSeconds),
        youtubeId: v1.youtubeId,
        watched: v1.watchStatus === "watched",
        href: v1.classId ? `/classes/${v1.classId}` : "/library",
      });
    }
    if (v2) {
      out.push({
        title: "Single leg takedown entries",
        coach: `${getUserById(v2.coachId)?.name ?? "Coach Lee"}`,
        type: "No-Gi",
        date: "May 7",
        duration: formatDuration(v2.durationSeconds),
        youtubeId: "dQw4w9WgXcQ",
        watched: false,
        href: v2.classId ? `/classes/${v2.classId}` : "/library",
      });
    }
    return out.slice(0, 2);
  }, []);

  return (
    <AppShell
      role="student"
      title="Today"
      subtitle={`Training brief · ${academyTheme.appDisplayName}`}
    >
      <div
        className="-mx-4 -mt-6 min-h-full pb-10 pt-0 md:-mx-8 md:-mt-8"
        style={{
          background: "#F7F6F2",
          padding: "16px",
        }}
      >
        <div className="mx-auto max-w-lg space-y-6">
          <TodayHeader studentName={firstName} academyName={academy.name} />
          <AnnouncementBanner message={announcementMessage} />
          <HeroTrainingCard />
          <StreakWidget
            streakDays={progressStats.streakDays}
            activeDays={streakActiveDays}
          />
          <RecentVideosSection videos={recentVideos} />
          <PrivateTrainingCTA classTopic={nextClass.title} />
          <footer
            style={{
              textAlign: "center",
              padding: "24px 0 10px",
              fontSize: "10px",
              color: "rgba(138,138,142,0.5)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Powered by AcademyHub
          </footer>
        </div>
      </div>
    </AppShell>
  );
}
