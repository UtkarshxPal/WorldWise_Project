const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");
const { checkForAuthentication } = require("../Middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);
authRouter.get("/check-auth", checkForAuthentication, (req, res) => {
  res.json({
    success: "true",
    isAuthenticated: !!req.user,
    user: req.user,
  });
});

module.exports = authRouter;
