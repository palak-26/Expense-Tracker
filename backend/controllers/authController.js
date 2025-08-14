const User = require('../models/Users'); // Import User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// =====================
// REGISTER USER
// =====================
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Extract data from request body
    // console.log(name); // Debug (optional)
    
    try {
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        // Generate salt for hashing password
        const salt = await bcrypt.genSalt(10);
        // Hash password with salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        user = new User({ name, email, password: hashedPassword });
        await user.save(); // Save user to DB

        // Generate JWT token with user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send success response with token and user details
        res.status(200).json({
            message: "User registered successfully!",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
};

// =====================
// LOGIN USER
// =====================
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Extract email & password
    console.log("Request body received:", req.body); // Debug log

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials!" });

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        // Generate JWT token with user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send success response with token and user details
        res.json({
            message: "Login successful!",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
};

// Export controller functions
module.exports = { loginUser, registerUser };
