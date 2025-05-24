const { User } = require("../Models/userModel");
const { verifyToken } = require("../Utils/jwt");

async function protectRoute(req, res, next) {
  try {
    const token = req.headers.token;
    const user = verifyToken(token);
    if (!user) {
      return res.json({ success: "false", msg: "Invalid/Expired token" });
    }
    const userfromDB = await User.findOne({ _id: user._id });
    if (!userfromDB) {
      return res.json({ success: "false", msg: "No account exists" });
    }
    const tobesent = {
      _id: userfromDB._id,
      name: userfromDB.name,
    };
    req.user = tobesent;
    next();
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}

module.exports = { protectRoute };
