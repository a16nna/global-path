import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is the roadmap actually personalized, or a generic template?",
    a: "It's generated from your own CGPA, branch, budget, scores and target intake — no two roadmaps come out the same.",
  },
  {
    q: "Which countries does Global Path currently cover?",
    a: "Canada, USA, UK, Germany and Australia at launch, with more destinations being added as we validate program data.",
  },
  {
    q: "Do I need IELTS or TOEFL scores to generate a roadmap?",
    a: "No — you can generate a draft roadmap without them and add scores later to refine eligibility and university matches.",
  },
  {
    q: "Is this a replacement for a study-abroad consultant?",
    a: "Think of it as the first, fast pass: a shortlist and plan you can bring to a counsellor, or run with on your own.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="eyebrow text-stamp">Before you board</p>
          <h2
            className="mt-4 text-4xl font-semibold text-paper md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently asked
          </h2>
        </div>

        <div className="mt-14 divide-y divide-line rounded-2xl border border-line bg-night-alt/40 backdrop-blur-xl">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-paper">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="flex-shrink-0 text-amber"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-paper-dim">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
