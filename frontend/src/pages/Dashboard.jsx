import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlaneTakeoff, MapPin, FileText, ArrowRight } from "lucide-react";
import Background from "../components/layout/Background";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const QUICK_LINKS = [
  {
    icon: PlaneTakeoff,
    title: "Generate a new roadmap",
    desc: "Run the wizard again with updated scores or a different destination.",
    to: "/roadmap",
    cta: "Start wizard",
  },
  {
    icon: MapPin,
    title: "View saved roadmap",
    desc: "Jump back into your last generated itinerary and checklist.",
    to: "/roadmap/result",
    cta: "Open roadmap",
  },
];

export default function Dashboard() {
  return (
    <div className="relative min-h-screen pb-20 pt-32">
      <Background />
      <Navbar />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow text-amber">Terminal overview</p>
          <h1
            className="mt-2 text-4xl font-semibold text-paper"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back, traveler.
          </h1>
          <p className="mt-3 max-w-xl text-paper-dim">
            Pick up your application journey — generate a fresh roadmap or
            review the one you already have in hand.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {QUICK_LINKS.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-stamp">
                  <q.icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-paper">{q.title}</h3>
                <p className="mt-2 text-sm text-paper-dim">{q.desc}</p>
                <Link
                  to={q.to}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-amber hover:underline"
                >
                  {q.cta} <ArrowRight size={14} />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-6 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-amber">
              <FileText size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-paper">Need a document checklist?</h3>
              <p className="mt-1 text-sm text-paper-dim">
                Every roadmap includes a visa and paperwork checklist tailored to your destination.
              </p>
            </div>
          </div>
          <Button as={Link} to="/roadmap" variant="ghost" className="!px-5 !py-2.5 text-sm">
            Go to roadmap
          </Button>
        </Card>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
