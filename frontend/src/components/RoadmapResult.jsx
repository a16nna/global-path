function RoadmapResult() {
  const roadmap = {
    country: "Canada",
    specialization: "Computer Science",
    universities: [
      {
        name: "University of Toronto",
        tuition: "$45,000/year",
      },
      {
        name: "University of British Columbia",
        tuition: "$40,000/year",
      },
    ],
    ielts: "7.0",
    gre: "Optional",
    visa: "Study Permit",
  };

  return (
    <div className="card shadow-lg border-0 mt-4 p-4">
      <h2 className="mb-4 text-primary">
        🎓 Generated Roadmap
      </h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <strong>Country</strong>
          <p>{roadmap.country}</p>
        </div>

        <div className="col-md-4">
          <strong>IELTS</strong>
          <p>{roadmap.ielts}</p>
        </div>

        <div className="col-md-4">
          <strong>GRE</strong>
          <p>{roadmap.gre}</p>
        </div>
      </div>

      <div className="mb-4">
        <strong>Specialization</strong>
        <p>{roadmap.specialization}</p>
      </div>

      <div className="mb-5">
        <strong>Visa Type</strong>
        <p>{roadmap.visa}</p>
      </div>

      <h3 className="mb-3">
        🏫 Recommended Universities
      </h3>

      {roadmap.universities.map((uni, index) => (
        <div
          key={index}
          className="card border-0 shadow-sm mb-3"
        >
          <div className="card-body">
            <h5 className="card-title">
              {uni.name}
            </h5>

            <p className="text-muted mb-0">
              Tuition: {uni.tuition}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoadmapResult;