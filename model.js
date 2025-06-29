//Write missing codes here
const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

//Write missing codes here
const BlogModel= mongoose.model("Blog",blogSchema);
// exporting the model
module.exports = BlogModel;

