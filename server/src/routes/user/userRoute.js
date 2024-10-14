const express = require("express");
const {
  createUser,
  getUser,
  updateChances,
  getAllUsersWithPrizesAndPuzzles,
  getUserAndPrizeStats,
} = require("./userController");

const router = express.Router();

router.route("").get(getAllUsersWithPrizesAndPuzzles);
router.route("/stat").get(getUserAndPrizeStats);

router.route("/:id").get(getUser).patch(updateChances);

module.exports = router;
