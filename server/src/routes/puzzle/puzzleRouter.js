const express = require("express");
const {
  getPuzzle,
  createPuzzle,
  deletePuzzle,
  updatePuzzle,
  getAllPuzzle,
  getAllPuzzlePerUser,
} = require("./puzzleController");
// const { protect, restricTo } = require('../auth/auth.controller');
const { verifyToken } = require("../../utils/jwt");

const router = express.Router();

// router.route("").post(createPuzzle);

router.route("").get(getAllPuzzle);
router.route("/user/:userId").get(getAllPuzzlePerUser);
// router.route("/:id").patch(updatePuzzle).get(getPuzzle).delete(deletePuzzle);

module.exports = router;
