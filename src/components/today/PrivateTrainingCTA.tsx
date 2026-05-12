import Link from "next/link";

type PrivateTrainingCTAProps = {
  classTopic: string;
};

export function PrivateTrainingCTA({ classTopic }: PrivateTrainingCTAProps) {
  const phrase = classTopic.trim().toLowerCase();

  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: 16,
        marginTop: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#0D1B2A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1C1C1E",
            }}
          >
            Need help with {phrase}?
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#8A8A8E",
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            Book a private with Coach Rivera or Coach Lee.
          </p>
        </div>
      </div>
      <Link
        href="/private-training"
        style={{
          display: "block",
          width: "100%",
          padding: 11,
          background: "transparent",
          border: "1.5px solid #0D1B2A",
          color: "#0D1B2A",
          fontSize: 13,
          fontWeight: 500,
          borderRadius: 10,
          cursor: "pointer",
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        Request private training
      </Link>
    </div>
  );
}
