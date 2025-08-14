import React from 'react';

const Card = ({ title, content, icon }) => {
  return (
    <div className="w-[80%] bg-gradient-to-tr flex flex-col items-center justify-center from-purple-400 via-expense-violet to-expense-purpleLight  rounded-3xl shadow-md p-8 hover:scale-105 transition-transform duration-300">
      <div className='flex items-center justify-center gap-x-4 '>
        {icon}
        <h2 className='text-3xl font-bold mb-4 text-center'>{title}</h2>
      </div>
      <p className='text-center text-lg font-semibold'>{content}</p>
    </div>
  );
};

export default Card;