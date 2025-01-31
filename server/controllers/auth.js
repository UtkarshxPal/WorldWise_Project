const User = require("../models/authUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setUser } = require("../services/auth");

async function handleSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: "true", message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: "false",
        message: "Invalid email format",
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        success: "false",
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: "false",
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: "true", message: "User created succesfully", newUser });
  } catch (err) {
    console.log({ message: "Could not create user", err });
    return res.status(500).json({
      success: "false",
      message: "Could not create user",

      ...(process.env.NODE_ENV === "development" && { error: err.message }),
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(401)
        .json({ success: "false", message: "Email or password incorrect" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: "false", message: "Email or password incorrect" });
    }

    const token = setUser(user);

    // res.cookie("auth_token", token, {
    //   httpOnly: true, // Protects cookie from client-side JavaScript
    //   secure: false, // Do NOT set to true on HTTP (i.e., local dev without HTTPS)
    //   sameSite: "Lax", // Can be "Strict" or "Lax" based on your needs
    //   maxAge: 1000 * 60 * 60 * 24, // Cookie expiry time: 1 day
    // });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS-only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      success: "true",
      message: "Login Succesfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: "false",
      message: "Internal server error during login",
    });
  }
}

async function handleLogout(req, res) {
  try {
    // Clear the authentication cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS-only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site in production
      path: "/",
    });

    return res.status(200).json({
      success: "true",
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      success: "false",
      message: "Could not logout",
    });
  }
}

module.exports = { handleLogin, handleSignUp, handleLogout };
