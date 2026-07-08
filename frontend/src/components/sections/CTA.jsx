import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ticket-notch relative overflow-visible rounded-3xl border border-amber/25 bg-gradient-to-br from-stamp/10 via-night-alt to-amber/10 px-8 py-16 text-center backdrop-blur-xl"
        >
          <PlaneTakeoff className="mx-auto text-amber" size={30} />
          <h2
            className="mx-auto mt-6 max-w-xl text-4xl font-semibold text-paper md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Final boarding call for your application season.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper-dim">
            Build your roadmap now — it takes less time than reading one more
            forum thread about IELTS cutoffs.
          </p>
          <div className="mt-9">
            <Button as={Link} to="/roadmap">
              Generate my roadmap
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
