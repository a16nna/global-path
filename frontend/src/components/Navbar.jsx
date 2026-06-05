import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">

          <h1 className="text-xl font-semibold text-white">
            Global Path
          </h1>

          <div className="hidden gap-8 text-sm text-gray-300 md:flex">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Countries</a>
            <a href="#">About</a>
          </div>

          <button className="rounded-xl bg-white px-5 py-2 font-semibold text-black transition hover:scale-105">
            Get Started
          </button>

        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;