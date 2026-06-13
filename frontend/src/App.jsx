import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoadmapForm from "./pages/RoadmapForm";
import RoadmapResult from "./components/RoadmapResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roadmap" element={<RoadmapForm />} />
        <Route path="/result" element={<RoadmapResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;