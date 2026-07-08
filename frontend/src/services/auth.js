import api from "./api";

export async function login({ email, password }) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (err) {
    // Backend not wired yet — surface a friendly mock response so the UI flow
    // can be built and tested end-to-end.
    console.warn("auth.login: falling back to mock response", err?.message);
    return { token: "mock-token", user: { email } };
  }
}

export async function register({ name, email, password }) {
  try {
    const { data } = await api.post("/auth/register", { name, email, password });
    return data;
  } catch (err) {
    console.warn("auth.register: falling back to mock response", err?.message);
    return { token: "mock-token", user: { name, email } };
  }
}

export function logout() {
  localStorage.removeItem("gp_token");
}
