import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, PlaneTakeoff } from "lucide-react";
import Background from "../components/layout/Background";
import Navbar from "../components/layout/Navbar";
import {
  COUNTRIES,
  DEGREES,
  BRANCHES,
  SPECIALIZATIONS,
  INTAKES,
  RANK_BANDS,
  WORK_EX,
} from "../constants/countries";
import { generateRoadmap } from "../services/roadmap";

const STEPS = ["Traveler", "Academics", "Scores", "Preferences", "Review"];

const INITIAL_FORM = {
  name: "",
  email: "",
  degree: "",
  branch: "",
  cgpa: "",
  testScore: "",
  workExperience: "",
  budget: "",
  preferredCountry: "",
  specialization: "",
  targetIntake: "",
  rankBand: "",
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow text-paper-dim">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-night-alt text-paper px-4 py-3 text-sm outline-none placeholder:text-paper-dim/50 focus:border-amber/60";

export default function RoadmapForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name) e.name = "Required";
      if (!form.email) e.email = "Required";
    }
    if (step === 1) {
      if (!form.degree) e.degree = "Required";
      if (!form.branch) e.branch = "Required";
      if (!form.cgpa) e.cgpa = "Required";
      else if (form.cgpa < 0 || form.cgpa > 10) e.cgpa = "Enter a value out of 10";
    }
    if (step === 3) {
      if (!form.budget) e.budget = "Required";
      if (!form.preferredCountry) e.preferredCountry = "Required";
      if (!form.specialization) e.specialization = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (step === STEPS.length - 1) {
      submit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setSubmitting(true);
    try {
      const roadmap = await generateRoadmap(form);
      navigate("/roadmap/result", { state: { roadmap } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20 pt-32">
      <Background />
      <Navbar />

      <div className="mx-auto max-w-2xl px-6">
        {/* Stepper */}
        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                    i < step
                      ? "border-stamp bg-stamp text-night-deep"
                      : i === step
                      ? "border-amber text-amber"
                      : "border-line text-paper-dim"
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="hidden text-[11px] text-paper-dim sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-px flex-1 ${i < step ? "bg-stamp" : "bg-line"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="ticket-notch relative overflow-visible rounded-3xl border border-line bg-night-alt/60 p-8 backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
                    Who's traveling?
                  </h2>
                  <Field label="Full name">
                    <input className={inputClass} value={form.name} onChange={update("name")} placeholder="Ananya Sharma" />
                    {errors.name && <p className="mt-1 text-xs text-coral">{errors.name}</p>}
                  </Field>
                  <Field label="Email">
                    <input type="email" className={inputClass} value={form.email} onChange={update("email")} placeholder="you@example.com" />
                    {errors.email && <p className="mt-1 text-xs text-coral">{errors.email}</p>}
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
                    Academic record
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Degree">
                      <select className={inputClass} value={form.degree} onChange={update("degree")}>
                        <option value="">Select</option>
                        {DEGREES.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.degree && <p className="mt-1 text-xs text-coral">{errors.degree}</p>}
                    </Field>
                    <Field label="Branch">
                      <select className={inputClass} value={form.branch} onChange={update("branch")}>
                        <option value="">Select</option>
                        {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.branch && <p className="mt-1 text-xs text-coral">{errors.branch}</p>}
                    </Field>
                  </div>
                  <Field label="CGPA (out of 10)">
                    <input type="number" step="0.01" min="0" max="10" className={inputClass} value={form.cgpa} onChange={update("cgpa")} placeholder="8.20" />
                    {errors.cgpa && <p className="mt-1 text-xs text-coral">{errors.cgpa}</p>}
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
                    Scores & experience
                  </h2>
                  <Field label="IELTS / TOEFL score (optional)">
                    <input className={inputClass} value={form.testScore} onChange={update("testScore")} placeholder="e.g. IELTS 7.0" />
                  </Field>
                  <Field label="Work experience">
                    <select className={inputClass} value={form.workExperience} onChange={update("workExperience")}>
                      <option value="">Select</option>
                      {WORK_EX.map((w) => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
                    Where and how
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Budget (USD / year)">
                      <input type="number" className={inputClass} value={form.budget} onChange={update("budget")} placeholder="40000" />
                      {errors.budget && <p className="mt-1 text-xs text-coral">{errors.budget}</p>}
                    </Field>
                    <Field label="Preferred country">
                      <select className={inputClass} value={form.preferredCountry} onChange={update("preferredCountry")}>
                        <option value="">Select</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.preferredCountry && <p className="mt-1 text-xs text-coral">{errors.preferredCountry}</p>}
                    </Field>
                  </div>
                  <Field label="Preferred specialization">
                    <select className={inputClass} value={form.specialization} onChange={update("specialization")}>
                      <option value="">Select</option>
                      {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.specialization && <p className="mt-1 text-xs text-coral">{errors.specialization}</p>}
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Target intake">
                      <select className={inputClass} value={form.targetIntake} onChange={update("targetIntake")}>
                        <option value="">Select</option>
                        {INTAKES.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </Field>
                    <Field label="Preferred university ranking">
                      <select className={inputClass} value={form.rankBand} onChange={update("rankBand")}>
                        <option value="">Select</option>
                        {RANK_BANDS.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold text-paper" style={{ fontFamily: "var(--font-display)" }}>
                    Review before takeoff
                  </h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-dashed border-line p-5 font-mono text-sm">
                    {Object.entries(form).map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[11px] uppercase text-paper-dim">{k}</p>
                        <p className="mt-0.5 text-paper">{v || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex items-center justify-between border-t border-line pt-6">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-paper-dim transition hover:text-paper disabled:opacity-30"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button
              onClick={goNext}
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-night-deep transition hover:bg-paper disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Generating…
                </>
              ) : step === STEPS.length - 1 ? (
                <>
                  <PlaneTakeoff size={16} /> Generate roadmap
                </>
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
