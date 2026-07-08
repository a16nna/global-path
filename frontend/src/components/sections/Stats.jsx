import { useCountUp } from "../../hooks/useCountUp";

const STATS = [
  { value: 5, suffix: "", label: "Destination countries" },
  { value: 120, suffix: "+", label: "Partner universities mapped" },
  { value: 9, suffix: " mo", label: "Average time to departure" },
  { value: 82, suffix: "%", label: "Average eligibility match" },
];

function Counter({ value, suffix, label }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p
        className="font-mono text-4xl text-amber md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {current}
        {suffix}
      </p>
      <p className="eyebrow mt-3 text-paper-dim">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-line bg-night-alt/50 px-8 py-12 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {STATS.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
