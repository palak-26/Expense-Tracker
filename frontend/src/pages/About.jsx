import React from 'react';
import Card from '../components/Card';
import mission from '../assets/target.png';
import welcome from '../assets/onboarding.png';
import vision from '../assets/vision.png';
import why from '../assets/problem.png';
import features from '../assets/key-features.png';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const About = () => {
  const cardsData = [
    {
      icon: <img src={welcome} alt="" className="h-10 w-10 relative bottom-1" />,
      title: 'Welcome',
      content:
        'Welcome to Expense Tracker, your personal finance companion designed to help you take control of your spending, manage your budget, and achieve your financial goals effortlessly.',
    },
    {
      icon: <img src={mission} alt="" className="h-10 w-10 relative bottom-1" />,
      title: 'Our Mission',
      content:
        'Our mission is simple: empower individuals to make smarter financial decisions. Whether you’re a student, professional, or small business owner, Expense Tracker provides an intuitive platform to track your income and expenses in real-time.',
      
    },
    {
      icon: <img src={features} alt="" className="h-10 w-10 relative bottom-1" />,
      title: 'Key Features',
      content: (
        <ul className="list-disc pl-5 text-left">
          <li><b>Dashboard Overview:</b> Get a clear snapshot of your financial health with charts and summaries.</li>
          <li><b>Expense Categorization:</b> Organize your spending into categories like food, transport, entertainment, and more.</li>
          <li><b>Secure and Private:</b> Your financial data is safe with us, with secure authentication and privacy-first design.</li>
          <li><b>Easy Add & Edit:</b> Quickly add, edit, or delete transactions without hassle.</li>
          <li><b>Responsive Design:</b> Use Expense Tracker on any device — mobile, tablet, or desktop.</li>
        </ul>
      ),
      
    },
    {
      icon: <img src={why} alt="" className="h-10 w-10 relative bottom-1" />,
      title: 'Why Choose Expense Tracker?',
      content:
        'Managing money can be stressful, but Expense Tracker makes it simple, fast, and enjoyable. With insightful reports and intuitive tools, you can identify spending patterns, cut unnecessary expenses, and save more for the future.',
     
    },
    {
      icon: <img src={vision} alt="" className="h-10 w-10 relative bottom-1" />,
      title: 'Our Vision',
      content:
        'We envision a world where everyone has financial clarity and confidence. Expense Tracker is built to guide you every step of the way toward smarter money management.',
      
    }
  ];

  return (
    <div>
      <div>
        <NavBar />
        <div className="w-screen min-h-screen bg-gradient-to-b from-expense-purpleLight via-purple-200 to-expense-purpleLight  p-6 flex flex-col items-center">
        
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-28 mb-12 text-center">
          About Our Expense Tracker
        </h1>

        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              icon={card.icon}
            />
          ))}
        </div>
        </div>

      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
