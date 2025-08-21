import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>

        {/* Right Section */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
          <a href="/contactus" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
