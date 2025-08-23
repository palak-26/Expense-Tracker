import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useForm, ValidationError } from "@formspree/react"; 

const ContactUs = () => {
  const [state, handleSubmit] = useForm("mjkonjdy"); 

  return (
    <div>
      <NavBar />
      <div className="w-screen min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6 flex justify-center items-center">
        {/* Main container - responsive grid */}
        <div className="max-w-6xl w-full md:mt-24 bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Contact Us</h2>

            {/* ✅ React Formspree form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your message..."
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300 w-full"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>

              {/* Success/Error Message */}
              {state.succeeded && (
                <p className="text-green-600 mt-2">Thanks! Your message has been sent.</p>
              )}
              {state.errors.length > 0 && (
                <p className="text-red-600 mt-2">Oops! Something went wrong.</p>
              )}
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-purple-50 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
            <ul className="space-y-4 text-gray-800">
              <li>📍 <strong>Address:</strong> 123 Expense Tracker Lane</li>
              <li>📞 <strong>Phone:</strong> +91 98765 XXXXX</li>
              <li>📧 <strong>Email:</strong> support@expensetracker.com</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
