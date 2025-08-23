const express = require('express'); // Express framework
const dotenv = require('dotenv'); // To load environment variables from .env
const cors = require('cors'); // For handling Cross-Origin Resource Sharing
const connectDB = require('./config')// MongoDB connection function
const authenticateUser = require('./middleware/authMiddleware'); // Middleware to protect routes

// =====================
// LOAD ENVIRONMENT VARIABLES
// =====================
dotenv.config();

// =====================
// CONNECT TO MONGODB
// =====================
connectDB();

const app = express(); // Initialize Express app

// =====================
// MIDDLEWARE
// =====================

// Enable CORS to allow frontend requests
app.use(cors({
  origin: process.env.CLIENT_URL  , // Only allow this frontend URL  
  credentials: true, // Allow cookies & authentication headers
}));

// Parse incoming JSON data 
app.use(express.json());

// =====================
// ROUTES
// =====================

app.get("/", (req,res)=>{
  res.send("Backend is Live!");
});

// Authentication routes (e.g., /api/auth/login, /api/auth/register)
app.use("/api/auth", require('./routes/authRoutes'));

// Expense routes (protected by authenticateUser middleware)
app.use("/api/expenses", authenticateUser, require('./routes/expenseRoutes'));

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
