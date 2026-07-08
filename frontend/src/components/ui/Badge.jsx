import { classNames } from "../../utils/format";

const TONES = {
  amber: "border-amber/40 text-amber bg-amber/10",
  stamp: "border-stamp/40 text-stamp bg-stamp/10",
  coral: "border-coral/40 text-coral bg-coral/10",
  neutral: "border-line text-paper-dim bg-white/5",
};

export default function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={classNames(
        "eyebrow inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
