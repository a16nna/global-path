import { useLocation, useNavigate } from "react-router-dom";

function RoadmapResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const roadmap = state?.roadmap;

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No roadmap data found.</p>
          <button onClick={() => navigate("/roadmap")}
            className="rounded-xl bg-white px-6 py-3 text-black font-semibold">
            Generate a Roadmap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">

        <button onClick={() => navigate("/roadmap")}
          className="mb-8 text-cyan-400 hover:text-cyan-300">
          ← Generate Another
        </button>

        <h1 className="text-4xl font-semibold mb-2">
          Your Roadmap — {roadmap.profile?.countryLabel} · {roadmap.profile?.specialisationLabel}
        </h1>
        <p className="text-gray-400 mb-10">{roadmap.summary}</p>

        {/* Universities */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🏫 Recommended Universities</h2>
          <div className="space-y-4">
            {roadmap.universities?.map((uni, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{uni.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    uni.eligibility === "safe" ? "bg-green-500/20 text-green-400" :
                    uni.eligibility === "match" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {uni.eligibility}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{uni.program} · {uni.duration} · {uni.location}</p>
                <p className="text-gray-300 text-sm mt-1">
                  Tuition: ₹{uni.tuition?.annualINR?.toLocaleString("en-IN")}/year
                </p>
                <p className="text-gray-400 text-sm">
                  CGPA cutoff: {uni.requirements?.cgpaCutoff} | IELTS: {uni.requirements?.ieltsMin}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">📅 Timeline</h2>
          <div className="space-y-3">
            {roadmap.timeline?.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="text-cyan-400 font-semibold w-20 shrink-0">
                  {item.monthsFromNow === 0 ? "Now" : `${Math.abs(item.monthsFromNow)}mo before`}
                </span>
                <div>
                  <p className="font-medium">{item.milestone}</p>
                  <p className="text-gray-400 text-sm">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Costs */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">💰 Estimated Costs</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-300 mb-2">
              Tuition: ₹{roadmap.costs?.tuition?.annualMinINR?.toLocaleString("en-IN")} –
              ₹{roadmap.costs?.tuition?.annualMaxINR?.toLocaleString("en-IN")} per year
            </p>
            <p className="text-gray-300 mb-4">
              Total estimate: ₹{roadmap.costs?.totalEstimate?.min?.toLocaleString("en-IN")} –
              ₹{roadmap.costs?.totalEstimate?.max?.toLocaleString("en-IN")}
            </p>
            <p className="text-sm font-semibold mb-2 text-gray-400">Living costs by city:</p>
            <div className="grid grid-cols-2 gap-2">
              {roadmap.costs?.living?.map((city, i) => (
                <div key={i} className="text-sm text-gray-300">
                  {city.city}: ₹{city.monthlyINR?.toLocaleString("en-IN")}/month
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🛂 Visa Process</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-semibold mb-1">{roadmap.visa?.type}</p>
            <p className="text-gray-400 text-sm mb-4">Processing time: {roadmap.visa?.processingTime}</p>
            <ol className="space-y-2">
              {roadmap.visa?.steps?.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-cyan-400 font-semibold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documents */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">📋 Documents Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(roadmap.documents || {}).map(([category, items]) => (
              <div key={category} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold capitalize mb-3 text-cyan-400">{category}</h3>
                <ul className="space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                      <span>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Post Study */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🚀 Post-Study Options</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-semibold">{roadmap.postStudy?.workPermit?.name}</p>
            <p className="text-gray-400 text-sm mb-3">{roadmap.postStudy?.workPermit?.duration}</p>
            <p className="font-semibold">{roadmap.postStudy?.prPathway?.name}</p>
            <p className="text-gray-400 text-sm">{roadmap.postStudy?.prPathway?.description}</p>
          </div>
        </section>

        <p className="text-xs text-gray-500 border-t border-white/10 pt-6">{roadmap.disclaimer}</p>

      </div>
    </div>
  );
}

export default RoadmapResult;