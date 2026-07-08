import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Save, PlaneTakeoff, Stamp } from "lucide-react";
import Background from "../components/layout/Background";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/ui/Loader";
import UniversityCard from "../components/roadmap/UniversityCard";
import CostBreakdown from "../components/roadmap/CostBreakdown";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";
import { ScholarshipCard, DocumentsCard, ChecklistCard } from "../components/roadmap/RoadmapCard";
import { fetchSavedRoadmap, saveRoadmap } from "../services/roadmap";

export default function Roadmap() {
  const location = useLocation();
  const [roadmap, setRoadmap] = useState(location.state?.roadmap ?? null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!roadmap) {
      fetchSavedRoadmap().then(setRoadmap);
    }
  }, [roadmap]);

  if (!roadmap) {
    return (
      <div className="relative min-h-screen">
        <Background />
        <Navbar />
        <div className="pt-40">
          <Loader label="Assembling your itinerary" />
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    await saveRoadmap(roadmap);
    setSaved(true);
  };

  return (
    <div className="relative min-h-screen pb-20 pt-32">
      <Background />
      <Navbar />

      <div className="mx-auto max-w-6xl px-6">
        {/* Hero summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ticket-notch relative overflow-visible rounded-3xl border border-line bg-night-alt/60 p-8 backdrop-blur-2xl"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-amber">Roadmap issued</p>
              <h1
                className="mt-2 text-3xl font-semibold text-paper md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BLR → {roadmap.country}
              </h1>
              <p className="mt-2 text-paper-dim">
                {roadmap.specialization} · {roadmap.monthsToAdmission} months to departure
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col items-center rounded-2xl border border-stamp/30 bg-stamp/10 px-6 py-4 text-center">
              <span className="flex items-center gap-1 text-stamp">
                <Stamp size={14} /> <span className="eyebrow">Eligibility</span>
              </span>
              <p className="mt-1 font-mono text-3xl text-paper">{roadmap.eligibilityScore}%</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-4 border-t border-dashed border-line pt-6 font-mono text-xs">
            <div>
              <p className="text-paper-dim">IELTS required</p>
              <p className="mt-1 text-paper">{roadmap.ielts}</p>
            </div>
            <div>
              <p className="text-paper-dim">GRE</p>
              <p className="mt-1 text-paper">{roadmap.gre}</p>
            </div>
            <div>
              <p className="text-paper-dim">Visa type</p>
              <p className="mt-1 text-paper">{roadmap.visa}</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
            <button className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-night-deep transition hover:bg-paper">
              <Download size={15} /> Download PDF
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-paper transition hover:bg-white/5"
            >
              <Save size={15} /> {saved ? "Saved" : "Save roadmap"}
            </button>
            <Link
              to="/roadmap"
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-paper-dim transition hover:bg-white/5"
            >
              <PlaneTakeoff size={15} /> Regenerate
            </Link>
          </div>
        </motion.div>

        {/* University matches */}
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold text-paper">Recommended universities</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {roadmap.universities.map((u) => (
              <UniversityCard key={u.name} university={u} />
            ))}
          </div>
        </section>

        {/* Dashboard grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <CostBreakdown universities={roadmap.universities} livingExpenses={roadmap.livingExpenses} />
          <RoadmapTimeline stages={roadmap.timeline} />
          <ScholarshipCard scholarships={roadmap.scholarships} />
          <DocumentsCard documents={roadmap.documents} />
          <div className="lg:col-span-2">
            <ChecklistCard items={roadmap.checklist} />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
