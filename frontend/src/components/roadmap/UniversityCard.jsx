import { GraduationCap } from "lucide-react";
import { formatCurrency } from "../../utils/format";

export default function UniversityCard({ university }) {
  const { name, rank, tuition, fitScore } = university;

  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-stamp">
            <GraduationCap size={18} />
          </span>
          <div>
            <h3 className="font-semibold text-paper">{name}</h3>
            <p className="eyebrow mt-1 text-paper-dim">{rank}</p>
          </div>
        </div>
        <span className="flex-shrink-0 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-xs text-amber">
          {fitScore}% fit
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4">
        <span className="text-sm text-paper-dim">Annual tuition</span>
        <span className="font-mono text-sm text-paper">{formatCurrency(tuition)}</span>
      </div>
    </div>
  );
}
