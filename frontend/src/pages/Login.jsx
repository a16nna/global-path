import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlaneTakeoff, Mail, Lock, Loader2 } from "lucide-react";
import Background from "../components/layout/Background";
import { login } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Enter both email and password to check in.");
      return;
    }

    setLoading(true);
    try {
      const data = await login(form);
      if (data?.token) localStorage.setItem("gp_token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Check-in failed. Check your details and try again.");
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
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-night-deep">
            <PlaneTakeoff size={20} strokeWidth={2.5} />
          </span>
        </div>

        <h1
          className="mt-6 text-center text-3xl font-semibold text-paper"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-paper-dim">
          Log in to pick up where your roadmap left off.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="eyebrow text-paper-dim">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 focus-within:border-amber/60">
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
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 focus-within:border-amber/60">
              <Lock size={16} className="text-paper-dim" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper-dim/50"
                autoComplete="current-password"
              />
            </div>
          </label>

          {error && <p className="text-sm text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-amber py-3.5 font-semibold text-night-deep transition hover:bg-paper disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-dim">
          New here?{" "}
          <Link to="/register" className="text-stamp hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
