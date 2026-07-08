import { motion } from "framer-motion";
import { AlertTriangle, Compass } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section id="problem" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-line bg-night-alt/50 p-9 backdrop-blur-xl"
          >
            <AlertTriangle className="text-coral" size={26} />
            <p className="eyebrow mt-5 text-coral">Delayed departure</p>
            <h2 className="mt-3 text-3xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
              Forty tabs, zero itinerary.
            </h2>
            <p className="mt-4 text-paper-dim leading-relaxed">
              Students burn weeks hopping between university sites, consultants,
              YouTube explainers and Reddit threads — piecing together
              eligibility, costs, visa rules and deadlines by hand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-stamp/25 bg-stamp/5 p-9 backdrop-blur-xl"
          >
            <Compass className="text-stamp" size={26} />
            <p className="eyebrow mt-5 text-stamp">Cleared for takeoff</p>
            <h2 className="mt-3 text-3xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
              One roadmap, every leg mapped.
            </h2>
            <p className="mt-4 text-paper-dim leading-relaxed">
              Global Path reads your profile once and issues a single itinerary:
              matched universities, real costs, scholarships, a document
              checklist and a visa timeline — ready before your next class ends.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
