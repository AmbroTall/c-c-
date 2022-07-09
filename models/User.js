const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { unique: true, type: String, required: true },
  email: { unique: true, type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String , default:""},
}, {timestamps:true});

module.exports = mongoose.model("User", UserSchema)
