import { motion } from "framer-motion";
import { classNames } from "../../utils/format";

const VARIANTS = {
  primary:
    "bg-amber text-night-deep hover:bg-paper shadow-[0_0_0_1px_rgba(232,163,61,0.4)]",
  ghost:
    "border border-line text-paper hover:bg-white/5",
  stamp:
    "bg-stamp text-night-deep hover:bg-stamp-dim",
};

const MotionComponents = {
  button: motion.button,
  a: motion.a,
  div: motion.div,
  span: motion.span,
};

export default function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Comp = MotionComponents[as] || motion.button;

  return (
    <Comp
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold tracking-tight transition-colors duration-200",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}