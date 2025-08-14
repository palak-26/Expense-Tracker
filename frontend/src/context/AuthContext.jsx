import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create an authentication context
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * 
 * - Wraps the app to provide authentication state & actions.
 * - Manages `user` and `token` using localStorage for persistence.
 * - Provides `login` and `logout` methods to child components.
 */
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Initialize user from localStorage (so page refresh keeps login)
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // Initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  /**
   * Login method
   * - Stores user and token in state and localStorage
   */
  const login = ({ token, user }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  /**
   * Logout method
   * - Clears user and token from state and localStorage
   * - Redirects to login page
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  /**
   * Effect to rehydrate user/token state
   * - Runs when the app mounts
   * - Useful for restoring session after refresh
   */
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const rawToken = localStorage.getItem("token");
    if (rawUser && rawToken) {
      setUser(JSON.parse(rawUser));
      setToken(rawToken);
    }
  }, []);

  /**
   * Memoized context value
   * - Avoids unnecessary re-renders when user/token do not change
   */
  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  // Provide authentication state and actions to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * - Example: const { user, login, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

/**
 * PrivateRoute Component
 * - Simple guard that prevents rendering children if not authenticated
 * - Works with route protection in App.jsx
 */
export function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return null; // Could also navigate to login automatically
  }
  return children;
}
