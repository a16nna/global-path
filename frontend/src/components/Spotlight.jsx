import { useEffect, useState } from "react";

function Spotlight() {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Main Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(
            350px circle at ${mouse.x}px ${mouse.y}px,
            rgba(56,189,248,0.12),
            transparent 70%
          )`,
        }}
      />

      {/* Sparkle */}
      <div
        className="pointer-events-none fixed z-20 h-4 w-4 rounded-full bg-cyan-300 blur-sm"
        style={{
          left: mouse.x - 8,
          top: mouse.y - 8,
          boxShadow:
            "0 0 30px rgba(34,211,238,0.9), 0 0 60px rgba(34,211,238,0.6)",
        }}
      />
    </>
  );
}

export default Spotlight;