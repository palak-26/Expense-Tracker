import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { PrivateRoute, useAuth } from "./context/AuthContext";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

function AppRoutes() {
  const auth = useAuth();
  const token = auth?.token; // ✅ Safe access

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Dashboard - protected route */}
      <Route
        path="/dashboard"
        element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
        }
      />

      {/* Auth routes */}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path='/about' element={<About/>}/>
        
      <Route path='/contactus' element={<ContactUs/>}/>
      

    </Routes>
  );
}

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AppRoutes />
    </div>
  );
}
