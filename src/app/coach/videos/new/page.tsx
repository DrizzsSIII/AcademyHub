import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { PostRecapForm } from "@/components/forms/PostRecapForm";

export default function PostRecapPage() {
  return (
    <AppShell
      role="coach"
      title="Post recap"
      subtitle={`Under 2 minutes · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="text-sm text-muted">
          Paste a link, add three takeaways, and ship the assignment. Students get
          a clean recap on their Today tab.
        </p>
        <PostRecapForm />
      </div>
    </AppShell>
  );
}
