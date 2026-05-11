import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { PracticeBuilderForm } from "@/components/forms/PracticeBuilderForm";

export default function PracticeBuilderPage() {
  return (
    <AppShell
      role="coach"
      title="Practice builder"
      subtitle={`Assignments · ${academyTheme.name}`}
    >
      <PracticeBuilderForm />
    </AppShell>
  );
}
