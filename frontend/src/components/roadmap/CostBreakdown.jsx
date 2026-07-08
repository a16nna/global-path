import { formatCurrency } from "../../utils/format";

export default function CostBreakdown({ universities, livingExpenses }) {
  const maxTuition = Math.max(...universities.map((u) => u.tuition));

  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <p className="eyebrow text-amber">Cost breakdown</p>
      <h3 className="mt-2 text-lg font-semibold text-paper">Tuition comparison</h3>

      <div className="mt-5 space-y-4">
        {universities.map((u) => (
          <div key={u.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-paper-dim">{u.name}</span>
              <span className="font-mono text-paper">{formatCurrency(u.tuition)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-stamp"
                style={{ width: `${(u.tuition / maxTuition) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-dashed border-line pt-4">
        <span className="text-sm text-paper-dim">Est. monthly living expenses</span>
        <span className="font-mono text-sm text-amber">
          {formatCurrency(livingExpenses.monthly, livingExpenses.currency)}
        </span>
      </div>
    </div>
  );
}
