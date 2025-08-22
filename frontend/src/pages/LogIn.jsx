import { useState } from "react";
import { loginUser } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Login Page Component
 * --------------------
 * - Handles user login with email/password
 * - Uses AuthContext to store token and user data
 * - Redirects to home page after successful login
 * - Includes responsive, mobile-friendly form design
 */
export default function LogIn() {
  const { login } = useAuth(); // AuthContext method to store login data
  const navigate = useNavigate();

  // Local state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For disabling button during request

  /**
   * Handles login form submission
   */
  const submit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    try {
      const data = await loginUser({ email, password }); // API call
      login(data); // Save user & token to AuthContext/localStorage
      navigate("/"); // Redirect to home
    } catch (e) {
      alert(e?.response?.data?.message || "Login failed"); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center p-4 bg-expense-lightPink">
      {/* Login Form */}
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-3"
      >
        {/* Heading */}
        <h1 className="text-xl font-bold text-center">Login</h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-950 font-semibold text-white rounded py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center">
          No account?{" "}
          <Link to="/auth/register" className="underline text-violet-700 hover:text-violet-900">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
