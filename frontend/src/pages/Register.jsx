import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlaneTakeoff, User, Mail, Lock, Loader2 } from "lucide-react";
import Background from "../components/layout/Background";
import { register } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Fill in every field to issue your account.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const data = await register(form);
      if (data?.token) localStorage.setItem("gp_token", data.token);
      navigate("/roadmap");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ticket-notch relative w-full max-w-md overflow-visible rounded-3xl border border-line bg-night-alt/70 p-8 backdrop-blur-2xl"
      >
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stamp text-night-deep">
            <PlaneTakeoff size={20} strokeWidth={2.5} />
          </span>
        </div>

        <h1
          className="mt-6 text-center text-3xl font-semibold text-paper"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Issue your account
        </h1>
        <p className="mt-2 text-center text-sm text-paper-dim">
          A few details, and your roadmap is next.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="eyebrow text-paper-dim">Full name</span>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 focus-within:border-stamp/60">
              <User size={16} className="text-paper-dim" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Ananya Sharma"
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper-dim/50"
                autoComplete="name"
              />
            </div>
          </label>

          <label className="block">
            <span className="eyebrow text-paper-dim">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 focus-within:border-stamp/60">
              <Mail size={16} className="text-paper-dim" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper-dim/50"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="eyebrow text-paper-dim">Password</span>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 focus-within:border-stamp/60">
              <Lock size={16} className="text-paper-dim" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper-dim/50"
                autoComplete="new-password"
              />
            </div>
          </label>

          {error && <p className="text-sm text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-stamp py-3.5 font-semibold text-night-deep transition hover:bg-stamp-dim disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-dim">
          Already registered?{" "}
          <Link to="/login" className="text-amber hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
