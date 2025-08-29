import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Responsive Navigation Bar
 *
 * Features:
 * - Navigation links: Home, About, Contact Us
 * - Scroll-based background change
 * - Mobile hamburger menu toggle
 * - Login/Register button
 * - Fully responsive using Tailwind
 */
const NavBar = () => {
  const list = ["Home", "About", "ContactUs"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();

  // Handle scroll background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigate to page and close mobile menu
  const path = (item) => {
    navigate(`/${item.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Navbar container */}
      <div
        className={`fixed z-50 top-0  w-full h-20 px-4 sm:px-8 flex items-center justify-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-violet-950/50 shadow-md "
            : "bg-violet-950"
        }`}
      >
        {/* Desktop Navigation */}
        <ul className="hidden sm:flex text-center  gap-6 flex items-center justify-center">
          {list.map((item) => (
            <li
              key={item}
              className="cursor-pointer text-base font-semibold text-white "
              onClick={() => path(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Login/Register button */}
        <div className="flex gap-x-4">
          <button
          className="hidden sm:block font-semibold text-violet-950 bg-white border border-[#6744ce]  px-4 py-2 rounded-md "
          onClick={() => navigate("/auth/login")}
        >
          Login
        </button>
        <button
          className="hidden sm:block font-semibold text-violet-950 bg-white border border-[#6744ce]  px-4 py-2 rounded-md"
          onClick={() => navigate("/auth/register")}
        >
          Register
        </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="sm:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white "></span>
          <span className="block w-6 h-0.5 bg-white "></span>
          <span className="block w-6 h-0.5 bg-white "></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden fixed top-20 left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col items-center gap-4 py-4">
            {list.map((item) => (
              <li
                key={item}
                className="cursor-pointer text-base font-bold text-violet-950 hover:text-[#4d31a3]"
                onClick={() => path(item)}
              >
                {item}
              </li>
            ))}
            <li>
              <button
                className="font-semibold text-base text-violet-950 bg-white border border-[#6744ce]  px-4 py-2 rounded-md "
                onClick={() => {
                  navigate("/auth/login");
                  setIsMenuOpen(false);
                }}
              >
                Login 
              </button>
              <button
                className="font-semibold text-white  bg-[#6744ce]   px-4 py-2 rounded-md hover:bg-[#5533b0] transition"
                onClick={() => {
                  navigate("/auth/register");
                  setIsMenuOpen(false);
                }}
              >
                Register 
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
