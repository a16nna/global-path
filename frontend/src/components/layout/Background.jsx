export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night">
      <div className="animate-drift absolute -left-40 top-[-120px] h-[520px] w-[520px] rounded-full bg-stamp/15 blur-[150px]" />
      <div
        className="animate-drift absolute -right-40 bottom-[-140px] h-[560px] w-[560px] rounded-full bg-amber/10 blur-[160px]"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,241,232,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}
