const mongoose = require("mongoose");
const connecttoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database ✅"))
    .catch((err) => console.log(err));
};
module.exports = { connecttoDB };
