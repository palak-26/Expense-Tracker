const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
const authenticateUser = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/expenses", authenticateUser, require('./routes/expenseRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
