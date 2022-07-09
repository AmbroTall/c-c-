const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  photo : { type: String, required: false },
  category: { type: Array, required: true },
  username: { type: String, required: true },
},{timestamps:true});


module.exports = mongoose.model("Posts", PostsSchema)
