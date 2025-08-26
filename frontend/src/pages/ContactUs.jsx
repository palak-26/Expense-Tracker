import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useForm, ValidationError } from "@formspree/react";

const ContactUs = () => {
  const [state, handleSubmit] = useForm("mjkonjdy");

  return (
    <div>
      <NavBar />
      <div className="w-screen min-h-screen bg-gradient-to-b from-expense-purpleLight via-purple-200 to-expense-purpleLight p-6 flex justify-center items-center">
        {/* Main container - responsive grid */}
        <div className="max-w-6xl w-full md:mt-24 bg-violet-100 rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-violet-950">Contact Us</h2>

            {/* Formspree form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                  id="email"
                  type="email" 
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email" 
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message..."
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                ></textarea>
                <ValidationError 
                  prefix="Message" 
                  field="message" 
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-violet-950 text-white px-6 py-3 rounded-lg hover:bg-violet-950/95 transition duration-300 w-full flex items-center justify-center"
              >
                {state.submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : "Send Message"}
              </button>

              {/* Success/Error Message */}
              {state.succeeded && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Thanks! Your message has been sent successfully.
                  </p>
                </div>
              )}
              
              {state.errors && state.errors.length > 0 && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    Oops! Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-purple-50 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-violet-950 mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className="space-y-4 text-gray-800">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-violet-950" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <strong>Address:</strong> 123 Expense Tracker Lane, Financial District, 100001
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-violet-950" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <strong>Phone:</strong> +91 XXXXX XXXXX
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-violet-950" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <strong>Email:</strong> support@expensetracker.com
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-purple-100">
              <h4 className="text-lg font-semibold text-violet-950 mb-3">Business Hours</h4>
              <div className="text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;