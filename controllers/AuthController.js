import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const hashPassword = (pass) => {
  const saltRounds = 10;
  return bcrypt.hashSync(pass, saltRounds);
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received signup request:", { name, email });

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "All fields are required.",
        errorName: "Missing fields",
      });
    }

    const existingUser = await User.findOne({ email });
    console.log("Existing user check:", existingUser);

    if (existingUser) {
      return res.status(400).send({
        message: "User already exists. Please login.",
        errorName: "Existing user",
      });
    }

    const hashedPassword = hashPassword(password);
    console.log("Password hashed");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("New user object:", newUser);
    console.log("Attempting to save new user");
    await newUser.save();
    console.log("New user saved successfully");

    // Generate JWT token for the new user
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).send({
      message: "Signup successful.",
      token: token,
      name: newUser.name
    });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).send({ 
      message: "Signup failed. Please try again later.", 
      error: err.message
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Generated token:", token); // Add this line for debugging

    res.json({
      message: "Login successful",
      name: user.name,
      token: token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { signup, login };