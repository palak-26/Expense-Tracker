const mongoose = require("mongoose"); // MongoDB ODM

// =====================
// CONNECT TO MONGODB WITH RETRY LOGIC
// =====================
// This function tries to connect to MongoDB and will retry if it fails.
const connectDB = async () => {
  const connect = async () => {
    try {
      // Attempt to connect to MongoDB using the URI from .env
      const conn = await mongoose.connect(process.env.MONGO_URI);

      // If successful, log host and stop retry attempts
      console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      // Log the error
      console.error(` MongoDB connection failed: ${error.message}`);

      // Retry connection after 5 seconds
      console.log("🔄 Retrying in 5 seconds...");
      setTimeout(connect, 5000);
    }
  };

  // Initial connection attempt
  connect();
};

// Export for use in server.js
module.exports = connectDB;
