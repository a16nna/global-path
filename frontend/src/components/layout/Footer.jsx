import { Link } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";
import { DESTINATIONS } from "../../constants/destinations";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-night-deep">
                <PlaneTakeoff size={16} strokeWidth={2.5} />
              </span>
              <span
                className="text-lg font-semibold text-paper"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Global Path
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper-dim">
              Every application has a departure gate. We help engineering students
              in India find theirs — with a plan, not just a search bar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-4 text-paper-dim">Product</p>
              <ul className="space-y-2.5 text-sm text-paper-dim">
                <li><a href="#features" className="hover:text-paper">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-paper">How it works</a></li>
                <li><Link to="/roadmap" className="hover:text-paper">Generate roadmap</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-paper-dim">Company</p>
              <ul className="space-y-2.5 text-sm text-paper-dim">
                <li><a href="#faq" className="hover:text-paper">FAQ</a></li>
                <li><Link to="/login" className="hover:text-paper">Log in</Link></li>
                <li><Link to="/register" className="hover:text-paper">Register</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-paper-dim">Routes served</p>
              <ul className="space-y-2.5 font-mono text-sm text-paper-dim">
                {DESTINATIONS.slice(0, 4).map((d) => (
                  <li key={d.code}>BLR → {d.code}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-paper-dim/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Global Path. Boarding passes issued, not guaranteed.</p>
          <p className="font-mono">STATUS: ON TIME</p>
        </div>
      </div>
    </footer>
  );
}
