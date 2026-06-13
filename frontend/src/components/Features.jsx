import { motion } from "framer-motion";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Roadmaps",
    desc: "Generate personalized study abroad plans in seconds.",
  },
  {
    icon: "🎓",
    title: "Smart University Matching",
    desc: "Discover universities based on your profile and goals.",
  },
  {
    icon: "📄",
    title: "Visa & Document Guidance",
    desc: "Get document checklists and visa information instantly.",
  },
];

function Features() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-16 text-center text-5xl font-bold text-white">
          Why Global Path?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="mb-4 text-5xl">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;