import User from '../models/user.js';
import { OAuth2Client } from 'google-auth-library';
import LoginActivity from '../models/login.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    generateToken();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,

        });

        await newUser.save();

        // Convert to plain object and remove password
        const userObject = newUser.toObject();
        delete userObject.password;

        // Generate JWT token
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully",
            user: userObject,
            token,
        });
    } catch (error) {
            console.error("Signup error:", error); // log in Railway logs
            res.status(500).json({ message: "Server ubbi error", error: error.message || error });
          
          
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = generateToken(user._id);

        // Save login activity
        const loginActivity = new LoginActivity({
            userId: user._id,
            email: user.email,
            password: user.password,  // It's usually not recommended to save password in the activity log, unless required.
            loginTime: Date.now(),
            ipAddress: req.ip,  // You can get the IP address from the request object (or from headers)
        });

        // Save login activity to the database
        await loginActivity.save();

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  

export const googleLogin = async (req, res) => {
    const { token: googleToken } = req.body;

    console.log("🔥 /google route hit");
    console.log("🌐 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("📥 Received Google Token:", googleToken);

    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        console.log("✅ Google ID Token Verified");

        const { email, name } = ticket.getPayload();
        console.log("👤 Extracted user data:", { email, name });

        let user = await User.findOne({ email });

        if (!user) {
            console.log("🆕 User not found — creating new user");
            user = new User({
                name,
                email,
                password: 'googleauthed',
                role: 'user',
            });

            await user.save();
            console.log("✅ New user saved:", user._id);
        } else {
            console.log("👤 User already exists:", user._id);
        }

        const token = generateToken(user._id);
        console.log("🔐 Generated JWT Token:", token);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });

    } catch (err) {
        console.error("❌ Google Verify Error:", err);
        res.status(400).json({ message: 'Google login failed', error: err.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Optional: Remove login activity or mark as logged out
        await LoginActivity.deleteMany({ email });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
};