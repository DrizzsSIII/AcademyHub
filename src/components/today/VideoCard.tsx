"use client";

import Link from "next/link";
import { useState } from "react";

export type TodayVideo = {
  title: string;
  coach: string;
  type: "Gi" | "No-Gi";
  date: string;
  duration: string;
  youtubeId: string;
  watched: boolean;
  href: string;
};

type VideoCardProps = {
  video: TodayVideo;
};

export function VideoCard({ video }: VideoCardProps) {
  const [imgHidden, setImgHidden] = useState(false);

  return (
    <Link
      href={video.href}
      style={{
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.07)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        height: 88,
        marginBottom: 9,
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          width: 110,
          flexShrink: 0,
          background: "#0D1B2A",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imgHidden ? (
          // eslint-disable-next-line @next/next/no-img-element -- spec: plain img for YouTube thumbs
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              setImgHidden(true);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
          aria-hidden
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "8px solid #0D1B2A",
              marginLeft: 2,
            }}
          />
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: 9,
            padding: "2px 5px",
            borderRadius: 4,
            zIndex: 1,
          }}
        >
          {video.duration}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                fontWeight: 600,
                background: "#0D1B2A",
                color: "#fff",
                padding: "2px 6px",
                borderRadius: 4,
              }}
            >
              {video.type}
            </span>
            <span style={{ fontSize: 11, color: "#8A8A8E" }}>
              · {video.coach}
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1C1C1E",
              lineHeight: 1.3,
              marginTop: 6,
            }}
          >
            {video.title}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 11, color: "#8A8A8E" }}>{video.date}</span>
          {video.watched ? (
            <span
              style={{
                fontSize: 11,
                color: "#1D9E75",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 12.5L10.2 17L18 8.5"
                  stroke="#1D9E75"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Watched
            </span>
          ) : (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#0D1B2A",
                padding: "4px 10px",
                border: "0.5px solid rgba(13,27,42,0.3)",
                borderRadius: 20,
                background: "transparent",
              }}
            >
              Watch
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
