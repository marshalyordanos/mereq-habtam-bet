const { values } = require("lodash");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    spinChance: Number,
    prizeChance: {
      type: Number,
      default: 0,
    },
    phoneNumber: String,
    password: { type: String, select: false },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("userPrizes", {
  ref: "UserPrize",
  localField: "_id", // User's ID
  foreignField: "user_id", // user_id in UserPrize schema
});

// Virtual field for UserPuzzle
userSchema.virtual("userPuzzles", {
  ref: "UserPuzzle",
  localField: "_id", // User's ID
  foreignField: "user_id", // user_id in UserPuzzle schema
});

// Ensure virtual fields are included in JSON and object outputs
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
