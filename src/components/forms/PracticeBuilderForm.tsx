"use client";

import { useState } from "react";
import { practiceAssignments } from "@/data/mock";

export function PracticeBuilderForm() {
  const [title, setTitle] = useState("Week 3 — retention chain");
  const [due, setDue] = useState("");
  const [items, setItems] = useState([
    { id: "1", label: "Pummel to inside bicep", reps: "10", sets: "3" },
  ]);

  return (
    <form
      className="mx-auto max-w-2xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">Template</label>
        <select className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm">
          {practiceAssignments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">Assignment title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-2 p-4">
        <label className="text-xs font-semibold text-muted">Due date</label>
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="w-full rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="card-surface space-y-3 p-4">
        <p className="text-xs font-semibold text-muted">Drills</p>
        {items.map((it) => (
          <div
            key={it.id}
            className="grid gap-2 rounded-lg border border-black/[0.08] bg-page p-3 md:grid-cols-3"
          >
            <input
              value={it.label}
              onChange={(e) => {
                const v = e.target.value;
                setItems((prev) =>
                  prev.map((x) => (x.id === it.id ? { ...x, label: v } : x)),
                );
              }}
              className="rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm md:col-span-1"
            />
            <input
              value={it.reps}
              onChange={(e) => {
                const v = e.target.value;
                setItems((prev) =>
                  prev.map((x) => (x.id === it.id ? { ...x, reps: v } : x)),
                );
              }}
              placeholder="Reps"
              className="rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
            />
            <input
              value={it.sets}
              onChange={(e) => {
                const v = e.target.value;
                setItems((prev) =>
                  prev.map((x) => (x.id === it.id ? { ...x, sets: v } : x)),
                );
              }}
              placeholder="Sets"
              className="rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setItems((prev) => [
              ...prev,
              { id: String(prev.length + 1), label: "", reps: "", sets: "" },
            ])
          }
          className="text-sm font-semibold text-[color:var(--color-primary)]"
        >
          Add item
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Publish assignment
      </button>
    </form>
  );
}
