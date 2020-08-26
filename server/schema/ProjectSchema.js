const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { url: { type: String }, repo: { type: String } },
  image: { type: Image },
  topic: { type: String },
  dateCreated: { type: Date, default: Date.now() },
  dateModified: { type: Date, default: Date.now() },
  hidden: { type: Boolean, default: false },
  meta: {
    tags: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
