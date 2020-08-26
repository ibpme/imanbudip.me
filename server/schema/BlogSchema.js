const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  about: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  dateModified: { type: Date, default: Date.now() },
  postedFrom: { type: String, required: true },
  hidden: { type: Boolean, default: false },
  meta: {
    tags: String,
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
