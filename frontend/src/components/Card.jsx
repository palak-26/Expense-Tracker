import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Card Component (Responsive Upgrade)
 *
 * Props:
 * - title: String - Card heading
 * - content: String/JSX - Card body text or JSX content
 * - icon: JSX - Icon element or image
 * - gradient: String - Tailwind gradient background classes
 */
const Card = ({
  title,
  content,
  icon,
  gradient = "from-purple-400 via-expense-violet to-expense-purpleLight"
}) => {
  return (
    <motion.div
      className={`w-full sm:w-[80%]  
                  bg-gradient-to-tr flex flex-col items-center justify-center 
                  rounded-3xl shadow-md p-6 sm:p-8 
                  hover:scale-105 transition-transform duration-300`}
      initial={{ opacity: 0, y: 20 }} // Start faded + slightly lower
      whileInView={{ opacity: 1, y: 0 }} // Animate in when visible
      viewport={{ once: false }} // Only animate first time it appears
      transition={{ duration: 0.4 }}
    >
      {/* Title with Icon */}
      <div className="flex items-center justify-center gap-x-3 sm:gap-x-4">
        {icon}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{title}</h2>
      </div>

      {/* Card content */}
      <div className="text-center text-base sm:text-lg font-semibold">
        {content}
      </div>
    </motion.div>
  );
};

export default Card;
