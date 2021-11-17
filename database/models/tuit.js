const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Tuit = model("tuit", tuitSchema, "tuits");

module.exports = Tuit;
