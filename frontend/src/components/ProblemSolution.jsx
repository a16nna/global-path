import { motion } from "framer-motion";

function ProblemSolution() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-10 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-red-400">
              The Problem
            </h2>

            <p className="text-lg leading-relaxed text-gray-300">
              Students spend weeks jumping between university websites,
              consultants, YouTube videos and Reddit threads trying to
              understand eligibility, costs, visas and application timelines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-cyan-400">
              The Solution
            </h2>

            <p className="text-lg leading-relaxed text-gray-300">
              Global Path generates a personalized study-abroad roadmap
              containing university recommendations, requirements,
              costs, timelines, documents and visa guidance in minutes.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ProblemSolution;