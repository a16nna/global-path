import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, PlaneTakeoff } from "lucide-react";
import { NAV_LINKS } from "../../constants/nav";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border border-line px-5 py-3 backdrop-blur-xl transition-colors duration-300 ${
          scrolled ? "bg-night/80" : "bg-night/40"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-night-deep">
            <PlaneTakeoff size={16} strokeWidth={2.5} />
          </span>
          <span
            className="text-lg font-semibold tracking-tight text-paper"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Global Path
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="eyebrow text-paper-dim transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/login" className="eyebrow text-paper-dim transition-colors hover:text-paper">
            Log in
          </NavLink>
          <Button as={Link} to="/roadmap" className="!px-5 !py-2.5 text-sm">
            Get started
          </Button>
        </div>

        <button
          className="text-paper md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-[72px] flex flex-col gap-1 rounded-2xl border border-line bg-night/95 p-4 backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-paper-dim hover:bg-white/5 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <div className="my-2 h-px bg-line" />
          <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-paper-dim hover:bg-white/5">
            Log in
          </Link>
          <Link
            to="/roadmap"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-amber px-3 py-2.5 text-center font-semibold text-night-deep"
          >
            Get started
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
