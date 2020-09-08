const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String, required: true },
  images: {
    urls: [String],
    ids: [String],
  },
  numberOfPhotos: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now() },
  dateModified: { type: Date, default: Date.now() },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("Albums", albumSchema);
