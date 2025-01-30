const { getUser } = require("../services/auth");

async function checkForAuthentication(req, res, next) {
  res.user = null;
  const token = req.cookies.auth_token;

  if (!token) return next();

  try {
    const user = getUser(token);
    if (user) {
      req.user = user;
    }
  } catch (err) {
    console.log("Error in token validation:", err);
    return res.status(401).json({
      success: "fail",
      message: "Invalid or expired token",
    });
  }
  return next();
}

function restrictTo(role) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: "fail",
        message: "User not authenticated , login to continue",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ success: "fail", message: "UnAuthorized" });
    }

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
