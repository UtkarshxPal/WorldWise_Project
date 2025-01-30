// services/auth.service.js
const jwt = require("jsonwebtoken");

// Move secret to environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || "hello124"; // fallback for development

const authService = {
  setUser(user) {
    if (!user?._id) {
      throw new Error("Invalid user data");
    }

    const userPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      // Add timestamp for token creation
      iat: Date.now(),
    };

    try {
      return jwt.sign(userPayload, JWT_SECRET, {
        expiresIn: "24h", // Add token expiration
      });
    } catch (error) {
      console.error("Token generation error:", error);
      throw new Error("Failed to generate token");
    }
  },

  getUser(token) {
    if (!token) return null;

    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      // Handle different types of JWT errors
      if (error.name === "TokenExpiredError") {
        return null;
      }
      if (error.name === "JsonWebTokenError") {
        return null;
      }
      console.error("Token verification error:", error);
      return null;
    }
  },

  // Additional utility functions
  isTokenValid(token) {
    if (!token) return false;
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  },

  // Generate a fresh token for the user (useful for token refresh)
  refreshToken(oldToken) {
    const userData = this.getUser(oldToken);
    if (!userData) return null;
    return this.setUser(userData);
  },
};

module.exports = authService;
