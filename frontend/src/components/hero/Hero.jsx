import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, PlaneTakeoff } from "lucide-react";
import Stars from "./Stars";
import FlightPaths from "./FlightPaths";
import Globe from "./Globe";
import Button from "../ui/Button";
import { useRoadmapCta } from "../../hooks/useRoadmapCta";

export default function Hero() {
  const roadmapCta = useRoadmapCta();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night pt-28 pb-16">
      <Stars />
      <div className="absolute inset-x-0 top-24 bottom-10 opacity-70">
        <FlightPaths />
      </div>

      <div className="animate-drift absolute left-[-160px] top-[80px] h-[420px] w-[420px] rounded-full bg-stamp/15 blur-[140px]" />
      <div className="animate-drift absolute right-[-160px] bottom-[40px] h-[420px] w-[420px] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative z-20 mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left: thesis copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-paper-dim backdrop-blur-xl">
              <PlaneTakeoff size={13} /> Boarding pass to your master's degree
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="mt-7 text-5xl leading-[1.02] text-paper sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Your gate to
            <span className="block text-stamp">studying abroad,</span>
            <span className="block">already assigned.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-7 max-w-lg text-lg text-paper-dim lg:mx-0"
          >
            Global Path turns your CGPA, budget and IELTS score into a real
            itinerary — universities, costs, scholarships and visa steps —
            instead of forty open browser tabs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button as={Link} {...roadmapCta}>
              Generate my roadmap
            </Button>
            <Button as="a" href="#how-it-works" variant="ghost">
              See how it works
            </Button>
          </motion.div>
        </div>

        {/* Right: globe + boarding pass ticket, the signature element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="relative"
        >
          <Globe />

          <div className="ticket-notch relative -mt-10 overflow-visible rounded-2xl border border-line bg-night-alt/80 p-6 backdrop-blur-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-paper-dim">Boarding pass</p>
                <p className="mt-1 font-mono text-2xl text-paper">BLR → TOR</p>
              </div>
              <PlaneTakeoff className="mt-1 text-amber" size={22} />
            </div>

            <div className="my-5 border-t border-dashed border-line" />

            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <p className="text-paper-dim">Passenger</p>
                <p className="mt-1 text-paper">B.TECH STUDENT</p>
              </div>
              <div>
                <p className="text-paper-dim">Gate</p>
                <p className="mt-1 text-stamp">VISA-CLEARED</p>
              </div>
              <div>
                <p className="text-paper-dim">Seat</p>
                <p className="mt-1 text-amber">FULL SCHOLARSHIP</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#problem"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-6 z-20 text-paper-dim"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
