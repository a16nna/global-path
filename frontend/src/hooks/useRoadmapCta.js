import { useAuth } from "./useAuth";

const ROADMAP_PATH = "/roadmap";
const LOGIN_PATH = "/login";

/**
 * Returns the router props (to + state) that every roadmap CTA button should
 * spread onto its Link. Authenticated users go straight to the roadmap
 * wizard; everyone else is sent to /login carrying { from: "/roadmap" } so
 * Login.jsx can bounce them back to the roadmap after signing in.
 */
export function useRoadmapCta() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return { to: ROADMAP_PATH };
  }

  return { to: LOGIN_PATH, state: { from: ROADMAP_PATH } };
}
