import { academyTheme } from "@/lib/theme";
import { AppShell } from "@/components/layout/AppShell";
import { studentsTable } from "@/data/mock";

function beltLabel(b: string) {
  return b.charAt(0).toUpperCase() + b.slice(1);
}

export default function AdminStudentsPage() {
  return (
    <AppShell
      role="admin"
      title="Students"
      subtitle={`Roster · ${academyTheme.name}`}
    >
      <div className="mx-auto max-w-6xl overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs font-semibold text-muted">
              <th className="border-b border-black/[0.08] px-3 py-3">Student</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Belt</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Membership</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Status</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Classes</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Last active</th>
              <th className="border-b border-black/[0.08] px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsTable.map((s) => {
              const initials = s.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2);
              return (
                <tr key={s.id} className="text-sm">
                  <td className="border-b border-black/[0.06] px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        {initials}
                      </div>
                      <span className="font-medium text-ink">{s.name}</span>
                    </div>
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3 text-muted">
                    {beltLabel(s.belt)}
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3 text-muted capitalize">
                    {s.membership}
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3">
                    <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] font-semibold capitalize text-ink">
                      {s.status}
                    </span>
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3 text-muted">
                    {s.classesAttended}
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3 text-muted">
                    {s.lastActive}
                  </td>
                  <td className="border-b border-black/[0.06] px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-black/[0.1] bg-white px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-black/[0.1] bg-white px-2 py-1 text-xs font-semibold text-muted"
                      >
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
