import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

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

    res.status(201).send({
      message: "Signup successful.",
    });
  } catch (err) {
    console.error("Error in signup:", err);
    console.error("Error stack:", err.stack);
    res.status(500).send({ 
      message: "Signup failed. Please try again later.", 
      error: err.message,
      stack: err.stack
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    console.log("User does not exist");
    return res.status(400).send({
      message: "User does not exist. Please signup.",
      errorName: "User does not exist",
    });
  }

  const checkPassword = bcrypt.compareSync(password, existingUser.password);

  if (!checkPassword) {
    console.log("Password is incorrect");
    return res.status(400).send({
      message: "Password is incorrect. Please try again.",
      errorName: "Password is incorrect",
    });
  }

  // Login successful
  console.log("Login successful");
  console.log(existingUser);
  res.status(200).send({
    message: "Login successful.",
    name: existingUser.name,
  });
};

export { signup, login };
