import { motion } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  ClipboardCheck,
  Landmark,
  Stamp,
  Award,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI roadmap generation",
    desc: "One profile in, one full itinerary out — universities, costs and timelines, generated in seconds.",
  },
  {
    icon: GraduationCap,
    title: "University recommendations",
    desc: "Matches ranked by fit against your CGPA, branch and budget, not just brand-name rankings.",
  },
  {
    icon: ClipboardCheck,
    title: "Eligibility analysis",
    desc: "A plain-language score on where you stand for each program, before you spend a single application fee.",
  },
  {
    icon: Landmark,
    title: "Tuition estimation",
    desc: "Real tuition and cost-of-living figures per destination, so budget shock happens now, not after you land.",
  },
  {
    icon: Stamp,
    title: "Visa guidance",
    desc: "Country-specific visa steps and document checklists, laid out as an actual timeline to departure.",
  },
  {
    icon: Award,
    title: "Scholarship suggestions",
    desc: "Funding options matched to your profile, surfaced alongside the universities that offer them.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-amber">What's included</p>
          <h2
            className="mt-4 text-4xl font-semibold text-paper md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything on the itinerary
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-line bg-night-alt/50 p-7 backdrop-blur-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-stamp">
                <f.icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-paper">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
