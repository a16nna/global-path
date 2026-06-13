import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function RoadmapForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    specialisation: "",
    cgpa: "",
    greScore: "",
    ieltsScore: "",
    budget: "",
    targetIntake: "",
  });

  const [options, setOptions] = useState({
    countries: [],
    specialisations: [],
    intakes: [],
  });

  const [loading, setLoading] = useState(false);
  const [optionsError, setOptionsError] = useState(false);

  // Fetch dropdown options from the backend on mount
  useEffect(() => {
    api
      .get("/meta/options")
      .then((res) => setOptions(res.data))
      .catch(() => setOptionsError(true));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/roadmap/generate", {
        ...formData,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
        greScore: formData.greScore ? parseInt(formData.greScore) : null,
        ieltsScore: formData.ieltsScore ? parseFloat(formData.ieltsScore) : null,
        budget: formData.budget ? parseInt(formData.budget) : null,
      });
      navigate("/result", {
        state: {
          roadmap: response.data,
          roadmapId: response.data.roadmapId,
        },
      });
    } catch (error) {
      alert(error.response?.data?.error || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition";

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glows */}
      <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-[-200px] bottom-[100px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24">
        <Link
          to="/"
          className="mb-8 inline-block text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back Home
        </Link>

        <h1
          className="mb-3 text-5xl text-white md:text-6xl"
          style={{ fontFamily: "Cormorant Garamond", fontWeight: 600 }}
        >
          Generate Your Roadmap
        </h1>

        <p className="mb-10 text-gray-400">
          Get personalized university recommendations, eligibility checks,
          costs, timelines and visa guidance.
        </p>

        {optionsError && (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            Could not load options from the server. Please refresh and try
            again.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="space-y-5">

            {/* Country */}
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Country</option>
              {options.countries.length > 0
                ? options.countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))
                : // Fallback if fetch failed or is still loading
                  [
                    { value: "canada", label: "Canada" },
                    { value: "australia", label: "Australia" },
                    { value: "uk", label: "United Kingdom" },
                    { value: "germany", label: "Germany" },
                  ].map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
            </select>

            {/* Specialisation */}
            <select
              name="specialisation"
              value={formData.specialisation}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Specialisation</option>
              {options.specialisations.length > 0
                ? options.specialisations.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))
                : [
                    { value: "cs", label: "Computer Science" },
                    { value: "data-science", label: "Data Science" },
                    {
                      value: "ece",
                      label: "Electronics & Communication Engineering",
                    },
                    { value: "mechanical", label: "Mechanical Engineering" },
                    { value: "civil", label: "Civil Engineering" },
                    { value: "biotech", label: "Biotechnology" },
                  ].map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
            </select>

            {/* CGPA */}
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              placeholder="CGPA (e.g. 7.8)"
              value={formData.cgpa}
              onChange={handleChange}
              className={inputClass}
            />

            {/* IELTS */}
            <input
              type="number"
              step="0.5"
              min="0"
              max="9"
              name="ieltsScore"
              placeholder="IELTS Score (e.g. 7.0)"
              value={formData.ieltsScore}
              onChange={handleChange}
              className={inputClass}
            />

            {/* GRE */}
            <input
              type="number"
              min="260"
              max="340"
              name="greScore"
              placeholder="GRE Score (e.g. 315)"
              value={formData.greScore}
              onChange={handleChange}
              className={inputClass}
            />

            {/* Budget */}
            <input
              type="number"
              min="0"
              name="budget"
              placeholder="Budget in INR (e.g. 5000000)"
              value={formData.budget}
              onChange={handleChange}
              className={inputClass}
            />

            {/* Target Intake */}
            <select
              name="targetIntake"
              value={formData.targetIntake}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Target Intake</option>
              {options.intakes.length > 0
                ? options.intakes.map((intake) => (
                    <option key={intake} value={intake}>
                      {intake}
                    </option>
                  ))
                : [
                    "Winter 2026",
                    "Fall 2026",
                    "Spring 2027",
                    "Summer 2027",
                    "Fall 2027",
                    "Winter 2027",
                  ].map((intake) => (
                    <option key={intake} value={intake}>
                      {intake}
                    </option>
                  ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating… this may take 10–20s
                </span>
              ) : (
                "Generate Roadmap"
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default RoadmapForm;