const mongoose = require('mongoose'); // MongoDB ODM

// =====================
// USER SCHEMA
// =====================
// This schema defines the structure of a user document in MongoDB.
const userSchema = new mongoose.Schema({
    // User name (required)
    name: { 
        type: String, 
        required: true 
    },

    // User's email address (required & must be unique)
    email: { 
        type: String, 
        required: true, 
        unique: true // Ensures no two users can have the same email
    },

    // Password (required)
    password: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true // Automatically adds createdAt & updatedAt fields
});

// Export User model for use in authentication and other features
module.exports = mongoose.model("Users", userSchema);
