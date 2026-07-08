import { Check, Circle } from "lucide-react";

export function ScholarshipCard({ scholarships }) {
  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <p className="eyebrow text-amber">Funding</p>
      <h3 className="mt-2 text-lg font-semibold text-paper">Scholarships</h3>
      <ul className="mt-5 space-y-4">
        {scholarships.map((s) => (
          <li key={s.name} className="border-t border-dashed border-line pt-4 first:border-t-0 first:pt-0">
            <p className="font-medium text-paper">{s.name}</p>
            <p className="mt-1 text-sm text-paper-dim">{s.coverage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocumentsCard({ documents }) {
  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <p className="eyebrow text-stamp">Paperwork</p>
      <h3 className="mt-2 text-lg font-semibold text-paper">Documents required</h3>
      <ul className="mt-5 space-y-3">
        {documents.map((d) => (
          <li key={d} className="flex items-center gap-3 text-sm text-paper-dim">
            <Circle size={6} className="flex-shrink-0 fill-current text-paper-dim/50" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChecklistCard({ items }) {
  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <p className="eyebrow text-amber">Action items</p>
      <h3 className="mt-2 text-lg font-semibold text-paper">Checklist</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.task} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                item.done ? "border-stamp bg-stamp/20 text-stamp" : "border-line text-transparent"
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={item.done ? "text-paper-dim line-through" : "text-paper"}>
              {item.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
