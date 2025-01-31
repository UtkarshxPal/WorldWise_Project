const jwt = require("jsonwebtoken");

function setUser(user) {
  const { name, email, role, _id } = user;
  const token = jwt.sign(
    {
      name,
      email,
      role,
      _id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Error in token validation:", err);
    return null;
  }
}

module.exports = { setUser, getUser };
