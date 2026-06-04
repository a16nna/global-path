function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🌍 Global Path</h1>

      <div className="card p-4 shadow">
        <h3 className="mb-3">Generate Your Study Abroad Roadmap</h3>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <select className="form-select">
            <option>Canada</option>
            <option>Australia</option>
            <option>UK</option>
            <option>Germany</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <select className="form-select">
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>ECE</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">CGPA</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your CGPA"
          />
        </div>

        <button className="btn btn-primary">
          Generate Roadmap
        </button>
      </div>
    </div>
  );
}

export default App;