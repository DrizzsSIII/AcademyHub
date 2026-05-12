import Link from "next/link";
import type { TodayVideo } from "@/components/today/VideoCard";
import { VideoCard } from "@/components/today/VideoCard";

type RecentVideosSectionProps = {
  videos: TodayVideo[];
};

export function RecentVideosSection({ videos }: RecentVideosSectionProps) {
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.11em",
            color: "#8A8A8E",
          }}
        >
          Recent videos
        </span>
        <Link
          href="/library"
          style={{
            fontSize: 12,
            color: "#D4A017",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          View all →
        </Link>
      </div>
      {videos.map((v) => (
        <VideoCard key={`${v.title}-${v.date}`} video={v} />
      ))}
    </section>
  );
}
