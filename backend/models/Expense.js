const mongoose = require('mongoose'); // MongoDB ODM

// =====================
// EXPENSE SCHEMA
// =====================
// This schema defines the structure of an expense document in MongoDB.
const expenseSchema = new mongoose.Schema({
    // Reference to the user who owns this expense (required)
    user: { 
        type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
        ref: "User", // Refers to the User model
        required: true 
    },

    // Expense title or description (required)
    title: { 
        type: String, 
        required: true 
    },

    // Expense amount (required)
    amount: { 
        type: Number, 
        required: true 
    },

    // Expense category (e.g., Food, Travel, Bills) (required)
    category: { 
        type: String, 
        required: true 
    },

    // Date of expense (defaults to current date/time)
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true // Automatically add createdAt & updatedAt fields
});

// Export Expense model for use in controllers & services
module.exports = mongoose.model("Expense", expenseSchema);
