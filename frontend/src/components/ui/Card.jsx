import { classNames } from "../../utils/format";

export default function Card({ className, children, notch = false, ...props }) {
  return (
    <div
      className={classNames(
        "relative rounded-2xl border border-line bg-night-alt/60 backdrop-blur-xl",
        notch && "ticket-notch overflow-visible",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
