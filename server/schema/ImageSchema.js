const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: { type: Buffer, required: true },
  caption: String,
  dateCreated: { type: Date, default: Date.now() },
  dateModified: { type: Date, default: Date.now() },
  url: String,
  camera: String,
  fileSize: { type: Number, required: true },
  album: {
    title: String,
    id: { type: String, required: true },
    url: String,
  },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("Images", imageSchema);
