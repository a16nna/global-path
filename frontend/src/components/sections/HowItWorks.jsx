import { motion } from "framer-motion";

const STAGES = [
  { code: "01", title: "Create profile", desc: "Academic details, scores and budget — five minutes, once." },
  { code: "02", title: "Generate roadmap", desc: "The engine drafts a first itinerary from your profile." },
  { code: "03", title: "AI analysis", desc: "Eligibility, fit and risk are scored against real program data." },
  { code: "04", title: "University matching", desc: "A ranked shortlist, not an alphabetical list of every option." },
  { code: "05", title: "Application timeline", desc: "Deadlines sequenced into a month-by-month plan." },
  { code: "06", title: "Visa guidance", desc: "Document checklist and filing steps for your destination." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-stamp">The itinerary</p>
          <h2
            className="mt-4 text-4xl font-semibold text-paper md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How it works
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[27px] top-2 bottom-2 w-px border-l border-dashed border-line" />

          <div className="space-y-10">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex items-start gap-6"
              >
                <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-line bg-night-alt font-mono text-sm text-amber">
                  {s.code}
                </span>
                <div className="pt-3">
                  <h3 className="text-lg font-semibold text-paper">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-paper-dim">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
