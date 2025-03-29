const mongoose = require("mongoose");
const { Schema } = mongoose;

const URLSchema = new Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("URL", URLSchema);
