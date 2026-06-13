import { useState } from "react";
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

  const [loading, setLoading] = useState(false); // ← added here

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
      navigate("/result", { state: { roadmap: response.data } });
    } catch (error) {
      alert(error.response?.data?.error || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-[-200px] bottom-[100px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24">
        <Link to="/" className="mb-8 inline-block text-cyan-400 transition hover:text-cyan-300">
          ← Back Home
        </Link>

        <h1 className="mb-3 text-5xl text-white md:text-6xl" style={{ fontFamily: "Cormorant Garamond", fontWeight: 600 }}>
          Generate Your Roadmap
        </h1>

        <p className="mb-10 text-gray-400">
          Get personalized university recommendations, eligibility checks, costs, timelines and visa guidance.
        </p>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="space-y-5">

            <select name="country" value={formData.country} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white">
              <option value="">Select Country</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="uk">United Kingdom</option>
              <option value="germany">Germany</option>
            </select>

            <select name="specialisation" value={formData.specialisation} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white">
              <option value="">Select Specialisation</option>
              <option value="cs">Computer Science</option>
              <option value="data-science">Data Science</option>
              <option value="ece">Electronics & Communication Engineering</option>
              <option value="mechanical">Mechanical Engineering</option>
              <option value="civil">Civil Engineering</option>
              <option value="biotech">Biotechnology</option>
            </select>

            <input type="number" step="0.01" name="cgpa" placeholder="CGPA"
              value={formData.cgpa} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4" />

            <input type="number" step="0.5" name="ieltsScore" placeholder="IELTS Score"
              value={formData.ieltsScore} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4" />

            <input type="number" name="greScore" placeholder="GRE Score"
              value={formData.greScore} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4" />

            <input type="number" name="budget" placeholder="Budget (INR)"
              value={formData.budget} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4" />

            <select name="targetIntake" value={formData.targetIntake} onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white">
              <option value="">Target Intake</option>
              <option value="Winter 2026">Winter 2026</option>
              <option value="Spring 2027">Spring 2027</option>
              <option value="Fall 2026">Fall 2026</option>
              <option value="Fall 2027">Fall 2027</option>
              <option value="Winter 2027">Winter 2027</option>
            </select>

            <button type="submit" disabled={loading}
              className="mt-4 w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02]">
              {loading ? "Generating..." : "Generate Roadmap"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default RoadmapForm;