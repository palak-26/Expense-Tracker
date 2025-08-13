const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
// const authenticateUser = require('./middleware/authMiddleware');


dotenv.config();
connectDB();

const app = express();

app.use(cors(
    {
  origin: 'http://localhost:5173', 
  credentials: true,
}
));
app.use(express.json());


app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/expenses", require('./routes/expenseRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`));

