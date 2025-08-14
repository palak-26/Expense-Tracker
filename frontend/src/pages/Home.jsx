import React from 'react';
import girl from '../assets/girl.png';
import expenseLogo from '../assets/expenseLogo.png';
import spending from '../assets/spending.png';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen space-y-6 bg-expense-lightPink overflow-hidden">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className="relative flex flex-col mt-20 lg:flex-row items-center justify-evenly p-8 lg:p-10 mt-10 lg:mt-20 z-20">
        
        {/* Left text content */}
        <div className="flex flex-col justify-center items-center lg:items-start  lg:text-left gap-4 max-w-lg">
          <img src={expenseLogo} alt="Expense Logo" className="h-16 w-16 md:h-20 md:w-20" />
          <h1 className="text-4xl lg:text-7xl font-bold text-center md:text-start leading-tight">Expense Tracker</h1>
          <p className="text-lg md:text-3xl font-semibold text-center md:text-start text-violet-950">
            Easily monitor your spending and manage your finances
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-violet-950 text-white font-semibold py-3 px-8 rounded-md text-lg md:text-xl shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>

        {/* floating card */}
        <div className="relative flex items-center justify-center mt-10 lg:mt-0 lg:-ml-20 md:w-1/3">
          <div className="bg-white lg:right-10 relative rounded-2xl shadow-lg p-6 z-20 lg:w-2/3 lg:mt-20 w-full max-w-sm scale-100 hover:scale-105 transition-transform">
            {/* Balance section */}
            <div className="flex gap-6 items-center">
              <div className="h-20 w-20 rounded-full bg-expense-greenAlt flex items-center justify-center">
                <img src={spending} alt="" className="h-12 w-12" />
              </div>
              <div>
                <span className="text-3xl text-end font-bold">...</span>
                <h1 className="text-3xl font-bold">$2,300</h1>
                <h2 className="text-lg font-semibold">Balance</h2>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 space-y-4">
              <div className="w-full bg-slate-300 rounded-full h-4 flex overflow-hidden">
                <div className="w-[30%] bg-expense-purpleLight"></div>
                <div className="w-[25%] bg-green-700/80"></div>
                <div className="w-[15%] bg-purple-800/80"></div>
              </div>

              {/* Expenses */}
              <h2 className="text-lg font-semibold">This Month</h2>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-700/80"></div>
                <span className="text-lg">Groceries</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-800/80"></div>
                  <span className="text-lg">Transport</span>
                </div>
                <p className="text-lg font-semibold">$75</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-violet-950"></div>
                  <span className="text-lg">Housing</span>
                </div>
                <p className="text-lg font-semibold">$100</p>
              </div>
              <div className="w-full bg-slate-300 h-2 rounded-full"></div>
              <div className="w-[80%] bg-slate-300 h-2 rounded-full"></div>
            </div>
            
          </div>
          <img src={girl} alt="" className='hidden md:block h-[120%] z-30  md:-right-36 md:top-16 absolute lg:-right-28 lg:top-24' />
        </div>

        
      </div>

      {/* Background Waves */}
      <svg
        className=" hidden md:block absolute bottom-0 left-0 w-full h-[40%] z-10"
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

      
      
      <svg className=" hidden md:block absolute bottom-0 right-0 w-full h-[35%] z-30 scale-x-[1]" viewBox="0 0 600 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" > <defs> <linearGradient id="darkWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%"> <stop offset="0%" stopColor="#8B5CF6" /> <stop offset="100%" stopColor="#8B5CF6" /> </linearGradient> </defs> <path d="M600 200V120C550 100 500 80 440 100C390 120 350 150 300 150C250 150 200 120 150 120C100 120 50 140 0 160V200Z" fill="url(#darkWaveGradient)" /> </svg>
      
    </div>
  );
};

export default Home;
