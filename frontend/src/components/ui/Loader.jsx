import { motion } from "framer-motion";

export default function Loader({ label = "Processing" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-amber"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -6, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <p className="eyebrow text-paper-dim">{label}</p>
    </div>
  );
}
