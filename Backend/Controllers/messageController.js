const { Message } = require("../Models/messageModel");
async function sendMsg(req, res) {
  const data = req.body;
  try {
    if (!data.senderId || !data.recieverId || !data.message) {
      return res.json({ success: "false", msg: "Missing Detail" });
    }
    const result = await Message.create({
      senderId: data.senderId,
      recieverId: data.recieverId,
      message: data.message,
    });
    return res.json({
      success: "true",
      msg: "Message sent successfully",
      msgObj: result,
    });
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}
async function getMsgs(req, res) {
  const data = req.body;
  try {
    if (!data.senderId || !data.recieverId) {
      return res.json({ success: "false", msg: "Missing Details" });
    }
    const result = await Message.find({
      $or: [
        { senderId: data.senderId, recieverId: data.recieverId },
        { senderId: data.recieverId, recieverId: data.senderId },
      ],
    }).sort({ createdAt: 1 });

    if (!result) {
      return res.json({ success: "false", msg: "Something went Wrong" });
    }
    return res.json({
      success: "true",
      msg: "Retrieved data successfully",
      messages: result,
    });
  } catch (error) {
    return res.json({ success: "false", msg: error.message });
  }
}

module.exports = { sendMsg, getMsgs };
