export default function RoadmapTimeline({ stages }) {
  return (
    <div className="rounded-2xl border border-line bg-night-alt/50 p-6 backdrop-blur-xl">
      <p className="eyebrow text-stamp">Itinerary</p>
      <h3 className="mt-2 text-lg font-semibold text-paper">Application timeline</h3>

      <ol className="mt-6 space-y-5 border-l border-dashed border-line pl-6">
        {stages.map((s) => (
          <li key={s.stage} className="relative">
            <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-night bg-amber" />
            <p className="font-mono text-xs text-paper-dim">{s.month}</p>
            <p className="mt-0.5 font-medium text-paper">{s.stage}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
