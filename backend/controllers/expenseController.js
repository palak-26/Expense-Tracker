const Expense = require ('../models/Expense'); // Import Expense model

// =====================
// ADD NEW EXPENSE
// =====================
const addExpense = async (req,res)=>{
    // Destructure required fields from request body
    const {title , amount , category , date} = req.body;

    try {
        // Create a new Expense document linked to the logged-in user
        const expense = new Expense({
            user: req.user._id, // Taken from auth middleware after token verification
            title,
            amount,
            category,
            date
        });

        // Save expense to MongoDB
        const savedExpense = await expense.save();

        // Respond with the saved expense
        res.status(201).json(savedExpense);
    }
    catch(error){
        // Internal server error
        res.status(500).json({ message: error.message });
    }
};

// =====================
// GET ALL EXPENSES FOR LOGGED-IN USER
// =====================
const getExpense = async (req,res)=>{
    try{
        // Fetch expenses belonging to the logged-in user
        // Sort by date in descending order (latest first)
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });

        // Send fetched expenses
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

// =====================
// DELETE EXPENSE BY ID
// =====================
const deleteExpense = async (req,res)=>{
    try{
        // Find the expense by its ID
        const expense = await Expense.findById(req.params.id);

        // If expense not found, send 404
        if(!expense) return res.status(404).json({ message: "Expense not found!" });

        // Ensure the logged-in user owns the expense
        if(expense.user.toString() != req.user._id.toString()){
            return res.status(401).json({ message: "Not authorized !" });
        }

        // Delete the expense
        await expense.deleteOne();

        // Respond with success message
        res.status(200).json({ message: "Expense Removed Successfully!" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

// =====================
// UPDATE EXPENSE BY ID
// =====================
const updateExpense = async (req,res)=>{
    try{
        // Find expense by ID
        const expense = await Expense.findById(req.params.id);

        // If not found, send 404
        if(!expense) return res.status(404).json({ message: "Expense not found!" });

        // Ensure logged-in user owns the expense
        if(expense.user.toString() != req.user._id.toString()){
            return res.status(401).json({ message: "Not authorized !" });
        }

        // Merge new data into existing expense object
        Object.assign(expense, req.body);

        // Save updated expense
        const updatedExpense = await expense.save();

        // Send updated expense back
        res.status(200).json(updatedExpense);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

// Export all controller functions for use in routes
module.exports = { addExpense, getExpense, deleteExpense, updateExpense };
