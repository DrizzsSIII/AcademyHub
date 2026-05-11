import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { BrandSettingsForm } from "@/components/forms/BrandSettingsForm";

export default function BrandSettingsPage() {
  return (
    <AppShell
      role="admin"
      title="Brand settings"
      subtitle={`White-label controls · ${academyTheme.name}`}
    >
      <BrandSettingsForm />
    </AppShell>
  );
}
