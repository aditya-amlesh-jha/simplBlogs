const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author:{
    type:String,
    required:true,
  },
  body: {
    type: String,
    required: true,
  },
  // Add any additional fields you want in the blog schema
});

module.exports = mongoose.model("Blog", blogSchema);