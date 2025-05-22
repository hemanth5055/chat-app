const { User } = require("../Models/userModel");
const { verifyToken } = require("../Utils/jwt");

async function protectRoute(req, res, next) {
  try {
    const token = req.headers.token;
    const user = verifyToken(token);
    if (!user) {
      return res.json({ success: "false", msg: "Invalid/Expired token" });
    }
    const userfromDB = await User.findOne({ _id: user.id });
    if (!userfromDB) {
      return res.json({ success: "false", msg: "No account exists" });
    }
    req.user = userfromDB;
    next();
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}

module.exports = { protectRoute };
