const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Auth controller for REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  
//   Basic Validation for register form (backend)
  if (!name || !email || !password) {
  return res.status(400).json({ message: 'All fields are required' });
}
if (password.length < 6) {
  return res.status(400).json({ message: 'Password must be at least 6 characters' });
}

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

//  Auth controller for LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

//   Basic Validation for Login form (backend)
  if (!email || !password) {
  return res.status(400).json({ message: 'Email and password required' });
}


  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};
