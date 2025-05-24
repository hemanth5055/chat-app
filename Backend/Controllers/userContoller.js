const { User } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const { verifyToken, createToken } = require("../Utils/jwt");
async function login(req, res) {
  const userfromFrontend = req.body;
  try {
    if (!userfromFrontend.email || !userfromFrontend.password) {
      return res.json({ success: "false", msg: "Missing Details" });
    } else {
      const user = await User.findOne({ email: userfromFrontend.email });
      if (!user) {
        return res.json({ success: "false", msg: "Invalid Credentials" });
      } else {
        const hashed_password = user.password;
        const compare = await bcrypt.compare(
          userfromFrontend.password,
          hashed_password
        );
        if (!compare) {
          return res.json({
            success: "false",
            msg: "Email or Password is Wrong",
          });
        } else {
          const payload = { _id: user.id, name: user.name };
          const token = createToken(payload);
          return res.json({
            success: "true",
            token,
            msg: "login successfull",
            user: payload,
          });
        }
      }
    }
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}
async function signup(req, res) {
  const userfromFrontend = req.body;
  try {
    if (!userfromFrontend) {
      return res.json({ success: "false", msg: "Missing Details" });
    } else {
      const user = await User.findOne({ email: userfromFrontend.email });
      if (user) {
        return res.json({ success: "false", msg: "Email already taken" });
      } else {
        const hashed_password = await bcrypt.hash(
          userfromFrontend.password,
          Number(process.env.SALT_ROUNDS)
        );
        const user = {
          email: userfromFrontend.email,
          name: userfromFrontend.name,
          password: hashed_password,
        };
        const result = await User.create(user);
        if (result) {
          return res.json({
            success: "true",
            msg: "User created successfully",
          });
        } else {
          return res.json({ success: "false", msg: "Something went wrong" });
        }
      }
    }
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}
async function checkAuth(req, res) {
  return res.json({
    success: "true",
    msg: "Authorization valid",
    user: req.user,
  });
}
async function getUsers(req, res) {
  try {
    const result = await User.find(
      { _id: { $ne: req.user._id } },
      { _id: 1, name: 1 }
    );
    if (!result)
      return res.json({ success: "false", msg: "Something went wrong" });
    return res.json({
      success: "true",
      msg: "Retrieved all Users",
      allusers: result,
    });
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}

module.exports = { login, signup, checkAuth, getUsers };
