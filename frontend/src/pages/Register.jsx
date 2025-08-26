import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/expenseLogo.png';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      // Auto-login after register
      const data = await loginUser({ email, password });
      login(data);
      navigate("/");
    } catch (e) {
      alert(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-b from-expense-purpleLight via-purple-200 to-expense-purpleLight">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-3 flex flex-col items-center">
         {/* Logo */}
        <img src={logo} alt="" className="h-20 w-20 " />
        <h1 className="text-xl font-bold text-center">Create account</h1>
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-950 font-semibold flex justify-center items-center text-white rounded py-2 hover:opacity-90 disabled:opacity-50"
        >
          {loading ?(
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
            </>
          )  : "Register"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline  text-violet-700 hover:text-violet-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
