"use client";

import { useState } from "react";

type AnnouncementBannerProps = {
  message: string;
};

export function AnnouncementBanner({ message }: AnnouncementBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        background: "#FAEEDA",
        borderLeft: "3px solid #BA7517",
        borderRadius: "0 8px 8px 0",
        padding: "9px 12px",
        marginBottom: 14,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: "#633806",
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {message}
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        style={{
          fontSize: 16,
          color: "#854F0B",
          cursor: "pointer",
          flexShrink: 0,
          background: "none",
          border: "none",
          padding: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
