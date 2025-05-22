const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    return result;
  } catch (error) {
    return null;
  }
};
const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
module.exports = { verifyToken, createToken };
