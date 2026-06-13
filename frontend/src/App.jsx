import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoadmapForm from "./pages/RoadmapForm";
import RoadmapResult from "./components/RoadmapResult";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roadmap" element={<ProtectedRoute><RoadmapForm /></ProtectedRoute>} />
        <Route path="/result"  element={<ProtectedRoute><RoadmapResult /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;