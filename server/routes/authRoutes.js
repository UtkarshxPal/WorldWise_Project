const express = require("express");
const { handleSignUp, handleLogin } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.json({ success: true, message: "Logged out successfully" });
});

module.exports = authRouter;
