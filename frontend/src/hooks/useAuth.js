import { useEffect, useState } from "react";

const TOKEN_KEY = "gp_token";

function hasToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

/**
 * Reads authentication status from the same localStorage token that
 * services/auth.js already writes on login/register and clears on logout.
 * Stays in sync across tabs via the "storage" event.
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasToken);

  useEffect(() => {
    const sync = () => setIsAuthenticated(hasToken());
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return { isAuthenticated };
}
