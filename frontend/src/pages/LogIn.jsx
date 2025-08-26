import { useState } from "react";
import { loginUser, resetPassword } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/expenseLogo.png';

export default function LogIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Forgot password modal states
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // ------------------ LOGIN ------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // ------------------ RESET PASSWORD ------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      
      alert("Passwords do not match!");
      return;
    }
    setResetLoading(true);
    try {
      // Call your reset password API
      await resetPassword({ email, newPassword: newPass });
      alert("Password reset successful. You can now login.");
      setIsForgotPass(false);
      setNewPass("");
      setConfirmPass("");
    } catch (err) {
      alert(err?.response?.data?.message || "Reset failed");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-b from-expense-purpleLight via-purple-200 to-expense-purpleLight">
      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-3 flex flex-col items-center"
      >
        <img src={logo} alt="Logo" className="h-20 w-20" />
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full bg-violet-950 font-semibold flex items-center justify-center text-white rounded py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {loginLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p
          className="text-sm text-center underline text-violet-700 hover:text-violet-900 cursor-pointer"
          onClick={() => setIsForgotPass(true)}
        >
          Forgot Password?
        </p>

        <p className="text-sm text-center">
          No account?{" "}
          <Link
            to="/auth/register"
            className="underline text-violet-700 hover:text-violet-900"
          >
            Register
          </Link>
        </p>
      </form>

      {/* ------------------ Forgot Password Modal ------------------ */}
      {isForgotPass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleResetPassword}
            className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-3 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Reset Password</h1>
              <span
                className="cursor-pointer text-gray-500 hover:text-gray-800 text-xl font-bold"
                onClick={() => setIsForgotPass(false)}
              >
                ×
              </span>
            </div>

            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
            />

            <label className="font-medium">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
            />

            <label className="font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
            />

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-violet-950 font-semibold flex items-center justify-center text-white rounded py-2 hover:opacity-90 disabled:opacity-50 transition"
            >
              {resetLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
