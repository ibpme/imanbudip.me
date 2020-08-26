const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: Buffer,
  caption: String,
  author: String,
  dateCreated: { type: Date, default: Date.now() },
  dateModified: { type: Date, default: Date.now() },
  url: String,
  album: {
    title: String,
    id: String,
    url: String,
  },
  hidden: { type: Boolean, default: false },
  meta: {
    tags: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
