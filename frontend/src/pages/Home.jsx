import React from 'react';
import girl from '../assets/girl.png';
import expenseLogo from '../assets/expenseLogo.png';
import spending from '../assets/spending.png';
import NavBar from '../components/NavBar';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import About from './About';
import ContactUs from './ContactUs';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen relative max-h-screen bg-expense-lightPink">
      <NavBar />
      <div className="w-screen relative min-h-screen flex items-center justify-evenly p-5">
        {/* Left part */}
        <div className="w-1/3 flex flex-col flex-wrap gap-6">
          <img src={expenseLogo} alt="Expense Logo" className="h-20 w-20" />
          <h1 className="text-5xl font-bold">Expense Tracker</h1>
          <p className="text-3xl font-semibold text-violet-950">
            Easily monitor your spending and manage your finances
          </p>
          <button 
          onClick={()=> navigate("/login")}
          className="bg-violet-950 text-white font-semibold p-4 rounded-md w-1/3 text-2xl text-center z-50">
              Get Started
          </button>
        </div>

        {/* Middle card */}
        <div className="w-1/3">
          <div className="absolute rounded-2xl h-[60%] bg-white shadow-sm p-5 w-[20%] top-[22%] z-20 space-y-4">
            <div className="flex gap-x-4 items-center">
              <div className="h-24 w-24 rounded-full bg-expense-greenAlt flex items-center justify-center">
                <img src={spending} alt="" className="h-14 w-14" />
              </div>
              <div className="flex flex-col">
                <span className="text-6xl font-bold text-end">...</span>
                <h1 className="text-4xl font-bold">$2,300</h1>
                <h2 className="text-xl font-semibold">Balance</h2>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-4">
              <div className="w-full bg-slate-300 rounded-full h-4 flex">
                <div className="w-[30%] bg-expense-purpleLight rounded-s-full h-4"></div>
                <div className="w-[25%] bg-green-700/80 h-4"></div>
                <div className="w-[15%] bg-purple-800/80 rounded-e-full h-4"></div>
              </div>

              {/* Expenses */}
              <div className="flex flex-col gap-y-2">
                <h2 className="text-lg font-semibold">This Month</h2>
                <h2 className="flex text-lg font-semibold items-center gap-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-700/80"></div>
                  Groceries
                </h2>
                <h2 className="flex text-lg font-semibold items-center gap-x-2">
                  <div className="h-3 w-3 rounded-full bg-purple-800/80"></div>
                  Transport
                  <p className="relative left-28 text-lg font-semibold">$75</p>
                </h2>
                <h2 className="flex text-lg font-semibold items-center gap-x-2">
                  <div className="h-3 w-3 rounded-full bg-violet-950"></div>
                  Housing
                  <p className="relative left-28 text-lg font-semibold">$100</p>
                </h2>
              </div>
            </div>

            <div className="w-full bg-slate-300 h-2 rounded-full"></div>
            <div className="w-[80%] bg-slate-300 h-2 rounded-full"></div>
          </div>
        </div>

        {/* Right side image */}
        <img src={girl} alt="" className="absolute h-[70%] right-48 bottom-0 z-40" />
      </div>

      {/* Background Waves */}
      <svg
        className="absolute bottom-0 right-0 w-full h-[40%] z-10"
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lightWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <path
          d="M600 200L600 80C550 60 500 40 440 60C390 80 350 110 300 110C250 110 200 80 150 80C100 80 50 100 0 120L0 200Z"
          fill="url(#lightWaveGradient)"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-full h-[35%] z-30 scale-x-[1]"
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="darkWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M600 200V120C550 100 500 80 440 100C390 120 350 150 300 150C250 150 200 120 150 120C100 120 50 140 0 160V200Z"
          fill="url(#darkWaveGradient)"
        />
      </svg>

      
    </div>

    
  );
};

export default Home;
