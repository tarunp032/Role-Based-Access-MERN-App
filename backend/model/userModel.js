const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
