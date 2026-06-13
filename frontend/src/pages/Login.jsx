import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/roadmap");
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1
          className="mb-2 text-5xl text-center"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-4 font-semibold text-black"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;