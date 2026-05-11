"use client";

import { useState } from "react";
import { academyTheme as defaultTheme } from "@/lib/theme";
import { ThemePreview } from "@/components/ui/ThemePreview";

export function BrandSettingsForm() {
  const [name, setName] = useState(defaultTheme.name);
  const [appName, setAppName] = useState(defaultTheme.appDisplayName);
  const [logoUrl, setLogoUrl] = useState("");
  const [initials, setInitials] = useState(defaultTheme.logoInitials);
  const [primary, setPrimary] = useState(defaultTheme.primaryColor);
  const [accent, setAccent] = useState(defaultTheme.accentColor);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [welcome, setWelcome] = useState(defaultTheme.welcomeMessage);
  const [powered, setPowered] = useState(defaultTheme.poweredByVisible);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="card-surface space-y-2 p-4">
          <label className="text-xs font-semibold text-muted">Academy name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="card-surface space-y-2 p-4">
          <label className="text-xs font-semibold text-muted">
            App display name
          </label>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="card-surface space-y-2 p-4">
          <label className="text-xs font-semibold text-muted">Logo URL</label>
          <input
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
          <label className="text-xs font-semibold text-muted">
            Initials fallback
          </label>
          <input
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="card-surface grid gap-4 p-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted">
              Primary color
            </label>
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="h-10 w-full rounded-lg border border-black/[0.1] bg-white p-1"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted">
              Accent color
            </label>
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="h-10 w-full rounded-lg border border-black/[0.1] bg-white p-1"
            />
          </div>
        </div>

        <div className="card-surface space-y-2 p-4">
          <p className="text-xs font-semibold text-muted">Theme</p>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                  theme === t
                    ? "border-[color:var(--color-primary)] bg-black/[0.03] text-[color:var(--color-primary)]"
                    : "border-black/[0.1] bg-white text-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">
            Demo: dark mode styles are preview-only here.
          </p>
        </div>

        <div className="card-surface space-y-2 p-4">
          <label className="text-xs font-semibold text-muted">
            Welcome message
          </label>
          <textarea
            value={welcome}
            onChange={(e) => setWelcome(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-black/[0.1] bg-white p-4 text-sm">
          <input
            type="checkbox"
            checked={powered}
            onChange={(e) => setPowered(e.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="font-semibold text-ink">
              Show “Powered by AcademyHub”
            </span>
            <span className="mt-1 block text-xs text-muted">
              Keeps your brand forward while staying honest about the platform.
            </span>
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save brand settings
        </button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-ink">Live preview</p>
        <ThemePreview
          primaryColor={primary}
          accentColor={accent}
          academyName={appName}
          logoInitials={initials || "AH"}
        />
        <p className="text-xs text-muted">
          Preview updates as you edit colors and naming.
        </p>
      </div>
    </div>
  );
}
