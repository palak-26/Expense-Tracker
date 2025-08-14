import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

/**
 * ContactUs Component
 *
 * A modern, responsive Contact Us page with:
 * - Left: Contact form (Name, Email, Message)
 * - Right: Contact details (phone, email, location)
 * - Fully responsive (stacked on mobile, side-by-side on desktop)
 */ 
const ContactUs = () => {
  return (
    <div>
      <NavBar/>
      <div className="w-screen min-h-screen  bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6 flex justify-center items-center">
     
      {/* Main container - responsive grid */}
      <div className="max-w-6xl w-full md:mt-24 bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Contact Us</h2>
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Your message..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="bg-purple-50 p-6 rounded-2xl flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-purple-900 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <ul className="space-y-4 text-gray-800">
            <li>
              📍 <strong>Address:</strong> 123 Expense Tracker Lane
            </li>
            <li>
              📞 <strong>Phone:</strong> +91 98765 XXXXX
            </li>
            <li>
              📧 <strong>Email:</strong> support@expensetracker.com
            </li>
          </ul>
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;
