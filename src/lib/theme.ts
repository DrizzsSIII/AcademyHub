export const academyTheme = {
  name: "Northside Jiu Jitsu",
  appDisplayName: "Northside JJ",
  primaryColor: "#0D1B2A",
  accentColor: "#D4A017",
  theme: "light" as const,
  logoInitials: "NJJ",
  poweredByVisible: true,
  welcomeMessage:
    "Welcome back. Here's what's happening at Northside today.",
};

export function themeStyleVars(
  overrides?: Partial<typeof academyTheme>,
): Record<string, string> {
  const primary = overrides?.primaryColor ?? academyTheme.primaryColor;
  const accent = overrides?.accentColor ?? academyTheme.accentColor;
  return {
    "--color-primary": primary,
    "--color-accent": accent,
  };
}
