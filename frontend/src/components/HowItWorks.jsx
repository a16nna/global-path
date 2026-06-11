import { motion } from "framer-motion";

const steps = [
  {
    title: "Choose Destination",
    desc: "Select the country and specialization you're interested in.",
  },
  {
    title: "Enter Your Profile",
    desc: "Provide CGPA, IELTS, GRE and budget details.",
  },
  {
    title: "AI Generates Roadmap",
    desc: "Global Path analyzes your profile and builds a personalized plan.",
  },
  {
    title: "Start Applying",
    desc: "Follow recommendations, timelines and document requirements.",
  },
];

function HowItWorks() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-6">

        <h2 className="mb-20 text-center text-5xl font-bold text-white">
          How It Works
        </h2>

        <div className="relative">

          <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-purple-500" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="relative mb-16 pl-16"
            >
              <div className="absolute left-0 top-2 h-10 w-10 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)]" />

              <h3 className="mb-3 text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;