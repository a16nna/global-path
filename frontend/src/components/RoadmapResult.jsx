function RoadmapResult() {
  const roadmap = {
    country: "Canada",
    specialization: "Computer Science",
    universities: [
      {
        name: "University of Toronto",
        tuition: "$45,000/year"
      },
      {
        name: "University of British Columbia",
        tuition: "$40,000/year"
      }
    ],
    ielts: "7.0",
    gre: "Optional",
    visa: "Study Permit"
  };

  return (
    <div className="card mt-4 p-4">
      <h2>Generated Roadmap</h2>

      <p><strong>Country:</strong> {roadmap.country}</p>
      <p><strong>Specialization:</strong> {roadmap.specialization}</p>
      <p><strong>IELTS:</strong> {roadmap.ielts}</p>
      <p><strong>GRE:</strong> {roadmap.gre}</p>
      <p><strong>Visa:</strong> {roadmap.visa}</p>

      <h4 className="mt-3">Recommended Universities</h4>

      {roadmap.universities.map((uni, index) => (
        <div key={index} className="border rounded p-3 mb-2">
          <h5>{uni.name}</h5>
          <p>{uni.tuition}</p>
        </div>
      ))}
    </div>
  );
}

export default RoadmapResult;