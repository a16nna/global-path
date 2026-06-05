import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">

      {/* Glow 1 */}
      <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Glow 2 */}
      <div className="absolute right-[-200px] bottom-[100px] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[140px]" />

      {/* Glow 3 */}
      <div className="absolute top-[30%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-20 mx-auto max-w-6xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            AI-Powered Study Abroad Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-8 text-6xl leading-[0.95] text-white md:text-8xl"
          style={{
            fontFamily: "Cormorant Garamond",
            fontWeight: 600,
          }}
        >
          <span className="block">
            Your Roadmap To
          </span>

          <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            Studying Abroad
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          Get personalized university recommendations,
          eligibility checks, costs, timelines and visa guidance
          powered by AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row"
        >
          <Link
            to="/roadmap"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Generate Roadmap
          </Link>

          <button className="rounded-xl border border-white/20 px-8 py-4 text-white transition hover:bg-white/10">
            Learn More
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;