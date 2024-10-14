const { values } = require("lodash");
const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema(
  {
    name: String,
    is_rare: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Puzzle = mongoose.model("Puzzle", puzzleSchema);

module.exports = Puzzle;
